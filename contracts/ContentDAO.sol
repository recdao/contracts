pragma solidity ^0.4.19;

import "./Interfaces.sol";

contract ContentDAO {

    enum Stage                                       { NONE, ACTIVE, ADJUDICATION }

    struct Post {
      uint                                           startedAt;
      uint                                           lastSigStakeAt;
      uint                                           toFlip;
      bool                                           liked;
      Stage                                          stage;
      mapping(bool => uint)                          totals;
      mapping(bool => mapping(address => uint))      stakes;
      mapping(bool => uint)                          voteTotals;
      mapping(address => bool)                       voted;
    }

    IRegistry                       public registry;
    IToken                          public token;
    uint                            public subunits;
    uint                            public MEMBER_MIN_KARMA = 500;
    uint                            public FLIP_PERCENT = 200;
    uint                            public ADJUDICATION_THRESHOLD = 2100;       // if start stake is 50 then at 2100, both sides = contribution
    uint                            public SIG_STAKE = 50;                      // also serve as min stake? - yes
    uint                            public SIG_STAKE_DELAY = 43;                // delays end of staking for 10min if sig stake occurs
    uint                            public STAKE_DURATION = 6000;               // ~24 hrs
    uint                            public VOTE_DURATION = 6000;                // ~24 hrs
    // uint                            public ADJUDICATION_FEE_PERCENT = 10;    // TODO

    mapping(uint40 => Post)         public posts;

    function ContentDAO (address _registry, address _token) {
        registry = IRegistry(_registry);
        token = IToken(_token);
        subunits = 10 ** uint(token.decimals());
    }

    function stake(uint40 _id, bool _vote, uint _amount) public {
      Post storage post = posts[_id];
      require( isStakeable(_id) );
      // stake needs to support side opposite to currently winning
      require( _vote != post.liked );
      // trim _amount
      if(_amount > post.toFlip)
          _amount = post.toFlip;

      require( token.transferFrom(msg.sender, this, _amount) );

      post.stakes[_vote][msg.sender] += _amount;
      if(_amount == post.toFlip) flip(post);
      if(_amount >= SIG_STAKE*subunits) post.lastSigStakeAt = block.number;

      // if within final hour, trigger adjudication (250 blocks = 1 hr)
      if(block.number >= post.startedAt + STAKE_DURATION - 250) startAdjudication(post);
      // if total becomes over threshold, trigger adjudication
      if(post.totals[_vote] >= ADJUDICATION_THRESHOLD) startAdjudication(post);
    }

    function flip(Post _post) internal {
        _post.liked = !_post.liked;
        _post.toFlip = FLIP_PERCENT * _post.toFlip / 100;
    }

    function startAdjudication(Post _post) internal {
        _post.stage = Stage.ADJUDICATION;
        // inAdjudication array?
    }

    function init(uint40 _id, uint _amount) public {
      // not already existing
      require( posts[_id].stage == Stage.NONE );
      // over min stake
      require( _amount >= SIG_STAKE*subunits );
      // can transfer tokens
      require( token.transferFrom(msg.sender, this, _amount) );
      Post storage post = posts[_id];
      post.totals[true] += _amount;
      post.startedAt = block.number;
      post.stage = Stage.ACTIVE;
      posts[_id] = post;
    }

    function vote(uint40 _id, bool _vote) public {
        require( isMember(msg.sender) );
        require( isVotable(_id) );
        Post storage post = posts[_id];
        // TODO require( didn't already vote );
        require( post.stage == Stage.ADJUDICATION );

        uint weight = 1;                                                        // or karma? registry.getKarma(registry.ownerToUsername(msg.sender)
        post.voted[msg.sender] = true;
        post.voteTotals[_vote] += weight;
    }

    function withdraw(uint40 _id) public {
      require( isEnded(_id) );
      // get winning side
      Post storage post = posts[_id];
      bool liked = post.liked;
      if( post.stage == Stage.ADJUDICATION &&
          ( post.voteTotals[true] > 0 || post.voteTotals[false] > 0 ) ) {       // no vote no ruling
          liked = post.voteTotals[true] > post.voteTotals[false];
      }

      uint stake = post.stakes[liked][msg.sender];
      uint award = post.totals[!liked] * stake  / post.totals[liked];
      // if adjudicated, get winning side
      require( token.transferFrom(this, msg.sender, stake + award) );
      // send and delete address=>stake mapping
    }

    function isEnded(uint40 _id) public view returns(bool) {
        Post storage post = posts[_id];
        if(post.stage == Stage.ACTIVE) return !isStakeable(_id);
        else if(post.stage == Stage.ADJUDICATION) return !isVotable(_id);
        else return false;
    }

    function isMember(address _address) public view returns(bool) {
        bytes20 username = registry.ownerToUsername(_address);
        if (username == 0 ) return false;

        uint32 karma = registry.getKarma(username);
        return karma >= MEMBER_MIN_KARMA;
    }

    function isStakeable(uint40 _id) public view returns (bool) {
        Post storage post = posts[_id];
        return post.stage == Stage.ACTIVE &&
               ( block.number < post.startedAt + STAKE_DURATION ||
                 block.number < post.lastSigStakeAt + SIG_STAKE_DELAY );
    }

    function isVotable(uint40 _id) public view returns (bool) {
        Post storage post = posts[_id];
        return post.stage == Stage.ADJUDICATION &&
               block.number < post.startedAt + STAKE_DURATION + VOTE_DURATION;
    }

}

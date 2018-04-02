pragma solidity ^0.4.19;

import "./Interfaces.sol";

contract ContentDAO {

    enum Stage                                       { NONE, ACTIVE, ADJUDICATION }

    struct Post {
      uint                                           startedAt;
      uint                                           track;                     // use for lastSigStakeAt as well as adjudicationStartedAt
      bool                                           liked;
      Stage                                          stage;
      bool                                           feePaid;
      mapping(bool => uint)                          totals;
      mapping(bool => mapping(address => uint))      stakes;
      mapping(bool => uint)                          voteTotals;
      mapping(address => bool)                       voted;
    }

    IRegistry                       public registry;
    IToken                          public token;
    uint                            public subunits;
    uint                            public MEMBER_MIN_KARMA = 1000;
    uint                            public FLIP_PERCENT = 200;
    uint                            public ADJUDICATION_THRESHOLD = 5800;
    uint                            public SIG_STAKE = 10;                      // also serve as min stake? - yes
    uint                            public SIG_STAKE_DELAY = 43;                // delays end of staking for 10min if sig stake occurs
    // uint                            public STAKE_DURATION = 6000;               // ~24 hrs
    uint                            public STAKE_DURATION = 3000;               // ~12 hrs
    uint                            public VOTE_DURATION = 6000;                // ~24 hrs
    uint                            public ADJUDICATION_FEE_PERCENT = 10;

    mapping(uint40 => Post)         public posts;

    event Open(uint40 id);
    event Flip(uint40 id);
    event StartAdjudication(uint40 id);

    function ContentDAO (address _registry, address _token, uint _voteDuration) {
        registry = IRegistry(_registry);
        token = IToken(_token);
        subunits = 10 ** uint(token.decimals());
        VOTE_DURATION = _voteDuration;
    }

    function stake(uint40 _id, bool _vote, uint _amount) public {
        Post storage post = posts[_id];

        if(post.stage == Stage.NONE) {
          open(_id, _vote, _amount);
          return;
        }

        require( isStakeable(_id) );
        // can only stake on losing side
        require( _vote != post.liked );
        // trim _amount if necessary
        uint toFlip = (post.totals[post.liked] * FLIP_PERCENT / 100) - post.totals[!post.liked];
        if(_amount > toFlip)
            _amount = toFlip;                                                   // trim stake if over amount needed to flip - TODO fix this so can just stake without trim or chance of revert

        uint toAdjudicate = ADJUDICATION_THRESHOLD*subunits - (post.totals[true] + post.totals[false]);
        if(_amount > toAdjudicate)
            _amount = toAdjudicate;

        require( token.transferFrom(msg.sender, this, _amount) );

        post.stakes[_vote][msg.sender] += _amount;
        post.totals[_vote] += _amount;

        bool flipped = false;
        if(_amount == toFlip) {
            post.liked = !post.liked;
            flipped = true;
            Flip(_id);
        }
        if(_amount >= SIG_STAKE*subunits) post.track = block.number;

        // if total becomes over threshold, trigger adjudication or
        // if flipped within final hour, trigger adjudication (250 blocks = 1 hr)
        if(
            _amount == toAdjudicate ||
            (flipped && block.number >= post.startedAt + STAKE_DURATION - 250)
          ) {
            startAdjudication(_id);
            return;
        }
    }

    function startAdjudication(uint40 _id) internal {
        Post storage post = posts[_id];
        post.stage = Stage.ADJUDICATION;
        post.track = block.number;
        StartAdjudication(_id);
        // inAdjudication array?
    }

    function open(uint40 _id, bool _vote, uint _amount) public {
        // not already existing
        require( posts[_id].stage == Stage.NONE );
        // over min stake
        require( _amount >= SIG_STAKE*subunits );
        // must not go straight to adjudication or funds could get into non-withdrawable state
        require( _amount < ADJUDICATION_THRESHOLD*subunits );
        // can transfer tokens
        require( token.transferFrom(msg.sender, this, _amount) );
        Post storage post = posts[_id];
        post.startedAt = block.number;
        post.liked = _vote;
        post.stage = Stage.ACTIVE;
        post.totals[_vote] += _amount;
        post.stakes[_vote][msg.sender] += _amount;
        Open(_id);
    }

    function vote(uint40 _id, bool _vote) public {
        require( isMember(msg.sender) );
        require( isVotable(_id) );
        Post storage post = posts[_id];
        require( !post.voted[msg.sender] );
        require( post.stage == Stage.ADJUDICATION );

        uint weight = 1;                                                        // or karma? registry.getKarma(registry.ownerToUsername(msg.sender)
        post.voted[msg.sender] = true;
        post.voteTotals[_vote] += weight;
        if(post.voteTotals[!post.liked] > post.voteTotals[post.liked]) {        // simple majority flips result
            post.liked = !post.liked;
        }
    }

    /* function voted(uint40 _id, address _address) public view returns(bool) {
        Post storage post = posts[_id];
        return post.voted[_address];
    } */

    function withdraw(uint40 _id) public {
        require( isEnded(_id) );
        // get winning side
        Post storage post = posts[_id];
        bool liked = post.liked;
        if( post.stage == Stage.ADJUDICATION && !post.feePaid ) {               // first withdraw burns fee
            uint fee = post.totals[!liked] * ADJUDICATION_FEE_PERCENT / 100;
            post.totals[!liked] -= fee;

            // TODO - do proper burn here as minime doesn't allow send to 0
            require( token.transfer(2, fee) );
            post.feePaid = true;
        }

        uint staked = post.stakes[liked][msg.sender];
        uint award = post.totals[!liked] * staked / post.totals[liked];
        // send and delete address=>stake mapping
        delete post.stakes[liked][msg.sender];
        require( token.transfer(msg.sender, staked + award) );
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
                 block.number < post.track + SIG_STAKE_DELAY );
    }

    function isVotable(uint40 _id) public view returns (bool) {
        Post storage post = posts[_id];
        return post.stage == Stage.ADJUDICATION &&
               block.number < post.track + VOTE_DURATION;
    }

    function getPost(uint40 _id) public view returns (
      uint    startedAt,
      uint    track,
      bool    liked,
      Stage   stage,
      bool    ended,
      bool    feePaid,
      uint    totalUp,
      uint    totalDown,
      uint    stakeUp,
      uint    stakeDown,
      bool    voted
    ) {
        Post storage post = posts[_id];
        startedAt = post.startedAt;
        track = post.track;
        liked = post.liked;
        stage = post.stage;
        ended = isEnded(_id);
        feePaid = post.feePaid;
        totalUp = post.totals[true];
        totalDown = post.totals[false];
        stakeUp = post.stakes[true][msg.sender];
        stakeDown = post.stakes[false][msg.sender];
        voted = post.voted[msg.sender];
    }

}

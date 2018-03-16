pragma solidity ^0.4.19;

import "./Interfaces.sol";

contract ContentDAO {

    struct Post {
      uint                                           startedAt;
      uint                                           lastSigStakeAt;
      uint                                           toFlip;
      bool                                           liked;
      mapping(bool => uint)                          totals;
      mapping(bool => mapping(address => uint))      stakes;
    }

    IRegistry                       public registry;
    IToken                          public token;
    uint                            public subunits;
    uint                            public MEMBER_MIN_KARMA = 500;
    uint                            public FLIP_PERCENT = 125;
    uint                            public ADJUDICATION_THRESHOLD = 10;
    uint                            public SIG_STAKE = 200;                     // also serve as min stake? - yes
    uint                            public SIG_STAKE_DELAY = 43;                // delays end of staking for 10min if sig stake occurs
    uint                            public STAKE_DURATION = 6000;               // ~24 hrs

    mapping(uint40 => Post)         public posts;

    function ContentDAO (address _registry, address _token) {
        registry = IRegistry(_registry);
        token = IToken(_token);
        subunits = 10 ** uint(token.decimals());
    }

    function stake(uint40 _id, bool _vote, uint _amount) public {
      Post storage post = posts[_id];
      // TODO require is open for staking (not finished or in adjudication)

      // stake needs to support side opposite to currently winning
      require( _vote != post.liked );
      // trim _amount
      if(_amount > post.toFlip)
          _amount = post.toFlip;

      require( token.transferFrom(msg.sender, this, _amount) );

      post.stakes[_vote][msg.sender] += _amount;
      if(_amount == post.toFlip) flip(post);
      if(_amount >= SIG_STAKE*subunits) post.lastSigStakeAt = block.number;
    }

    function flip(Post _post) internal {
        _post.liked = !_post.liked;
        _post.toFlip = FLIP_PERCENT * _post.toFlip / 100;
    }

    function init(uint40 _id, uint _amount) public {
      // not already existing
      require( posts[_id].startedAt == 0 );
      // over min stake
      require( _amount >= SIG_STAKE*subunits );
      // can transfer tokens
      require( token.transferFrom(msg.sender, this, _amount) );
      Post storage post = posts[_id];
      post.totals[true] += _amount;
      post.startedAt = block.number;
      posts[_id] = post;
    }

    function vote(uint40 _id, bool _vote) public {
        require( isMember(msg.sender) );
        // TODO - all
    }

    function isMember(address _address) public view returns(bool) {
        bytes20 username = registry.ownerToUsername(_address);
        if (username == 0 ) return false;

        uint32 karma = registry.getKarma(username);
        return karma >= MEMBER_MIN_KARMA;
    }

}

pragma solidity ^0.4.19;

import "./Interfaces.sol";

contract ContentDAO {

    enum Vote                         { DOWN, UP }

    struct Flip {
      mapping(address => uint)      stakes;
    }

    struct Post {
      Flip[]                        flips;
      uint                          lastSigStakeAt;
    }

    IRegistry                       public registry;
    IToken                          public token;
    uint                            public MEMBER_MIN_KARMA = 500;
    uint                            public FLIP_PERCENT = 125;
    uint                            public MAX_FLIPS = 10;
    uint                            public SIG_STAKE = 200;

    mapping(uint40 => Post)         public posts;

    function ContentDAO (address _registry, address _token, uint _memberMinKarma) {
        registry = IRegistry(_registry);
        token = IToken(_token);
        MEMBER_MIN_KARMA = _memberMinKarma;
    }

    function stake(uint40 _id, Vote _vote, uint _amount) public {
      // is open for staking (not finished or in adjudication)
    }

    function vote(uint40 _id, Vote _vote) public {
        require( isMember(msg.sender) );
    }

    function isMember(address _address) public view returns(bool) {
        bytes20 username = registry.ownerToUsername(_address);
        if (username == 0 ) return false;

        uint32 karma = registry.getKarma(username);
        return karma >= MEMBER_MIN_KARMA;
    }

}

pragma solidity ^0.4.19;

import "./Interfaces.sol";
import "./UtilityLib.sol";

contract RECDAO {

    enum Actions                  { NONE, UPGRADE, ADD_ROOT }

    struct Prop {
        Actions                     action;
        bytes32                     data;
        uint                        startedAt;
        uint                        endAt;
        bytes20                     author;
        bool                        enacted;
        mapping(bool => uint)       results;
        mapping(address => bool)    voted;
    }

    IRegistry                       public registry;
    IToken                          public token;
    Prop[]                          public props;
    bytes32[]                       public roots;
    uint                            public subunits = 10 ** 18;

    uint                            public PROP_STAKE = 1000;
    uint                            public PROP_CLOSE_DURATION = 6000;          // 24 hours
    uint                            public PROP_CLOSE_FLIP_DELAY = 3000;        // 12 hours
    uint                            public PROP_DURATION = 43200;
    uint                            public MIN_PASS = 10000;

    event Proposed(bytes20 username, uint propIdx);
    event Voted(bytes20 username, uint propIdx, bool pref);
    event Enacted(uint propIdx);

    function RECDAO(address _parent, address _token, address _registry, bytes32 _root, uint _propDuration, uint _propCloseFlipDelay){
      PROP_DURATION = _propDuration;
      PROP_CLOSE_FLIP_DELAY = _propCloseFlipDelay;
      if(_parent == 0){
          roots.push(_root);
          token = IToken(_token);
          registry = IRegistry(_registry);
      } else {
          RECDAO parentDAO = RECDAO(_parent);
          token = IToken(address(parentDAO.token));
          registry = IRegistry(address(parentDAO.registry));
      }
    }

    function upgrade(address _newController) internal {
        registry.changeController(_newController);
        token.changeController(_newController);
    }

    function register(
        bytes20 _username,
        uint32 _karma,
        uint32 _firstContent,
        bytes32[] _proof,
        uint16 _rootIndex
    ) public {

        require(validate(_username, _karma, _firstContent, _proof, _rootIndex));

        bytes20 existing = registry.ownerToUsername(msg.sender);

        if(existing != 0) {
          // update
          require(_rootIndex > registry.getLastRootIndex(existing));            // prevent double reg
          uint currentKarma = registry.getKarma(_username);
          registry.update(_username, msg.sender, _karma, _rootIndex);
          token.generateTokens( msg.sender, ( _karma - currentKarma ) * subunits );
        } else {
          // register
          require(registry.getOwner(_username) == 0);
          registry.add(_username, msg.sender, _karma, _firstContent, _rootIndex);
          token.generateTokens( msg.sender, _karma * subunits );
        }
    }

    function validate(
        bytes20 _username,
        uint32 _karma,
        uint32 _firstContent,
        bytes32[] _proof,
        uint16 _rootIndex
    ) public view returns (bool) {
        bytes32 hash = keccak256(msg.sender, _username, _karma, _firstContent);
        return UtilityLib.checkProof(_proof, roots[_rootIndex], hash);
    }

    function hash(
        bytes20 _username,
        uint32 _karma,
        uint32 _firstContent,
        bytes32[] _proof,
        uint16 _rootIndex
    ) public view returns (bytes32 hash) {
        hash = keccak256(msg.sender, _username, _karma, _firstContent);
    }

    function addProp(Actions _action, bytes32 _data) public {
        bytes20 username = registry.ownerToUsername(msg.sender);
        require( username != 0 );                                               // only registered users can propose

        Prop memory prop;

        require(
            token.transferFrom(msg.sender, 1, PROP_STAKE * subunits )
            );

        prop.action = _action;
        prop.data = _data;
        prop.startedAt = block.number;
        prop.endAt = block.number + PROP_DURATION;
        prop.author = username;

        emit Proposed(username, props.push(prop)-1);
    }

    function enact(uint _propIdx) public {
        Prop storage prop = props[_propIdx];

        require(
            prop.enacted == false &&
            !isVotable(_propIdx) &&
            isPassing(_propIdx) &&
            token.transferFrom(                                                 // return staked tokens
                1,
                registry.getOwner(prop.author),
                PROP_STAKE * subunits
                )
            );

        prop.enacted = true;


        if( prop.action == Actions.UPGRADE ) {
            upgrade(address(UtilityLib.extract20(prop.data)));
        } else if( prop.action == Actions.ADD_ROOT ) {
            roots.push(prop.data);
        }

        emit Enacted(_propIdx);
    }

    function getResult(uint _propIdx, bool _pref) public view returns (uint) {
        Prop storage prop = props[_propIdx];
        return prop.results[_pref];
    }

    function getVoted(uint _propIdx) public view returns (bool) {
        Prop storage prop = props[_propIdx];
        return prop.voted[msg.sender];
    }

    function getNumProps() public view returns (uint) {
        return props.length;
    }

    function getPropsStatic() public view returns (
        Actions[] action,
        bytes32[] data,
        uint[] startedAt,
        bytes20[] author
    ) {
        action = new Actions[](props.length);
        data = new bytes32[](props.length);
        startedAt = new uint[](props.length);
        author = new bytes20[](props.length);

        for (uint i = 0; i < props.length; i++) {
            Prop storage prop = props[i];
            action[i] = prop.action;
            data[i] = prop.data;
            startedAt[i] = prop.startedAt;
            author[i] = prop.author;
        }
    }

    function getPropsDyn() public view returns (
        uint[] lastSigVoteAt,
        bool[] passing,
        bool[] enacted,
        bool[] voted
    ) {
        lastSigVoteAt = new uint[](props.length);
        passing = new bool[](props.length);
        enacted = new bool[](props.length);
        voted = new bool[](props.length);

        for (uint i = 0; i < props.length; i++) {
            Prop storage prop = props[i];
            lastSigVoteAt[i] = prop.lastSigVoteAt;
            passing[i] = isPassing(i);
            enacted[i] = prop.enacted;
            voted[i] = prop.voted[msg.sender];
        }
    }

    function isPassing(uint _propIdx) public view returns (bool) {
        Prop storage prop = props[_propIdx];
        return prop.results[1] > MIN_PASS &&                                    // "Yes" votes are greather than minimum threshold
               prop.results[1]/2 > prop.results[0];                             // 2/3 majority to pass
    }

    function isClosing(uint _propIdx) public view returns (bool) {
        Prop storage prop = props[_propIdx];
        return block.number >= prop.endAt - PROP_CLOSE_DURATION && isVotable(_propIdx);
    }

    function isVotable(uint _propIdx) public view returns (bool) {
        Prop storage prop = props[_propIdx];
        return block.number < prop.endAt;
    }

    function vote(uint _propIdx, bool _pref) public {
        bytes20 username = registry.ownerToUsername(msg.sender);
        require( username != 0 );

        uint32 karma = registry.getKarma(username);

        Prop storage prop = props[_propIdx];
        uint balance = token.balanceOf(msg.sender);

        require(
          prop.voted[msg.sender] == false &&                                    // didn't already vote
          isVotable(_propIdx)                                                   // prop still active
          );

        bool isPassingAtStart = isPassing(_propIdx);

        // TODO - can't have complete control over token only beholden to karma vote
        uint voteWeight = registry.getKarma(username);

        prop.results[_pref] += karma;
        prop.voted[msg.sender] = true;

        if( isClosing(_propIdx) && isPassing(_propIdx) != isPassingAtStart )
            prop.endAt += PROP_CLOSE_FLIP_DELAY;

        emit Voted(username, _propIdx, _pref);
    }
}

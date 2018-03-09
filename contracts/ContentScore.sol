pragma solidity ^0.4.19;

import "./Interfaces.sol";

contract ContentScore {

    enum Vote                         { NEUTRAL, UP, DOWN }
    enum Type                         { POST, COMMENT }

    struct Score {
        uint32                        numUp;
        uint32                        numDown;
        uint40                        scoreUp;
        uint40                        scoreDown;
    }

    IRegistry                                             public registry;
    mapping(uint40 => Score)                              public postScores;
    mapping(uint40 => Score)                              public commentScores;
    mapping(bytes20 => mapping(uint40 => Vote))           public postVotes;
    mapping(bytes20 => mapping(uint40 => Vote))           public commentVotes;

    event Voted(uint40 id);

    function ContentScore (address _registry) {
        registry = IRegistry(_registry);
    }

    function vote(Type _type, uint40 _id, Vote _vote) public {
        bytes20 username = registry.ownerToUsername(msg.sender);
        require( username != 0 );                                               // require registered

        Score score;
        Vote existingVote;

        if(_type == Type.POST) {
            score = postScores[_id];
            existingVote = postVotes[username][_id];
        } else {
            score = commentScores[_id];
            existingVote = commentVotes[username][_id];
        }

        require(existingVote != _vote);

        if(existingVote != Vote.NEUTRAL) {
            // make adjustments
            if (existingVote == Vote.UP) {
              score.numUp--;
              score.scoreUp -= registry.getKarma(username);
            } else if (existingVote == Vote.DOWN) {
              score.numDown--;
              score.scoreDown -= registry.getKarma(username);
            }
        }

        if(_type == Type.POST) {
            postVotes[username][_id] = _vote;
        } else {
            commentVotes[username][_id] = _vote;
        }

        if (_vote == Vote.UP) {
          score.numUp++;
          score.scoreUp += registry.getKarma(username);
        } else if (_vote == Vote.DOWN) {
          score.numDown++;
          score.scoreDown += registry.getKarma(username);
        }
    }

}

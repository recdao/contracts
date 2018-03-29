pragma solidity ^0.4.19;

import "./Interfaces.sol";

contract Tipper {

    enum ContentType                                       { POST, COMMENT }

    /* struct Post {
      bytes20                                        author;                    // only use if not already reg
    }

    mapping(uint40 => Post)         public posts; */
    
    IRegistry                       public registry;

    event Tip(ContentType ctype, uint40 id, address token, uint amount);

    function Tipper (address _registry) {
        registry = IRegistry(_registry);
    }

    function tipEther(
        ContentType _ctype, uint40 _id, bytes20 _author
    ) public payable {
        address recipient = registry.getOwner(_author);
        require( recipient != 0 && recipient.send(msg.value) );
        Tip(_ctype, _id, 0, msg.value);
    }

    function tipToken(
        ContentType _ctype, uint40 _id, bytes20 _author, address _token, uint _amount
    ) public {
        address recipient = registry.getOwner(_author);
        require( recipient != 0 );
        IToken token = IToken(_token);
        require( token.transferFrom(msg.sender, recipient, _amount) );
        Tip(_ctype, _id, _token, _amount);
    }

}

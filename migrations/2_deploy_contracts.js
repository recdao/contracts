const UtilityLib = artifacts.require("./UtilityLib.sol");
const RECDAO = artifacts.require("./RECDAO.sol");
const Token = artifacts.require("./Token.sol");
const Registry = artifacts.require("./Registry.sol");
const TokenFactory = artifacts.require("./TokenFactory.sol");
const merkleRoot = require("../data/merkleRoot.json");

module.exports = function(deployer) {
  let tokenAddress, regAddress, daoAddress;
  deployer.deploy(UtilityLib)
    .then( () => deployer.link(UtilityLib, RECDAO) )
    .then( () => deployer.deploy(TokenFactory) )
    .then( () => TokenFactory.deployed() )
    .then( tokenFactory => deployer.deploy(Token, tokenFactory.address, 0, 0, "Reddit Ethereum Community Token", 9, "RECT", true ) )
    .then( () => Token.deployed() )
    .then( token => tokenAddress = token.address )
    .then( () => deployer.deploy(Registry) )
    .then( () => Registry.deployed() )
    .then( registry => regAddress = registry.address )
    .then( () => deployer.deploy(RECDAO, 0, tokenAddress, regAddress, merkleRoot, 6000, 0) )
    .then( () => RECDAO.deployed() )
    .then( dao => daoAddress = dao.address )
    .then( () => Token.at(tokenAddress).changeController(daoAddress) )
    .then( () => Registry.at(regAddress).changeController(daoAddress) );
};

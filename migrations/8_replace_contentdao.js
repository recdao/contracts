const ContentDAO = artifacts.require("./ContentDAO.sol");
const Token = artifacts.require("./Token.sol");
const Registry = artifacts.require("./Registry.sol");

module.exports = function(deployer, network) {
  console.log(`migration on ${network}`);
  let tokenAddress, regAddress;
  let voteDuration = 6000;
  let stakeDuration = 3000;
  let lateFlipWindow = 250;
  if(network === "development") voteDuration = 2;
  if(network === "development") stakeDuration = 10;
  if(network === "development") lateFlipWindow = 0;

  deployer
    .then( () => Registry.deployed() )
    .then( registry => regAddress = registry.address )
    .then( () => Token.deployed() )
    .then( token => tokenAddress = token.address )
    .then( () => deployer.deploy(ContentDAO, regAddress, tokenAddress, stakeDuration, voteDuration, lateFlipWindow) );
};

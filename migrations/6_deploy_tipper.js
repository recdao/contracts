const Tipper = artifacts.require("./Tipper.sol");
const Registry = artifacts.require("./Registry.sol");

module.exports = function(deployer, network) {
  console.log(`migration on ${network}`);
  let regAddress;

  deployer
    .then( () => Registry.deployed() )
    .then( registry => regAddress = registry.address )
    .then( () => deployer.deploy(Tipper, regAddress) );
};

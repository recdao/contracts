const ContentDAO = artifacts.require("./ContentDAO.sol");
const RECDAO = artifacts.require("./RECDAO.sol");
const Registry = artifacts.require("./Registry.sol");

const userRegInputs = require("../data/userRegInputs.json");
const testUsername = "TEST_USER";
const testData = userRegInputs[userRegInputs.findIndex(u=>u[0]===testUsername)];
testData.splice(-1,1);                        // remove address
testData[0] = web3.fromAscii(testData[0]);    // convert to hex
testData[4] = 0;                              // force rootIdx to 0

console.log(testData);

contract('ContentDAO', function(accounts) {

  it(`${testUsername} was registered`, async function() {
    let recdao = await RECDAO.deployed();
    let register = await recdao.register(...testData);
    let registry = await Registry.deployed();
    let address = await registry.getOwner.call(testData[0]);
    assert.equal(address, accounts[0], `${testUsername} was not registered`);
  });

  it("STAKE_DURATION is 6000", async function() {
    let contentDAO = await ContentDAO.deployed();
    let stakeDuration = await contentDAO.STAKE_DURATION.call();
    assert.equal(stakeDuration.valueOf(), 6000, "STAKE_DURATION was not 6000");
  });

  it("open Post staking", async function() {
    let contentDAO = await ContentDAO.deployed();
    let stakeDuration = await contentDAO.STAKE_DURATION.call();
    assert.equal(stakeDuration.valueOf(), 6000, "STAKE_DURATION was not 6000");
  });

});

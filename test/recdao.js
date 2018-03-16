var RECDAO = artifacts.require("./RECDAO.sol");

contract('RECDAO', function(accounts) {
  it("PROP_DURATION is 6000", async function() {
    let recdao = await RECDAO.deployed();
    let propDuration = await recdao.PROP_DURATION.call();
    assert.equal(propDuration.valueOf(), 6000, "PROP_DURATION was not 6000");
  });
});

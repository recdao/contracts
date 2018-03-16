var ContentDAO = artifacts.require("./ContentDAO.sol");

contract('ContentDAO', function(accounts) {
  it("STAKE_DURATION is 6000", async function() {
    let contentDAO = await ContentDAO.deployed();
    let stakeDuration = await contentDAO.STAKE_DURATION.call();
    assert.equal(stakeDuration.valueOf(), 6000, "STAKE_DURATION was not 6000");
  });
});

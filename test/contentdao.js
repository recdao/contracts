const ContentDAO = artifacts.require("./ContentDAO.sol");
const RECDAO = artifacts.require("./RECDAO.sol");
const Registry = artifacts.require("./Registry.sol");
const Token = artifacts.require("./Token.sol");
const bases = require("bases");
const decimalize = require("../utils/decimalize");
const userRegInputs = require("../data/userRegInputs.json");
const testUsername = "TEST_USER";
const testData = userRegInputs[userRegInputs.findIndex(u=>u[0]===testUsername)];
testData.splice(-1,1);                        // remove address
testData[0] = web3.fromAscii(testData[0]);    // convert to hex
testData[4] = 0;                              // force rootIdx to 0
const redditPostId = bases.fromBase36("6gkd6v");

contract('ContentDAO', function(accounts) {

  it(`${testUsername} was registered`, async function() {
    let recdao = await RECDAO.deployed();
    let register = await recdao.register(...testData);
    let registry = await Registry.deployed();
    let address = await registry.getOwner.call(testData[0]);
    assert.equal(address, accounts[0], `${testUsername} was not registered`);
  });

  it(`${testUsername} approve`, async function() {
    let contentDAO = await ContentDAO.deployed();
    let token = await Token.deployed();
    let balance = await token.balanceOf.call(accounts[0]);
    assert.equal(balance, decimalize(testData[1]), `${testUsername} was not endowed ${testData[1]}`);
    let allow = await token.approve(contentDAO.address, balance);
    let allowance = await token.allowance.call(accounts[0], contentDAO.address);
    assert.equal(allowance, decimalize(testData[1]), `ContentDAO allowance was ${allowance} and not ${decimalize(testData[1])}`);
  });

  it("STAKE_DURATION is 6000", async function() {
    let contentDAO = await ContentDAO.deployed();
    let stakeDuration = await contentDAO.STAKE_DURATION.call();
    assert.equal(stakeDuration.valueOf(), 6000, "STAKE_DURATION was not 6000");
  });

  it("open Post staking", async function() {
    let contentDAO = await ContentDAO.deployed();
    let open = await contentDAO.open(redditPostId, decimalize(50));
    let post = await contentDAO.posts.call(redditPostId);
    assert.equal(post[4].valueOf(), 1, "post was not Stage.ACTIVE");
  });

  it("flip post to unliked", async function() {
    let contentDAO = await ContentDAO.deployed();
    let stake = await contentDAO.stake(redditPostId, false, decimalize(100));
    let post = await contentDAO.posts.call(redditPostId);
    assert.equal(post[3], false, "post was not flipped to liked=false");
  });

  it("small stake then trim", async function() {
    let contentDAO = await ContentDAO.deployed();
    let stake1 = await contentDAO.stake(redditPostId, true, decimalize(60));    // not enough to flip
    let stake2 = await contentDAO.stake(redditPostId, true, decimalize(345));   // amount should be trimmed
    let post = await contentDAO.posts.call(redditPostId);
    assert.equal(post[3], true, "post was not flipped to liked=true");
    assert.equal(post[2].valueOf(), 400000000000, "toFlip wasn't changed to 400");
  });

});

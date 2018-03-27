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
const redditPostId01 = bases.fromBase36("6gkd6v");
const redditPostId02 = bases.fromBase36("876ya9");
const redditPostId03 = bases.fromBase36("877reh");

contract('ContentDAO', function(accounts) {

  it(`${testUsername} was registered`, async function() {
    let recdao = await RECDAO.deployed();
    let register = await recdao.register(...testData);
    let registry = await Registry.deployed();
    let address = await registry.getOwner.call(testData[0]);
    assert.equal(address, accounts[0], `${testUsername} was not registered`);
  });

  it(`${testUsername} is ContentDAO member`, async function() {
    let contentDAO = await ContentDAO.deployed();
    let isMember = await contentDAO.isMember(accounts[0]);
    assert.ok(isMember, `${testUsername} was not a member`);
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

  it("STAKE_DURATION is 3000", async function() {
    let contentDAO = await ContentDAO.deployed();
    let stakeDuration = await contentDAO.STAKE_DURATION.call();
    assert.equal(stakeDuration.valueOf(), 3000, "STAKE_DURATION was not 3000");
  });

  it("open Post staking", async function() {
    let contentDAO = await ContentDAO.deployed();
    // 50  150 600   2400
    // 100 300 1200  1600
    let open = await contentDAO.stake(redditPostId01, 1, decimalize(50));
    let post = await contentDAO.posts.call(redditPostId01);
    assert.equal(post[3].valueOf(), 1, "post was not Stage.ACTIVE");
  });

  it("flip post to unliked", async function() {
    let contentDAO = await ContentDAO.deployed();
    let stake = await contentDAO.stake(redditPostId01, false, decimalize(100));
    let post = await contentDAO.posts.call(redditPostId01);
    assert.equal(post[2], false, "post was not flipped to liked=false");
  });

  it("small stake then trim", async function() {
    let contentDAO = await ContentDAO.deployed();
    let stake01 = await contentDAO.stake(redditPostId01, true, decimalize(140));   // not enough to flip
    let stake02 = await contentDAO.stake(redditPostId01, true, decimalize(20));    // amount should be trimmed
    let post = await contentDAO.posts.call(redditPostId01);
    assert.equal(post[2], true, "post was not flipped to liked=true");
  });

  it("trigger adjudication", async function() {
    let contentDAO = await ContentDAO.deployed();

    let stake1 = await contentDAO.stake(redditPostId01, false, decimalize( 300 ));
    let stake2 = await contentDAO.stake(redditPostId01, true, decimalize( 600 ));
    let stake3 = await contentDAO.stake(redditPostId01, false, decimalize( 1200 ));
    let stake4 = await contentDAO.stake(redditPostId01, true, decimalize( 2400 ));
    let stake5 = await contentDAO.stake(redditPostId01, false, decimalize( 1600 )); // triggers adjudication
    let post = await contentDAO.posts.call(redditPostId01);
    assert.equal(post[3].valueOf(), 2, "post was not Stage.ADJUDICATION");
  });

  it("adjudicate", async function() {
    let contentDAO = await ContentDAO.deployed();
    let votable = await contentDAO.isVotable.call(redditPostId01);
    assert.ok(votable, "not votable");
    let vote = await contentDAO.vote(redditPostId01, false);
    let ended = await contentDAO.isEnded(redditPostId01);
    assert.ok(ended, "not ended");
    let post = await contentDAO.posts.call(redditPostId01);
    assert.equal(post[3].valueOf(), 2, "post was not Stage.ADJUDICATION");
  });

  it("withdraw post-adjudication", async function() {
    let contentDAO = await ContentDAO.deployed();
    let withdraw = await contentDAO.withdraw(redditPostId01);
    let token = await Token.deployed();
    let balance = await token.balanceOf.call(accounts[0]);
    let contractBalance = await token.balanceOf.call(contentDAO.address);
  });

  it("open Post 02 unliked", async function() {
    let contentDAO = await ContentDAO.deployed();
    let open = await contentDAO.stake(redditPostId02, 0, decimalize(50));
    let post = await contentDAO.posts.call(redditPostId02);
    assert.equal(post[3].valueOf(), 1, "post was not Stage.ACTIVE");
  });

  it("flip Post 02 to liked", async function() {
    let contentDAO = await ContentDAO.deployed();
    let stake = await contentDAO.stake(redditPostId02, true, decimalize(100));
    let post = await contentDAO.posts.call(redditPostId02);
    assert.equal(post[2], true, "post was not flipped to liked=true");
  });

});

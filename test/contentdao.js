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
const redditPostId04 = bases.fromBase36("89o4ju");
const redditPostId05 = bases.fromBase36("89cqfk");

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

  it("STAKE_DURATION is 10 or 3000", async function() {
    let contentDAO = await ContentDAO.deployed();
    let stakeDuration = await contentDAO.STAKE_DURATION.call();
    // assert.equal(stakeDuration.valueOf(), 3000, "STAKE_DURATION was not 3000");
    assert.equal(stakeDuration.valueOf(), 10, "STAKE_DURATION was not 10");
  });

  it("open Post staking", async function() {
    let contentDAO = await ContentDAO.deployed();
    // 50  150 600   2400
    // 100 300 1200  1600

    // 10 30  120 480  1920
    // 20 60  240 960  1280
    let open = await contentDAO.stake(redditPostId01, true, decimalize(10));
    console.log(open.receipt.blockNumber)
    let post = await contentDAO.posts.call(redditPostId01);
    assert.equal(post[3].valueOf(), 1, "post was not Stage.ACTIVE");
  });

  it("flip post to unliked", async function() {
    let contentDAO = await ContentDAO.deployed();
    let stake = await contentDAO.stake(redditPostId01, false, decimalize(20));
    let post = await contentDAO.posts.call(redditPostId01);
    assert.equal(post[2], false, "post was not flipped to liked=false");
  });

  it("small stake then trim", async function() {
    let contentDAO = await ContentDAO.deployed();
    let stake01 = await contentDAO.stake(redditPostId01, true, decimalize(25));   // not enough to flip (needs 30)
    let stake02 = await contentDAO.stake(redditPostId01, true, decimalize(20));    // amount should be trimmed (to 5)
    let post = await contentDAO.posts.call(redditPostId01);
    assert.equal(post[2], true, "post was not flipped to liked=true");
  });

  it("trigger adjudication", async function() {
    let contentDAO = await ContentDAO.deployed();

    // 10 30  120 480  1920
    // 20 60  240 960  1280
    let stake1 = await contentDAO.stake(redditPostId01, false, decimalize( 60 ));
    let stake2 = await contentDAO.stake(redditPostId01, true, decimalize( 120 ));
    let stake3 = await contentDAO.stake(redditPostId01, false, decimalize( 240 ));
    let stake4 = await contentDAO.stake(redditPostId01, true, decimalize( 480 ));
    let stake5 = await contentDAO.stake(redditPostId01, false, decimalize( 960 ));
    let stake6 = await contentDAO.stake(redditPostId01, true, decimalize( 1920 ));
    let stake7 = await contentDAO.stake(redditPostId01, false, decimalize( 1280 )); // triggers adjudication
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
    let withdraw = await contentDAO.withdraw([redditPostId01]);
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

  it("open Post 03 liked", async function() {
    let contentDAO = await ContentDAO.deployed();
    let open = await contentDAO.stake(redditPostId03, 0, decimalize(50));
    let post = await contentDAO.posts.call(redditPostId03);
    assert.equal(post[3].valueOf(), 1, "post was not Stage.ACTIVE");
  });

  it("open Post 04 liked", async function() {
    let contentDAO = await ContentDAO.deployed();
    let open = await contentDAO.stake(redditPostId04, 0, decimalize(50));
    let post = await contentDAO.posts.call(redditPostId04);
    assert.equal(post[3].valueOf(), 1, "post was not Stage.ACTIVE");
  });

  it("open Post 05 liked", async function() {
    let contentDAO = await ContentDAO.deployed();
    let open = await contentDAO.stake(redditPostId05, 0, decimalize(50));
    let post = await contentDAO.posts.call(redditPostId05);
    assert.equal(post[3].valueOf(), 1, "post was not Stage.ACTIVE");
  });

  it("withdraw all", async function() {
    let tx = await pushBlocks(10);
    let contentDAO = await ContentDAO.deployed();
    let stake = await contentDAO.withdraw([redditPostId02, redditPostId03, redditPostId04]);
    // let stake = await contentDAO.withdraw([redditPostId02, redditPostId03, redditPostId04, redditPostId05]);
    console.log(stake);//93153, 87588
    let post = await contentDAO.getPost.call(redditPostId02);
    // console.log(post)
    assert.equal(post[9].valueOf(), 0, "no user stake left Post 02:liked");
    assert.equal(post[10].valueOf(), 0, "no user stake left Post 02:unliked");
  });

  async function pushBlocks(num){
    let token = await Token.deployed();
    let tx = await token.transfer(accounts[0],10);
    if(--num > 0) return await pushBlocks(num);
    else return tx;
  }

});

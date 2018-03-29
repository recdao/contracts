const RECDAO = artifacts.require("./RECDAO.sol");
const Registry = artifacts.require("./Registry.sol");
const Token = artifacts.require("./Token.sol");
const Tipper = artifacts.require("./Tipper.sol");
const bases = require("bases");
const decimalize = require("../utils/decimalize");
const userRegInputs = require("../data/userRegInputs.json");
const testUsername = "TEST_USER";
const testData = userRegInputs[userRegInputs.findIndex(u=>u[0]===testUsername)];
testData.splice(-1,1);                        // remove address
testData[0] = web3.fromAscii(testData[0]);    // convert to hex
testData[4] = 0;                              // force rootIdx to 0
const testUsername2 = "TEST_USER_2";
const testData2 = userRegInputs[userRegInputs.findIndex(u=>u[0]===testUsername2)];
testData2.splice(-1,1);                        // remove address
testData2[0] = web3.fromAscii(testData2[0]);   // convert to hex
testData2[4] = 0;                              // force rootIdx to 0
const redditPostId01 = bases.fromBase36("6gkd6v");
const redditPostId02 = bases.fromBase36("876ya9");
const recipient = "carlslarson";

console.log(web3.version)

contract('Tipper', function(accounts) {

  it(`${testUsername} was registered`, async function() {
    let recdao = await RECDAO.deployed();
    let register = await recdao.register(...testData);
    let registry = await Registry.deployed();
    let address = await registry.getOwner.call(testData[0]);
    assert.equal(address, accounts[0], `${testUsername} was not registered`);
  });

  it(`${testUsername2} was registered`, async function() {
    let recdao = await RECDAO.deployed();
    let register = await recdao.register(...testData2, {from: accounts[1]});
    let registry = await Registry.deployed();
    let address = await registry.getOwner.call(testData2[0]);
    assert.equal(address, accounts[1], `${testUsername2} was not registered`);
  });

  it(`${testUsername} approve REC`, async function() {
    let tipper = await Tipper.deployed();
    let token = await Token.deployed();
    let balance = await token.balanceOf.call(accounts[0]);
    assert.equal(balance, decimalize(testData[1]), `${testUsername} was not endowed ${testData[1]}`);
    let allow = await token.approve(tipper.address, balance);
    let allowance = await token.allowance.call(accounts[0], tipper.address);
    assert.equal(allowance, decimalize(testData[1]), `Tipper allowance was ${allowance} and not ${decimalize(testData[1])}`);
  });

  it("tip ETH", async function() {
    let tip = web3.toWei(3, 'ether');
    let tipper = await Tipper.deployed();
    let startBalance = await web3.eth.getBalance(accounts[1]);
    await tipper.tipEther(0, redditPostId01, testUsername2, {value: tip});
    let balance = await web3.eth.getBalance(accounts[1]);
    assert.equal(balance.valueOf(), startBalance.plus(tip).valueOf(), `${testUsername2} did not receive correct ETH tip`);
  });

  it("tip REC", async function() {
    let tip = decimalize(9);
    let tipper = await Tipper.deployed();
    let token = await Token.deployed();
    let startBalance = await token.balanceOf.call(accounts[1]);
    await tipper.tipToken(0, redditPostId02, testUsername2, token.address, tip);
    let balance = await token.balanceOf.call(accounts[1]);
    assert.equal(balance.valueOf(), startBalance.plus(tip).valueOf(), `${testUsername2} did not receive correct REC tip`);
  });

});

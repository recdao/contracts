const Web3 = require("web3");
const TokenArtifacts = require("../build/contracts/Token.json");


const web3 = new Web3("http://127.0.0.1:8545");
const Token = new web3.eth.Contract(TokenArtifacts.abi, TokenArtifacts.networks["4"].address);
const endowAccount = "0xA49b9cCB75547E37cfB2dE1B048D1b75E23e7784";

run();

async function run(){
  let coinbase = await web3.eth.getCoinbase();
  await Token.methods.transfer(endowAccount, 100*Math.pow(10,9)).send({from: coinbase, gas: 200000});
}

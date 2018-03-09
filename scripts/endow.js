const Web3 = require("web3");
const endowAccount = "0x80f66D2E0eaFa73910ED0B5d411640b48d23B838";

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

web3.eth.net.getId()
  .then(id=>{
    if(id===1) {
      console.log("YOU ARE ON MAINNET YOU FOOL.")
      process.exit();
    }
  })
  .then(()=>web3.eth.getAccounts())
  .then((accounts)=>{
    web3.eth.defaultAccount = accounts[0];
  })
  .then(()=>web3.eth.sendTransaction({
    to:endowAccount,
    value: web3.utils.toWei('1', 'ether'),
    gasLimit: 21000, 
    gasPrice: 20000000000
  }))
  .then(console.log);

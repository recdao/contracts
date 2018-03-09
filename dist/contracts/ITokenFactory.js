import web3 from 'Embark/web3';
import EmbarkJS from 'Embark/EmbarkJS';
let ITokenFactoryJSONConfig = {
  "contract_name": "ITokenFactory",
  "code": "",
  "runtime_bytecode": "",
  "real_runtime_bytecode": "",
  "swarm_hash": "",
  "gas_estimates": null,
  "function_hashes": {
    "createCloneToken(address,uint256,string,uint8,string,bool)": "5b7b72c1"
  },
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_parentToken",
          "type": "address"
        },
        {
          "name": "_snapshotBlock",
          "type": "uint256"
        },
        {
          "name": "_tokenName",
          "type": "string"
        },
        {
          "name": "_decimalUnits",
          "type": "uint8"
        },
        {
          "name": "_tokenSymbol",
          "type": "string"
        },
        {
          "name": "_transfersEnabled",
          "type": "bool"
        }
      ],
      "name": "createCloneToken",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}
;
let ITokenFactory = new EmbarkJS.Contract(ITokenFactoryJSONConfig);

__embarkContext.execWhenReady(function() {

ITokenFactory.setProvider(web3.currentProvider);

});
export default ITokenFactory;

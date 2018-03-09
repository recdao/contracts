import web3 from 'Embark/web3';
import EmbarkJS from 'Embark/EmbarkJS';
let IControlledJSONConfig = {
  "contract_name": "IControlled",
  "code": "",
  "runtime_bytecode": "",
  "real_runtime_bytecode": "",
  "swarm_hash": "",
  "gas_estimates": null,
  "function_hashes": {
    "changeController(address)": "3cebb823",
    "controller()": "f77c4791"
  },
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newController",
          "type": "address"
        }
      ],
      "name": "changeController",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "controller",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]
}
;
let IControlled = new EmbarkJS.Contract(IControlledJSONConfig);

__embarkContext.execWhenReady(function() {

IControlled.setProvider(web3.currentProvider);

});
export default IControlled;

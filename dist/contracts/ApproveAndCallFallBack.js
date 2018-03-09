import web3 from 'Embark/web3';
import EmbarkJS from 'Embark/EmbarkJS';
let ApproveAndCallFallBackJSONConfig = {
  "contract_name": "ApproveAndCallFallBack",
  "code": "",
  "runtime_bytecode": "",
  "real_runtime_bytecode": "",
  "swarm_hash": "",
  "gas_estimates": null,
  "function_hashes": {
    "receiveApproval(address,uint256,address,bytes)": "8f4ffcb1"
  },
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "from",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "receiveApproval",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}
;
let ApproveAndCallFallBack = new EmbarkJS.Contract(ApproveAndCallFallBackJSONConfig);

__embarkContext.execWhenReady(function() {

ApproveAndCallFallBack.setProvider(web3.currentProvider);

});
export default ApproveAndCallFallBack;

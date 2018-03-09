import web3 from 'Embark/web3';
import EmbarkJS from 'Embark/EmbarkJS';
let ControlledJSONConfig = {
  "contract_name": "Controlled",
  "code": "6060604052341561000f57600080fd5b60008054600160a060020a033316600160a060020a03199091161790556101668061003b6000396000f30060606040526004361061004b5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633cebb8238114610050578063f77c47911461007e575b600080fd5b341561005b57600080fd5b61007c73ffffffffffffffffffffffffffffffffffffffff600435166100ba565b005b341561008957600080fd5b61009161011e565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b6000543373ffffffffffffffffffffffffffffffffffffffff9081169116146100e257600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60005473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a723058200b670656c7103b3ce2f5a1f2b03b6355beb5cfa29886555a654785145182b3d80029",
  "runtime_bytecode": "60606040526004361061004b5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633cebb8238114610050578063f77c47911461007e575b600080fd5b341561005b57600080fd5b61007c73ffffffffffffffffffffffffffffffffffffffff600435166100ba565b005b341561008957600080fd5b61009161011e565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b6000543373ffffffffffffffffffffffffffffffffffffffff9081169116146100e257600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60005473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a723058200b670656c7103b3ce2f5a1f2b03b6355beb5cfa29886555a654785145182b3d80029",
  "real_runtime_bytecode": "60606040526004361061004b5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633cebb8238114610050578063f77c47911461007e575b600080fd5b341561005b57600080fd5b61007c73ffffffffffffffffffffffffffffffffffffffff600435166100ba565b005b341561008957600080fd5b61009161011e565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b6000543373ffffffffffffffffffffffffffffffffffffffff9081169116146100e257600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60005473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a723058200b670656c7103b3ce2f5a1f2b03b6355beb5cfa29886555a654785145182b3d80029",
  "swarm_hash": "0b670656c7103b3ce2f5a1f2b03b6355beb5cfa29886555a654785145182b3d8",
  "gas_estimates": {
    "creation": {
      "codeDepositCost": "71600",
      "executionCost": "20491",
      "totalCost": "92091"
    },
    "external": {
      "changeController(address)": "20622",
      "controller()": "410"
    }
  },
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
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
  ]
}
;
let Controlled = new EmbarkJS.Contract(ControlledJSONConfig);

__embarkContext.execWhenReady(function() {

Controlled.setProvider(web3.currentProvider);

});
export default Controlled;

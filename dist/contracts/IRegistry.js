import web3 from 'Embark/web3';
import EmbarkJS from 'Embark/EmbarkJS';
let IRegistryJSONConfig = {
  "contract_name": "IRegistry",
  "code": "",
  "runtime_bytecode": "",
  "real_runtime_bytecode": "",
  "swarm_hash": "",
  "gas_estimates": null,
  "function_hashes": {
    "add(bytes20,address,uint32,uint32,uint16)": "eaa3cd7e",
    "changeController(address)": "3cebb823",
    "controller()": "f77c4791",
    "getFirstContentAt(bytes20)": "54e11522",
    "getKarma(bytes20)": "4f80cc54",
    "getLastRootIndex(bytes20)": "5cc0fe5b",
    "getOwner(bytes20)": "e487eb58",
    "ownerToUsername(address)": "730ecf34",
    "remove(bytes20)": "26e9fd9e",
    "update(bytes20,address,uint32,uint16)": "a1584630"
  },
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_username",
          "type": "bytes20"
        }
      ],
      "name": "remove",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
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
      "inputs": [
        {
          "name": "_username",
          "type": "bytes20"
        }
      ],
      "name": "getKarma",
      "outputs": [
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_username",
          "type": "bytes20"
        }
      ],
      "name": "getFirstContentAt",
      "outputs": [
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_username",
          "type": "bytes20"
        }
      ],
      "name": "getLastRootIndex",
      "outputs": [
        {
          "name": "",
          "type": "uint16"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "ownerToUsername",
      "outputs": [
        {
          "name": "",
          "type": "bytes20"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_username",
          "type": "bytes20"
        },
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_karma",
          "type": "uint32"
        },
        {
          "name": "_rootIndex",
          "type": "uint16"
        }
      ],
      "name": "update",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_username",
          "type": "bytes20"
        }
      ],
      "name": "getOwner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_username",
          "type": "bytes20"
        },
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_karma",
          "type": "uint32"
        },
        {
          "name": "_firstContentAt",
          "type": "uint32"
        },
        {
          "name": "_rootIndex",
          "type": "uint16"
        }
      ],
      "name": "add",
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
let IRegistry = new EmbarkJS.Contract(IRegistryJSONConfig);

__embarkContext.execWhenReady(function() {

IRegistry.setProvider(web3.currentProvider);

});
export default IRegistry;

import web3 from 'Embark/web3';
import EmbarkJS from 'Embark/EmbarkJS';
let RegistryJSONConfig = {
  "contract_name": "Registry",
  "address": "0x6fcac0b53a0a075c5734df941012827ed6d54138",
  "code": "606060405260008054600160a060020a033316600160a060020a0319909116179055610890806100306000396000f3006060604052600436106100955763ffffffff60e060020a60003504166326e9fd9e811461009a5780633cebb823146100bc5780634f80cc54146100db57806354e11522146101145780635cc0fe5b14610134578063730ecf341461016b578063a1584630146101a7578063a170c7f4146101e3578063e487eb5814610243578063eaa3cd7e1461027f578063f77c4791146102c1575b600080fd5b34156100a557600080fd5b6100ba6001606060020a0319600435166102d4565b005b34156100c757600080fd5b6100ba600160a060020a03600435166103a7565b34156100e657600080fd5b6100fb6001606060020a0319600435166103f1565b60405163ffffffff909116815260200160405180910390f35b341561011f57600080fd5b6100fb6001606060020a03196004351661041a565b341561013f57600080fd5b6101546001606060020a031960043516610458565b60405161ffff909116815260200160405180910390f35b341561017657600080fd5b61018a600160a060020a036004351661047f565b6040516001606060020a0319909116815260200160405180910390f35b34156101b257600080fd5b6100ba6001606060020a031960043516600160a060020a036024351663ffffffff6044351661ffff606435166104a0565b34156101ee57600080fd5b6102036001606060020a0319600435166105f2565b604051600160a060020a03909416845263ffffffff9283166020850152911660408084019190915261ffff90911660608301526080909101905180910390f35b341561024e57600080fd5b6102636001606060020a03196004351661064a565b604051600160a060020a03909116815260200160405180910390f35b341561028a57600080fd5b6100ba6001606060020a031960043516600160a060020a036024351663ffffffff6044358116906064351661ffff6084351661066f565b34156102cc57600080fd5b610263610855565b60005433600160a060020a039081169116146102ef57600080fd5b6001606060020a0319811660008181526001602081815260408084208054600160a060020a0316855260028352818520805473ffffffffffffffffffffffffffffffffffffffff19169055949093525281547fffff000000000000000000000000000000000000000000000000000000000000169091557f5165dcfa3c0d9ebc06abb7dcdfcf48f4b03cd46e12cef46b112fde0cde90c911908290516001606060020a0319909116815260200160405180910390a150565b60005433600160a060020a039081169116146103c257600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b6001606060020a03191660009081526001602052604090205460a060020a900463ffffffff1690565b6001606060020a0319166000908152600160205260409020547801000000000000000000000000000000000000000000000000900463ffffffff1690565b6001606060020a03191660009081526001602052604090205460e060020a900461ffff1690565b6002602052600090815260409020546c010000000000000000000000000281565b60005433600160a060020a039081169116146104bb57600080fd5b6001606060020a031984166000908152600160205260409020805477ffffffff0000000000000000000000000000000000000000191660a060020a63ffffffff851602177fffff0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff1660e060020a61ffff8416021790819055600160a060020a03908116908416146105ae57600160a060020a038316600081815260026020908152604080832080546c010000000000000000000000008a0473ffffffffffffffffffffffffffffffffffffffff19918216179091556001606060020a0319891684526001909252909120805490911690911790555b7f317f8556b7cc4212da78e555e2d8add340a78d390d66d846dd51a7127c585573846040516001606060020a0319909116815260200160405180910390a150505050565b600160205260009081526040902054600160a060020a0381169063ffffffff60a060020a8204811691780100000000000000000000000000000000000000000000000081049091169061ffff60e060020a9091041684565b6001606060020a031916600090815260016020526040902054600160a060020a031690565b60005433600160a060020a0390811691161461068a57600080fd5b60806040519081016040908152600160a060020a038616825263ffffffff8086166020808501919091529085168284015261ffff841660608401526001606060020a0319881660009081526001909152208151815473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03919091161781556020820151815463ffffffff9190911660a060020a0277ffffffff0000000000000000000000000000000000000000199091161781556040820151815463ffffffff919091167801000000000000000000000000000000000000000000000000027fffffffff00000000ffffffffffffffffffffffffffffffffffffffffffffffff909116178155606082015181547fffff0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff1660e060020a61ffff929092169190910217905550600160a060020a03841660009081526002602052604090819020805473ffffffffffffffffffffffffffffffffffffffff19166c0100000000000000000000000088041790557fcaededfa9707431fa24dc6540480315d555bf2fcaa7125036d222fcb70e03531908690516001606060020a0319909116815260200160405180910390a15050505050565b600054600160a060020a0316815600a165627a7a72305820feeaeae5c4778e337cf58ba4f87c99fb8d94c10a9e00c4f288ee8c8a1506d9e40029",
  "runtime_bytecode": "6060604052600436106100955763ffffffff60e060020a60003504166326e9fd9e811461009a5780633cebb823146100bc5780634f80cc54146100db57806354e11522146101145780635cc0fe5b14610134578063730ecf341461016b578063a1584630146101a7578063a170c7f4146101e3578063e487eb5814610243578063eaa3cd7e1461027f578063f77c4791146102c1575b600080fd5b34156100a557600080fd5b6100ba6001606060020a0319600435166102d4565b005b34156100c757600080fd5b6100ba600160a060020a03600435166103a7565b34156100e657600080fd5b6100fb6001606060020a0319600435166103f1565b60405163ffffffff909116815260200160405180910390f35b341561011f57600080fd5b6100fb6001606060020a03196004351661041a565b341561013f57600080fd5b6101546001606060020a031960043516610458565b60405161ffff909116815260200160405180910390f35b341561017657600080fd5b61018a600160a060020a036004351661047f565b6040516001606060020a0319909116815260200160405180910390f35b34156101b257600080fd5b6100ba6001606060020a031960043516600160a060020a036024351663ffffffff6044351661ffff606435166104a0565b34156101ee57600080fd5b6102036001606060020a0319600435166105f2565b604051600160a060020a03909416845263ffffffff9283166020850152911660408084019190915261ffff90911660608301526080909101905180910390f35b341561024e57600080fd5b6102636001606060020a03196004351661064a565b604051600160a060020a03909116815260200160405180910390f35b341561028a57600080fd5b6100ba6001606060020a031960043516600160a060020a036024351663ffffffff6044358116906064351661ffff6084351661066f565b34156102cc57600080fd5b610263610855565b60005433600160a060020a039081169116146102ef57600080fd5b6001606060020a0319811660008181526001602081815260408084208054600160a060020a0316855260028352818520805473ffffffffffffffffffffffffffffffffffffffff19169055949093525281547fffff000000000000000000000000000000000000000000000000000000000000169091557f5165dcfa3c0d9ebc06abb7dcdfcf48f4b03cd46e12cef46b112fde0cde90c911908290516001606060020a0319909116815260200160405180910390a150565b60005433600160a060020a039081169116146103c257600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b6001606060020a03191660009081526001602052604090205460a060020a900463ffffffff1690565b6001606060020a0319166000908152600160205260409020547801000000000000000000000000000000000000000000000000900463ffffffff1690565b6001606060020a03191660009081526001602052604090205460e060020a900461ffff1690565b6002602052600090815260409020546c010000000000000000000000000281565b60005433600160a060020a039081169116146104bb57600080fd5b6001606060020a031984166000908152600160205260409020805477ffffffff0000000000000000000000000000000000000000191660a060020a63ffffffff851602177fffff0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff1660e060020a61ffff8416021790819055600160a060020a03908116908416146105ae57600160a060020a038316600081815260026020908152604080832080546c010000000000000000000000008a0473ffffffffffffffffffffffffffffffffffffffff19918216179091556001606060020a0319891684526001909252909120805490911690911790555b7f317f8556b7cc4212da78e555e2d8add340a78d390d66d846dd51a7127c585573846040516001606060020a0319909116815260200160405180910390a150505050565b600160205260009081526040902054600160a060020a0381169063ffffffff60a060020a8204811691780100000000000000000000000000000000000000000000000081049091169061ffff60e060020a9091041684565b6001606060020a031916600090815260016020526040902054600160a060020a031690565b60005433600160a060020a0390811691161461068a57600080fd5b60806040519081016040908152600160a060020a038616825263ffffffff8086166020808501919091529085168284015261ffff841660608401526001606060020a0319881660009081526001909152208151815473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03919091161781556020820151815463ffffffff9190911660a060020a0277ffffffff0000000000000000000000000000000000000000199091161781556040820151815463ffffffff919091167801000000000000000000000000000000000000000000000000027fffffffff00000000ffffffffffffffffffffffffffffffffffffffffffffffff909116178155606082015181547fffff0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff1660e060020a61ffff929092169190910217905550600160a060020a03841660009081526002602052604090819020805473ffffffffffffffffffffffffffffffffffffffff19166c0100000000000000000000000088041790557fcaededfa9707431fa24dc6540480315d555bf2fcaa7125036d222fcb70e03531908690516001606060020a0319909116815260200160405180910390a15050505050565b600054600160a060020a0316815600a165627a7a72305820feeaeae5c4778e337cf58ba4f87c99fb8d94c10a9e00c4f288ee8c8a1506d9e40029",
  "real_runtime_bytecode": "6060604052600436106100955763ffffffff60e060020a60003504166326e9fd9e811461009a5780633cebb823146100bc5780634f80cc54146100db57806354e11522146101145780635cc0fe5b14610134578063730ecf341461016b578063a1584630146101a7578063a170c7f4146101e3578063e487eb5814610243578063eaa3cd7e1461027f578063f77c4791146102c1575b600080fd5b34156100a557600080fd5b6100ba6001606060020a0319600435166102d4565b005b34156100c757600080fd5b6100ba600160a060020a03600435166103a7565b34156100e657600080fd5b6100fb6001606060020a0319600435166103f1565b60405163ffffffff909116815260200160405180910390f35b341561011f57600080fd5b6100fb6001606060020a03196004351661041a565b341561013f57600080fd5b6101546001606060020a031960043516610458565b60405161ffff909116815260200160405180910390f35b341561017657600080fd5b61018a600160a060020a036004351661047f565b6040516001606060020a0319909116815260200160405180910390f35b34156101b257600080fd5b6100ba6001606060020a031960043516600160a060020a036024351663ffffffff6044351661ffff606435166104a0565b34156101ee57600080fd5b6102036001606060020a0319600435166105f2565b604051600160a060020a03909416845263ffffffff9283166020850152911660408084019190915261ffff90911660608301526080909101905180910390f35b341561024e57600080fd5b6102636001606060020a03196004351661064a565b604051600160a060020a03909116815260200160405180910390f35b341561028a57600080fd5b6100ba6001606060020a031960043516600160a060020a036024351663ffffffff6044358116906064351661ffff6084351661066f565b34156102cc57600080fd5b610263610855565b60005433600160a060020a039081169116146102ef57600080fd5b6001606060020a0319811660008181526001602081815260408084208054600160a060020a0316855260028352818520805473ffffffffffffffffffffffffffffffffffffffff19169055949093525281547fffff000000000000000000000000000000000000000000000000000000000000169091557f5165dcfa3c0d9ebc06abb7dcdfcf48f4b03cd46e12cef46b112fde0cde90c911908290516001606060020a0319909116815260200160405180910390a150565b60005433600160a060020a039081169116146103c257600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b6001606060020a03191660009081526001602052604090205460a060020a900463ffffffff1690565b6001606060020a0319166000908152600160205260409020547801000000000000000000000000000000000000000000000000900463ffffffff1690565b6001606060020a03191660009081526001602052604090205460e060020a900461ffff1690565b6002602052600090815260409020546c010000000000000000000000000281565b60005433600160a060020a039081169116146104bb57600080fd5b6001606060020a031984166000908152600160205260409020805477ffffffff0000000000000000000000000000000000000000191660a060020a63ffffffff851602177fffff0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff1660e060020a61ffff8416021790819055600160a060020a03908116908416146105ae57600160a060020a038316600081815260026020908152604080832080546c010000000000000000000000008a0473ffffffffffffffffffffffffffffffffffffffff19918216179091556001606060020a0319891684526001909252909120805490911690911790555b7f317f8556b7cc4212da78e555e2d8add340a78d390d66d846dd51a7127c585573846040516001606060020a0319909116815260200160405180910390a150505050565b600160205260009081526040902054600160a060020a0381169063ffffffff60a060020a8204811691780100000000000000000000000000000000000000000000000081049091169061ffff60e060020a9091041684565b6001606060020a031916600090815260016020526040902054600160a060020a031690565b60005433600160a060020a0390811691161461068a57600080fd5b60806040519081016040908152600160a060020a038616825263ffffffff8086166020808501919091529085168284015261ffff841660608401526001606060020a0319881660009081526001909152208151815473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03919091161781556020820151815463ffffffff9190911660a060020a0277ffffffff0000000000000000000000000000000000000000199091161781556040820151815463ffffffff919091167801000000000000000000000000000000000000000000000000027fffffffff00000000ffffffffffffffffffffffffffffffffffffffffffffffff909116178155606082015181547fffff0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff1660e060020a61ffff929092169190910217905550600160a060020a03841660009081526002602052604090819020805473ffffffffffffffffffffffffffffffffffffffff19166c0100000000000000000000000088041790557fcaededfa9707431fa24dc6540480315d555bf2fcaa7125036d222fcb70e03531908690516001606060020a0319909116815260200160405180910390a15050505050565b600054600160a060020a0316815600a165627a7a72305820feeaeae5c4778e337cf58ba4f87c99fb8d94c10a9e00c4f288ee8c8a1506d9e40029",
  "swarm_hash": "feeaeae5c4778e337cf58ba4f87c99fb8d94c10a9e00c4f288ee8c8a1506d9e4",
  "gas_estimates": {
    "creation": {
      "codeDepositCost": "438400",
      "executionCost": "20823",
      "totalCost": "459223"
    },
    "external": {
      "add(bytes20,address,uint32,uint32,uint16)": "103990",
      "changeController(address)": "20914",
      "controller()": "809",
      "getFirstContentAt(bytes20)": "756",
      "getKarma(bytes20)": "797",
      "getLastRootIndex(bytes20)": "841",
      "getOwner(bytes20)": "993",
      "ownerToUsername(address)": "782",
      "remove(bytes20)": "42666",
      "update(bytes20,address,uint32,uint16)": "63376",
      "usernameToUser(bytes20)": "1184"
    }
  },
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
    "update(bytes20,address,uint32,uint16)": "a1584630",
    "usernameToUser(bytes20)": "a170c7f4"
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
          "name": "karma",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
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
      "name": "getFirstContentAt",
      "outputs": [
        {
          "name": "firstContentAt",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
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
      "name": "getLastRootIndex",
      "outputs": [
        {
          "name": "rootIndex",
          "type": "uint16"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
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
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes20"
        }
      ],
      "name": "usernameToUser",
      "outputs": [
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "karma",
          "type": "uint32"
        },
        {
          "name": "firstContentAt",
          "type": "uint32"
        },
        {
          "name": "lastRootIndex",
          "type": "uint16"
        }
      ],
      "payable": false,
      "stateMutability": "view",
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
      "name": "getOwner",
      "outputs": [
        {
          "name": "owner",
          "type": "address"
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
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "username",
          "type": "bytes20"
        }
      ],
      "name": "Added",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "username",
          "type": "bytes20"
        }
      ],
      "name": "Updated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "username",
          "type": "bytes20"
        }
      ],
      "name": "Removed",
      "type": "event"
    }
  ]
}
;
let Registry = new EmbarkJS.Contract(RegistryJSONConfig);

__embarkContext.execWhenReady(function() {

Registry.setProvider(web3.currentProvider);

});
export default Registry;

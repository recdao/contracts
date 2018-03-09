import web3 from 'Embark/web3';
import EmbarkJS from 'Embark/EmbarkJS';
let UtilityLibJSONConfig = {
  "contract_name": "UtilityLib",
  "address": "0x22abfc6ee504aa8da6a348bb83b256de7e4fcbe5",
  "code": "6060604052341561000f57600080fd5b6104088061001e6000396000f3006060604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633df86f7981146100665780636d4be70f146100b057806372a52851146100ed578063a817d2de1461014c575b600080fd5b610071600435610179565b6040516bffffffffffffffffffffffff19909216825273ffffffffffffffffffffffffffffffffffffffff191660208201526040908101905180910390f35b6100db6bffffffffffffffffffffffff196004351662ffffff6024351663ffffffff6044351661020b565b60405190815260200160405180910390f35b6101386004602481358181019083013580602081810201604051908101604052809392919081815260200183836020028082843750949650508435946020013593506102bf92505050565b604051901515815260200160405180910390f35b61015760043561035f565b6040516bffffffffffffffffffffffff19909116815260200160405180910390f35b60008060006101878461035f565b9250601490505b60208110156102055760086013198201028482602081106101ab57fe5b60029290920a911a7f0100000000000000000000000000000000000000000000000000000000000000027fff000000000000000000000000000000000000000000000000000000000000001604919091189060010161018e565b50915091565b6000803385858560405173ffffffffffffffffffffffffffffffffffffffff949094166c010000000000000000000000000284526bffffffffffffffffffffffff1992909216601484015262ffffff167d01000000000000000000000000000000000000000000000000000000000002602883015263ffffffff167c010000000000000000000000000000000000000000000000000000000002602b820152602f0160405190819003902095945050505050565b6000805b8451811015610357578481815181106102d857fe5b9060200190602002015183101561031e57828582815181106102f657fe5b906020019060200201516040519182526020820152604090810190518091039020925061034f565b84818151811061032a57fe5b9060200190602002015183604051918252602082015260409081019051809103902092505b6001016102c3565b505014919050565b6000805b60148110156103d6576008810283826020811061037c57fe5b60029290920a911a7f0100000000000000000000000000000000000000000000000000000000000000027fff0000000000000000000000000000000000000000000000000000000000000016049190911890600101610363565b509190505600a165627a7a723058209e9425c32471fa13de6fc1614b9033fcfaf08d66f8a7f2d11417dd4c24e4571c0029",
  "runtime_bytecode": "6060604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633df86f7981146100665780636d4be70f146100b057806372a52851146100ed578063a817d2de1461014c575b600080fd5b610071600435610179565b6040516bffffffffffffffffffffffff19909216825273ffffffffffffffffffffffffffffffffffffffff191660208201526040908101905180910390f35b6100db6bffffffffffffffffffffffff196004351662ffffff6024351663ffffffff6044351661020b565b60405190815260200160405180910390f35b6101386004602481358181019083013580602081810201604051908101604052809392919081815260200183836020028082843750949650508435946020013593506102bf92505050565b604051901515815260200160405180910390f35b61015760043561035f565b6040516bffffffffffffffffffffffff19909116815260200160405180910390f35b60008060006101878461035f565b9250601490505b60208110156102055760086013198201028482602081106101ab57fe5b60029290920a911a7f0100000000000000000000000000000000000000000000000000000000000000027fff000000000000000000000000000000000000000000000000000000000000001604919091189060010161018e565b50915091565b6000803385858560405173ffffffffffffffffffffffffffffffffffffffff949094166c010000000000000000000000000284526bffffffffffffffffffffffff1992909216601484015262ffffff167d01000000000000000000000000000000000000000000000000000000000002602883015263ffffffff167c010000000000000000000000000000000000000000000000000000000002602b820152602f0160405190819003902095945050505050565b6000805b8451811015610357578481815181106102d857fe5b9060200190602002015183101561031e57828582815181106102f657fe5b906020019060200201516040519182526020820152604090810190518091039020925061034f565b84818151811061032a57fe5b9060200190602002015183604051918252602082015260409081019051809103902092505b6001016102c3565b505014919050565b6000805b60148110156103d6576008810283826020811061037c57fe5b60029290920a911a7f0100000000000000000000000000000000000000000000000000000000000000027fff0000000000000000000000000000000000000000000000000000000000000016049190911890600101610363565b509190505600a165627a7a723058209e9425c32471fa13de6fc1614b9033fcfaf08d66f8a7f2d11417dd4c24e4571c0029",
  "real_runtime_bytecode": "6060604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633df86f7981146100665780636d4be70f146100b057806372a52851146100ed578063a817d2de1461014c575b600080fd5b610071600435610179565b6040516bffffffffffffffffffffffff19909216825273ffffffffffffffffffffffffffffffffffffffff191660208201526040908101905180910390f35b6100db6bffffffffffffffffffffffff196004351662ffffff6024351663ffffffff6044351661020b565b60405190815260200160405180910390f35b6101386004602481358181019083013580602081810201604051908101604052809392919081815260200183836020028082843750949650508435946020013593506102bf92505050565b604051901515815260200160405180910390f35b61015760043561035f565b6040516bffffffffffffffffffffffff19909116815260200160405180910390f35b60008060006101878461035f565b9250601490505b60208110156102055760086013198201028482602081106101ab57fe5b60029290920a911a7f0100000000000000000000000000000000000000000000000000000000000000027fff000000000000000000000000000000000000000000000000000000000000001604919091189060010161018e565b50915091565b6000803385858560405173ffffffffffffffffffffffffffffffffffffffff949094166c010000000000000000000000000284526bffffffffffffffffffffffff1992909216601484015262ffffff167d01000000000000000000000000000000000000000000000000000000000002602883015263ffffffff167c010000000000000000000000000000000000000000000000000000000002602b820152602f0160405190819003902095945050505050565b6000805b8451811015610357578481815181106102d857fe5b9060200190602002015183101561031e57828582815181106102f657fe5b906020019060200201516040519182526020820152604090810190518091039020925061034f565b84818151811061032a57fe5b9060200190602002015183604051918252602082015260409081019051809103902092505b6001016102c3565b505014919050565b6000805b60148110156103d6576008810283826020811061037c57fe5b60029290920a911a7f0100000000000000000000000000000000000000000000000000000000000000027fff0000000000000000000000000000000000000000000000000000000000000016049190911890600101610363565b509190505600a165627a7a723058209e9425c32471fa13de6fc1614b9033fcfaf08d66f8a7f2d11417dd4c24e4571c0029",
  "swarm_hash": "9e9425c32471fa13de6fc1614b9033fcfaf08d66f8a7f2d11417dd4c24e4571c",
  "gas_estimates": {
    "creation": {
      "codeDepositCost": "206400",
      "executionCost": "246",
      "totalCost": "206646"
    },
    "external": {
      "checkProof(bytes32[],bytes32,bytes32)": "infinite",
      "ethereumSHA3(bytes20,uint24,uint32)": "434",
      "extract20(bytes32)": "infinite",
      "split32_20_12(bytes32)": "infinite"
    }
  },
  "function_hashes": {
    "checkProof(bytes32[],bytes32,bytes32)": "72a52851",
    "ethereumSHA3(bytes20,uint24,uint32)": "6d4be70f",
    "extract20(bytes32)": "a817d2de",
    "split32_20_12(bytes32)": "3df86f79"
  },
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "data",
          "type": "bytes32"
        }
      ],
      "name": "split32_20_12",
      "outputs": [
        {
          "name": "twenty",
          "type": "bytes20"
        },
        {
          "name": "twelve",
          "type": "bytes12"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_username",
          "type": "bytes20"
        },
        {
          "name": "_endowment",
          "type": "uint24"
        },
        {
          "name": "_firstContent",
          "type": "uint32"
        }
      ],
      "name": "ethereumSHA3",
      "outputs": [
        {
          "name": "result",
          "type": "bytes32"
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
          "name": "proof",
          "type": "bytes32[]"
        },
        {
          "name": "root",
          "type": "bytes32"
        },
        {
          "name": "hash",
          "type": "bytes32"
        }
      ],
      "name": "checkProof",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "data",
          "type": "bytes32"
        }
      ],
      "name": "extract20",
      "outputs": [
        {
          "name": "result",
          "type": "bytes20"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    }
  ]
}
;
let UtilityLib = new EmbarkJS.Contract(UtilityLibJSONConfig);

__embarkContext.execWhenReady(function() {

UtilityLib.setProvider(web3.currentProvider);

});
export default UtilityLib;

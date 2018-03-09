import web3 from 'Embark/web3';
import EmbarkJS from 'Embark/EmbarkJS';
let ContentScoreJSONConfig = {
  "contract_name": "ContentScore",
  "address": "0x364f2f47ead7f6d5dcc3f7a155e7a8e02ae82a5d",
  "code": "6060604052341561000f57600080fd5b6040516020806109128339810160405280805160008054600160a060020a03909216600160a060020a031990921691909117905550506108be806100546000396000f30060606040526004361061005e5763ffffffff60e060020a60003504166330da4526811461006357806354e73580146100ba57806379f5ed381461010d5780637b1039991461013c578063ed12e15c1461016b578063f8d3ce5e14610197575b600080fd5b341561006e57600080fd5b61008064ffffffffff600435166101b4565b60405163ffffffff948516815292909316602083015264ffffffffff90811660408084019190915292166060820152608001905180910390f35b34156100c557600080fd5b6100e96bffffffffffffffffffffffff196004351664ffffffffff60243516610202565b604051808260028111156100f957fe5b60ff16815260200191505060405180910390f35b341561011857600080fd5b6100e96bffffffffffffffffffffffff196004351664ffffffffff60243516610222565b341561014757600080fd5b61014f610242565b604051600160a060020a03909116815260200160405180910390f35b341561017657600080fd5b61019560ff60043581169064ffffffffff602435169060443516610251565b005b34156101a257600080fd5b61008064ffffffffff60043516610844565b60026020526000908152604090205463ffffffff8082169164010000000081049091169064ffffffffff6801000000000000000082048116916d010000000000000000000000000090041684565b600460209081526000928352604080842090915290825290205460ff1681565b600360209081526000928352604080842090915290825290205460ff1681565b600054600160a060020a031681565b6000805481908190600160a060020a031663730ecf3433836040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156102ae57600080fd5b6102c65a03f115156102bf57600080fd5b50505060405180519350506bffffffffffffffffffffffff19831615156102e557600080fd5b60008660018111156102f357fe5b141561033f57505064ffffffffff831660008181526001602090815260408083206bffffffffffffffffffffffff1986168452600383528184209484529390915290205460ff16610381565b505064ffffffffff831660008181526002602090815260408083206bffffffffffffffffffffffff1986168452600483528184209484529390915290205460ff165b83600281111561038d57fe5b81600281111561039957fe5b14156103a457600080fd5b60008160028111156103b257fe5b146105a05760018160028111156103c557fe5b14156104a157815463ffffffff19811663ffffffff9182166000190190911617825560008054600160a060020a031690634f80cc549085906040516020015260405160e060020a63ffffffff84160281526bffffffffffffffffffffffff199091166004820152602401602060405180830381600087803b151561044857600080fd5b6102c65a03f1151561045957600080fd5b5050506040518051835463ffffffff90911664ffffffffff6801000000000000000080840482169290920316026cffffffffff000000000000000019909116178355506105a0565b60028160028111156104af57fe5b14156105a057815460001963ffffffff640100000000808404821692909201160267ffffffff000000001990911617825560008054600160a060020a031690634f80cc549085906040516020015260405160e060020a63ffffffff84160281526bffffffffffffffffffffffff199091166004820152602401602060405180830381600087803b151561054157600080fd5b6102c65a03f1151561055257600080fd5b5050506040518051835463ffffffff90911664ffffffffff6d0100000000000000000000000000808404821692909203160271ffffffffff0000000000000000000000000019909116178355505b60008660018111156105ae57fe5b1415610605576bffffffffffffffffffffffff198316600090815260036020908152604080832064ffffffffff891684529091529020805485919060ff191660018360028111156105fb57fe5b0217905550610652565b6bffffffffffffffffffffffff198316600090815260046020908152604080832064ffffffffff891684529091529020805485919060ff1916600183600281111561064c57fe5b02179055505b600184600281111561066057fe5b141561073c57815463ffffffff8082166001011663ffffffff1990911617825560008054600160a060020a031690634f80cc549085906040516020015260405160e060020a63ffffffff84160281526bffffffffffffffffffffffff199091166004820152602401602060405180830381600087803b15156106e157600080fd5b6102c65a03f115156106f257600080fd5b5050506040518051835464ffffffffff68010000000000000000808304821663ffffffff90941693909301169091026cffffffffff0000000000000000199091161783555061083c565b600284600281111561074a57fe5b141561083c578154600163ffffffff640100000000808404821692909201160267ffffffff000000001990911617825560008054600160a060020a031690634f80cc549085906040516020015260405160e060020a63ffffffff84160281526bffffffffffffffffffffffff199091166004820152602401602060405180830381600087803b15156107db57600080fd5b6102c65a03f115156107ec57600080fd5b5050506040518051835464ffffffffff6d0100000000000000000000000000808304821663ffffffff909416939093011690910271ffffffffff0000000000000000000000000019909116178355505b505050505050565b60016020526000908152604090205463ffffffff8082169164010000000081049091169064ffffffffff6801000000000000000082048116916d0100000000000000000000000000900416845600a165627a7a7230582043fc9798a2732b0493bdf0974ebf05482506a10a8fb0a49e7f4996dde64f3ace0029",
  "runtime_bytecode": "60606040526004361061005e5763ffffffff60e060020a60003504166330da4526811461006357806354e73580146100ba57806379f5ed381461010d5780637b1039991461013c578063ed12e15c1461016b578063f8d3ce5e14610197575b600080fd5b341561006e57600080fd5b61008064ffffffffff600435166101b4565b60405163ffffffff948516815292909316602083015264ffffffffff90811660408084019190915292166060820152608001905180910390f35b34156100c557600080fd5b6100e96bffffffffffffffffffffffff196004351664ffffffffff60243516610202565b604051808260028111156100f957fe5b60ff16815260200191505060405180910390f35b341561011857600080fd5b6100e96bffffffffffffffffffffffff196004351664ffffffffff60243516610222565b341561014757600080fd5b61014f610242565b604051600160a060020a03909116815260200160405180910390f35b341561017657600080fd5b61019560ff60043581169064ffffffffff602435169060443516610251565b005b34156101a257600080fd5b61008064ffffffffff60043516610844565b60026020526000908152604090205463ffffffff8082169164010000000081049091169064ffffffffff6801000000000000000082048116916d010000000000000000000000000090041684565b600460209081526000928352604080842090915290825290205460ff1681565b600360209081526000928352604080842090915290825290205460ff1681565b600054600160a060020a031681565b6000805481908190600160a060020a031663730ecf3433836040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156102ae57600080fd5b6102c65a03f115156102bf57600080fd5b50505060405180519350506bffffffffffffffffffffffff19831615156102e557600080fd5b60008660018111156102f357fe5b141561033f57505064ffffffffff831660008181526001602090815260408083206bffffffffffffffffffffffff1986168452600383528184209484529390915290205460ff16610381565b505064ffffffffff831660008181526002602090815260408083206bffffffffffffffffffffffff1986168452600483528184209484529390915290205460ff165b83600281111561038d57fe5b81600281111561039957fe5b14156103a457600080fd5b60008160028111156103b257fe5b146105a05760018160028111156103c557fe5b14156104a157815463ffffffff19811663ffffffff9182166000190190911617825560008054600160a060020a031690634f80cc549085906040516020015260405160e060020a63ffffffff84160281526bffffffffffffffffffffffff199091166004820152602401602060405180830381600087803b151561044857600080fd5b6102c65a03f1151561045957600080fd5b5050506040518051835463ffffffff90911664ffffffffff6801000000000000000080840482169290920316026cffffffffff000000000000000019909116178355506105a0565b60028160028111156104af57fe5b14156105a057815460001963ffffffff640100000000808404821692909201160267ffffffff000000001990911617825560008054600160a060020a031690634f80cc549085906040516020015260405160e060020a63ffffffff84160281526bffffffffffffffffffffffff199091166004820152602401602060405180830381600087803b151561054157600080fd5b6102c65a03f1151561055257600080fd5b5050506040518051835463ffffffff90911664ffffffffff6d0100000000000000000000000000808404821692909203160271ffffffffff0000000000000000000000000019909116178355505b60008660018111156105ae57fe5b1415610605576bffffffffffffffffffffffff198316600090815260036020908152604080832064ffffffffff891684529091529020805485919060ff191660018360028111156105fb57fe5b0217905550610652565b6bffffffffffffffffffffffff198316600090815260046020908152604080832064ffffffffff891684529091529020805485919060ff1916600183600281111561064c57fe5b02179055505b600184600281111561066057fe5b141561073c57815463ffffffff8082166001011663ffffffff1990911617825560008054600160a060020a031690634f80cc549085906040516020015260405160e060020a63ffffffff84160281526bffffffffffffffffffffffff199091166004820152602401602060405180830381600087803b15156106e157600080fd5b6102c65a03f115156106f257600080fd5b5050506040518051835464ffffffffff68010000000000000000808304821663ffffffff90941693909301169091026cffffffffff0000000000000000199091161783555061083c565b600284600281111561074a57fe5b141561083c578154600163ffffffff640100000000808404821692909201160267ffffffff000000001990911617825560008054600160a060020a031690634f80cc549085906040516020015260405160e060020a63ffffffff84160281526bffffffffffffffffffffffff199091166004820152602401602060405180830381600087803b15156107db57600080fd5b6102c65a03f115156107ec57600080fd5b5050506040518051835464ffffffffff6d0100000000000000000000000000808304821663ffffffff909416939093011690910271ffffffffff0000000000000000000000000019909116178355505b505050505050565b60016020526000908152604090205463ffffffff8082169164010000000081049091169064ffffffffff6801000000000000000082048116916d0100000000000000000000000000900416845600a165627a7a7230582043fc9798a2732b0493bdf0974ebf05482506a10a8fb0a49e7f4996dde64f3ace0029",
  "real_runtime_bytecode": "60606040526004361061005e5763ffffffff60e060020a60003504166330da4526811461006357806354e73580146100ba57806379f5ed381461010d5780637b1039991461013c578063ed12e15c1461016b578063f8d3ce5e14610197575b600080fd5b341561006e57600080fd5b61008064ffffffffff600435166101b4565b60405163ffffffff948516815292909316602083015264ffffffffff90811660408084019190915292166060820152608001905180910390f35b34156100c557600080fd5b6100e96bffffffffffffffffffffffff196004351664ffffffffff60243516610202565b604051808260028111156100f957fe5b60ff16815260200191505060405180910390f35b341561011857600080fd5b6100e96bffffffffffffffffffffffff196004351664ffffffffff60243516610222565b341561014757600080fd5b61014f610242565b604051600160a060020a03909116815260200160405180910390f35b341561017657600080fd5b61019560ff60043581169064ffffffffff602435169060443516610251565b005b34156101a257600080fd5b61008064ffffffffff60043516610844565b60026020526000908152604090205463ffffffff8082169164010000000081049091169064ffffffffff6801000000000000000082048116916d010000000000000000000000000090041684565b600460209081526000928352604080842090915290825290205460ff1681565b600360209081526000928352604080842090915290825290205460ff1681565b600054600160a060020a031681565b6000805481908190600160a060020a031663730ecf3433836040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156102ae57600080fd5b6102c65a03f115156102bf57600080fd5b50505060405180519350506bffffffffffffffffffffffff19831615156102e557600080fd5b60008660018111156102f357fe5b141561033f57505064ffffffffff831660008181526001602090815260408083206bffffffffffffffffffffffff1986168452600383528184209484529390915290205460ff16610381565b505064ffffffffff831660008181526002602090815260408083206bffffffffffffffffffffffff1986168452600483528184209484529390915290205460ff165b83600281111561038d57fe5b81600281111561039957fe5b14156103a457600080fd5b60008160028111156103b257fe5b146105a05760018160028111156103c557fe5b14156104a157815463ffffffff19811663ffffffff9182166000190190911617825560008054600160a060020a031690634f80cc549085906040516020015260405160e060020a63ffffffff84160281526bffffffffffffffffffffffff199091166004820152602401602060405180830381600087803b151561044857600080fd5b6102c65a03f1151561045957600080fd5b5050506040518051835463ffffffff90911664ffffffffff6801000000000000000080840482169290920316026cffffffffff000000000000000019909116178355506105a0565b60028160028111156104af57fe5b14156105a057815460001963ffffffff640100000000808404821692909201160267ffffffff000000001990911617825560008054600160a060020a031690634f80cc549085906040516020015260405160e060020a63ffffffff84160281526bffffffffffffffffffffffff199091166004820152602401602060405180830381600087803b151561054157600080fd5b6102c65a03f1151561055257600080fd5b5050506040518051835463ffffffff90911664ffffffffff6d0100000000000000000000000000808404821692909203160271ffffffffff0000000000000000000000000019909116178355505b60008660018111156105ae57fe5b1415610605576bffffffffffffffffffffffff198316600090815260036020908152604080832064ffffffffff891684529091529020805485919060ff191660018360028111156105fb57fe5b0217905550610652565b6bffffffffffffffffffffffff198316600090815260046020908152604080832064ffffffffff891684529091529020805485919060ff1916600183600281111561064c57fe5b02179055505b600184600281111561066057fe5b141561073c57815463ffffffff8082166001011663ffffffff1990911617825560008054600160a060020a031690634f80cc549085906040516020015260405160e060020a63ffffffff84160281526bffffffffffffffffffffffff199091166004820152602401602060405180830381600087803b15156106e157600080fd5b6102c65a03f115156106f257600080fd5b5050506040518051835464ffffffffff68010000000000000000808304821663ffffffff90941693909301169091026cffffffffff0000000000000000199091161783555061083c565b600284600281111561074a57fe5b141561083c578154600163ffffffff640100000000808404821692909201160267ffffffff000000001990911617825560008054600160a060020a031690634f80cc549085906040516020015260405160e060020a63ffffffff84160281526bffffffffffffffffffffffff199091166004820152602401602060405180830381600087803b15156107db57600080fd5b6102c65a03f115156107ec57600080fd5b5050506040518051835464ffffffffff6d0100000000000000000000000000808304821663ffffffff909416939093011690910271ffffffffff0000000000000000000000000019909116178355505b505050505050565b60016020526000908152604090205463ffffffff8082169164010000000081049091169064ffffffffff6801000000000000000082048116916d0100000000000000000000000000900416845600a165627a7a7230582043fc9798a2732b0493bdf0974ebf05482506a10a8fb0a49e7f4996dde64f3ace0029",
  "swarm_hash": "43fc9798a2732b0493bdf0974ebf05482506a10a8fb0a49e7f4996dde64f3ace",
  "gas_estimates": {
    "creation": {
      "codeDepositCost": "447600",
      "executionCost": "20910",
      "totalCost": "468510"
    },
    "external": {
      "commentScores(uint40)": "685",
      "commentVotes(bytes20,uint40)": "671",
      "postScores(uint40)": "795",
      "postVotes(bytes20,uint40)": "693",
      "registry()": "655",
      "vote(uint8,uint40,uint8)": "infinite"
    }
  },
  "function_hashes": {
    "commentScores(uint40)": "30da4526",
    "commentVotes(bytes20,uint40)": "54e73580",
    "postScores(uint40)": "f8d3ce5e",
    "postVotes(bytes20,uint40)": "79f5ed38",
    "registry()": "7b103999",
    "vote(uint8,uint40,uint8)": "ed12e15c"
  },
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint40"
        }
      ],
      "name": "commentScores",
      "outputs": [
        {
          "name": "numUp",
          "type": "uint32"
        },
        {
          "name": "numDown",
          "type": "uint32"
        },
        {
          "name": "scoreUp",
          "type": "uint40"
        },
        {
          "name": "scoreDown",
          "type": "uint40"
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
          "type": "bytes20"
        },
        {
          "name": "",
          "type": "uint40"
        }
      ],
      "name": "commentVotes",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
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
          "type": "bytes20"
        },
        {
          "name": "",
          "type": "uint40"
        }
      ],
      "name": "postVotes",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "registry",
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
      "constant": false,
      "inputs": [
        {
          "name": "_type",
          "type": "uint8"
        },
        {
          "name": "_id",
          "type": "uint40"
        },
        {
          "name": "_vote",
          "type": "uint8"
        }
      ],
      "name": "vote",
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
          "type": "uint40"
        }
      ],
      "name": "postScores",
      "outputs": [
        {
          "name": "numUp",
          "type": "uint32"
        },
        {
          "name": "numDown",
          "type": "uint32"
        },
        {
          "name": "scoreUp",
          "type": "uint40"
        },
        {
          "name": "scoreDown",
          "type": "uint40"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_registry",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "id",
          "type": "uint40"
        }
      ],
      "name": "Voted",
      "type": "event"
    }
  ]
}
;
let ContentScore = new EmbarkJS.Contract(ContentScoreJSONConfig);

__embarkContext.execWhenReady(function() {

ContentScore.setProvider(web3.currentProvider);

});
export default ContentScore;

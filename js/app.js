//var web3 = new Web3();
var prov = Web3.givenProvider || window.ethereum || Web3.currentProvider;
var web3 = new Web3(Web3.givenProvider || window.ethereum || Web3.currentProvider || new Web3.providers.HttpProvider(
  'https://ropsten.infura.io/v3/52f65406da524386bbe3b2caedd067b2'
));//|| new Web3.providers.WebsocketProvider('ws://localhost:8546')
console.log(web3);
web3.eth.getAccounts(function(e,accounts){ web3.eth.defaultAccount=accounts[0]; });
web3.eth.getAccounts(console.log);

var smartContract = web3.eth.contract([
  {
    "constant": false,
    "inputs": [
      {
        "name": "newContributor",
        "type": "address"
      }
    ],
    "name": "addContributor",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
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
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      },
      {
        "name": "_extraData",
        "type": "bytes"
      }
    ],
    "name": "approveAndCall",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
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
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
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
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "burnFrom",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "buy",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "target",
        "type": "address"
      },
      {
        "name": "freeze",
        "type": "bool"
      }
    ],
    "name": "freezeAccount",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "sell",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newPortfolioValue",
        "type": "uint256"
      }
    ],
    "name": "setPortfolioValue",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
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
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
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
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "initialSupply",
        "type": "uint256"
      },
      {
        "name": "tokenName",
        "type": "string"
      },
      {
        "name": "tokenSymbol",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "target",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "frozen",
        "type": "bool"
      }
    ],
    "name": "FrozenFunds",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Burn",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
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
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
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
    "name": "contributors",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
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
        "type": "address"
      }
    ],
    "name": "frozenAccount",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
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
    "constant": true,
    "inputs": [],
    "name": "portfolioValue",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]);

var contractAddress= smartContract.at('0xad458ad9bc0e6527cefc9ad934461020b489fa83');
//web3.eth.defaultAccount=web3.eth.accounts[0]
contractAddress.symbol(function(error, result){
  if(!error)
  {
    //$("#form").html(result[0]+' ('+result[1]+' years old)');
    $("#tokenSymbol").text(result);
    console.log(result);
  }
  else
  console.log(error);
});

contractAddress.totalSupply(function(error, result){
  if(!error)
  {
    //$("#form").html(result[0]+' ('+result[1]+' years old)');
    $("#totalSupply").text(result.c[0]);
    console.log(result);
  }
  else
  console.log(error);
});

contractAddress.portfolioValue(function(error, result){
  if(!error)
  {
    $("#portfolioValue").text(result.c[0]);
    console.log(result);
  }
  else
  console.log(error);
});

contractAddress.owner(function(error, result){
  if(!error)
  {
    //$("#form").html(result[0]+' ('+result[1]+' years old)');
    console.log(result);
  }
  else
  console.log(error);
});

contractAddress.name(function(error, result){
  if(!error)
  {
    //$("#form").html(result[0]+' ('+result[1]+' years old)');
    $("#tokenName").text(result);
    console.log(result);
  }
  else
  console.log(error);
});

contractAddress.balanceOf(web3.eth.accounts[0], function(error, result){
  if(!error)
  {
    //$("#form").html(result[0]+' ('+result[1]+' years old)');
    $("#balanceOf").text(result + " " + $("#tokenSymbol").text());
    console.log(result);
  }
  else
  console.log(error);
});

$("#userAdress").text(web3.eth.accounts[0]);

function updatePortfolioValue(newPortfolioValue) {
  contractAddress.setPortfolioValue(web3.toWei(newPortfolioValue, 'ether'),function(error, result){
    if(!error)
    {
      $("#portfolioValue").text(result.c[0]);
      console.log(result);
    }
    else
    console.log(error);
  });
}
/**
contractAddress.setPortfolioValue('1',function(error, result){
  if(!error)
  {
    //$("#form").html(result[0]+' ('+result[1]+' years old)');
    console.log(result);
  }
  else
  console.log(error);
});
var inWei = web3.toWei('0.1', 'ether');
contractAddress.buy({from: web3.eth.accounts[0], gas: 3000000, value: inWei},function(error, result){
  if(!error)
  {
    //$("#form").html(result[0]+' ('+result[1]+' years old)');
    console.log(result);
  }
  else
  console.log(error);
});
**/
//console.log(web3.eth.getAccounts());//.then(console.log);
//alert(web3.eth.getBalance(console.log));
console.log('Hallo Welt');

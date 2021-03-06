//var web3 = new Web3();
var prov = Web3.givenProvider || window.ethereum || Web3.currentProvider;

var app = new Vue({
  el: '#content-wrapper',
  data: {
    waitForTransaction: false,
    accountAdresses: [],
    balanceOf: "",
    tokenSymbol: "",
    tokenName: "",
    owner: "",
    transferToAddress: "",
    sendBackAddress: "",
    portfolioValue: "",
    totalSupply: "",
    lastTransaction: "",
    userAdress: "",
    sellVal: 0.1,
    buyVal: 0.1,
    ethBalance: 0
  },
  computed: {
    // a computed getter
    lastTransactionLink: function () {
      // `this` points to the vm instance
      return "https://ropsten.etherscan.io/tx/".concat(this.lastTransaction);
    }
  },
  methods: {
    changeDefaultAddress: function(address) {
      web3.eth.defaultAccount=address;
      this.userAdress = address;
    }
  }
});

var web3 = new Web3(prov || new Web3.providers.HttpProvider(
  'https://ropsten.infura.io/v3/52f65406da524386bbe3b2caedd067b2'
));//|| new Web3.providers.WebsocketProvider('ws://localhost:8546')

window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        //window.web3 = new Web3(ethereum);
        //ethereum.autoRefreshOnNetworkChange = false;
        try {
            // Request account access if needed
            await ethereum.enable();
            updateFrontend();
        } catch (error) {
          alert("Please grant access!" + error);
          window.location.reload();
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        //window.web3 = new Web3(web3.currentProvider);

    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

web3.eth.getAccounts(function(e,accounts){
  web3.eth.defaultAccount=accounts[0];
  app.accountAdresses = accounts;
});
web3.eth.getAccounts(console.log);

var smartContract = web3.eth.contract(contractAbi);

var contractAddress = smartContract.at('0x2cBB2588C82D577Cea0E2c4Cf57045c7577DbF50');
//web3.eth.defaultAccount=web3.eth.accounts[0]

updateFrontend();

function changeDefaultAddress(address) {
  web3.eth.defaultAccount = address;
}

function freezeAccount(address) {
  contractAddress.freezeAccount(address, true, function(error, result){
    if(!error)
    {
      //$('#waitForTransaction').text('true');
      app.waitForTransaction = true;
      app.lastTransaction = result;
      console.log(result);
    }
    else
    console.log(error);
  });
}

function addContributor(address) {
  contractAddress.addContributor(address, function(error, result){
    if(!error)
    {
      //$('#waitForTransaction').text('true');
      app.waitForTransaction = true;
      app.lastTransaction = result;
      console.log(result);
    }
    else
    console.log(error);
  });
}
function removeContributor(address) {
  contractAddress.removeContributor(address, function(error, result){
    if(!error)
    {
      //$('#waitForTransaction').text('true');
      app.waitForTransaction = true;
      app.lastTransaction = result;
      console.log(result);
    }
    else
    console.log(error);
  });
}

function unFreezeAccount(address) {
  contractAddress.freezeAccount(address, false, function(error, result){
    if(!error)
    {
      //$('#waitForTransaction').text('true');
      app.waitForTransaction = true;
      app.lastTransaction = result;
      console.log(result);
    }
    else
    console.log(error);
  });
}

function updatePortfolioValue(newPortfolioValue) {
  contractAddress.setPortfolioValue(web3.toWei(newPortfolioValue),function(error, result){
    if(!error)
    {
      //$('#waitForTransaction').text('true');
      app.waitForTransaction = true;
      //$("#portfolioValue").text(newPortfolioValue);
      app.lastTransaction = result;
      //$("#portValTransactionBlock").text(" Transaction Commited: " + result);
      //$("#portVal").val(newPortfolioValue);
      console.log(result);
    }
    else
    console.log(error);
  });
}

function buyAlpaTokens() {
  var inWei = web3.toWei($("#buyVal").val(), 'ether');
  contractAddress.buy({from: web3.eth.accounts[0], gas: 3000000, value: inWei},function(error, result){
    if(!error)
    {
      //$('#waitForTransaction').text('true');
      app.waitForTransaction = true;
      app.lastTransaction = result;
      //$("#form").html(result[0]+' ('+result[1]+' years old)');
      console.log(result);
    }
    else
    console.log(error);
  });
}

function sellAlpaTokens() {
  var inWei = web3.toWei($("#sellVal").val(), 'ether');
  contractAddress.sell(inWei,function(error, result){
    if(!error)
    {
      //$('#waitForTransaction').text('true');
      app.waitForTransaction = true;
      app.lastTransaction = result;
      //$("#form").html(result[0]+' ('+result[1]+' years old)');
      console.log(result);
    }
    else
    console.log(error);
  });
}

function setTransferToAddress(address) {
  contractAddress.setTransferToAddress(address,function(error, result){
    if(!error)
    {
      //$('#waitForTransaction').text('true');
      app.waitForTransaction = true;
      app.lastTransaction = result;
      //$("#form").html(result[0]+' ('+result[1]+' years old)');
      console.log(result);
    }
    else
    console.log(error);
  });
}

function setSendBackAddress(address) {
  contractAddress.setSendBackAddress(address,function(error, result){
    if(!error)
    {
      //$('#waitForTransaction').text('true');
      app.waitForTransaction = true;
      app.lastTransaction = result;
      //$("#form").html(result[0]+' ('+result[1]+' years old)');
      console.log(result);
    }
    else
    console.log(error);
  });
}

function approveSellingAlpaTokens() {
  var inWei = web3.toWei($("#sellVal").val(), 'ether');
  contractAddress.approve(web3.eth.defaultAccount,inWei,function(error, result){
    if(!error)
    {
      //$('#waitForTransaction').text('true');
      app.waitForTransaction = true;
      app.lastTransaction = result;
      //$("#form").html(result[0]+' ('+result[1]+' years old)');
      console.log(result);
    }
    else
    console.log(error);
  });
}

web3.eth.filter('latest', function(error, result){
  if (!error) {
    //$('#waitForTransaction').text('false');
    app.waitForTransaction = false;
    updateFrontend();
  } else {
    console.error(error)
  }
});

function updateFrontend() {
  contractAddress.symbol(function(error, result){
    if(!error)
    {
      //$("#form").html(result[0]+' ('+result[1]+' years old)');
      app.tokenSymbol = result;
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
      app.totalSupply = web3.fromWei(result.toString());
      $("#totalSupply").text(web3.fromWei(result.toString()));
      console.log(result);
    }
    else
    console.log(error);
  });

  contractAddress.portfolioValue(function(error, result){
    if(!error)
    {
      app.portfolioValue = web3.fromWei(result.toString());
      $("#portfolioValue").text(web3.fromWei(result.toString()));
      $("#portVal").val(web3.fromWei(result.toString()));
      console.log(result);
    }
    else
    console.log(error);
  });

  contractAddress.transferToAddress(function(error, result){
    if(!error)
    {
      app.transferToAddress = result.toString();
      $("#transferToAddress").text(result.toString());
      console.log(result);
    }
    else
    console.log(error);
  });

  contractAddress.sendBackAddress(function(error, result){
    if(!error)
    {
      app.sendBackAddress = result.toString();
      $("#sendBackAddress").text(result.toString());
      console.log(result);
    }
    else
    console.log(error);
  });

  contractAddress.owner(function(error, result){
    if(!error)
    {
      app.owner = result.toString();
      //$("#form").html(result[0]+' ('+result[1]+' years old)');
      console.log(result);
    }
    else
    console.log(error);
  });

  contractAddress.name(function(error, result){
    if(!error)
    {
      app.tokenName = result;
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
      app.balanceOf = web3.fromWei(result);
      //$("#form").html(result[0]+' ('+result[1]+' years old)');
      $("#balanceOf").text(web3.fromWei(result) + " " + $("#tokenSymbol").text());
      console.log(result);
    }
    else
    console.log(error);
  });

  app.userAdress = web3.eth.accounts[0];
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

// if web3 is undefined then it will use the localhost provider in the else statement.
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// after running the testrpc command in the terminal; it provided 10 accounts
// this selects the first account in the 10 accounts given by the testrpc command.
web3.eth.defaultAccount = web3.eth.accounts[0];

// this variable holds the "web3.eth.contract()" method to initialze the contract on an address.
// it accepts one parameter which is the Application Binary Interface (ABI).
// the ABI allows you to call functions and retrieve data from your smart contact (interact with it).
var nodeGangContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getInstructor",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bytes16"
			},
			{
				"name": "",
				"type": "bytes16"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getInstructors",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
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
				"type": "uint256"
			}
		],
		"name": "instructorAccts",
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
		"name": "countInstructors",
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
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_age",
				"type": "uint256"
			},
			{
				"name": "_fName",
				"type": "bytes16"
			},
			{
				"name": "_lName",
				"type": "bytes16"
			}
		],
		"name": "setInstructor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "fName",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "lName",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "age",
				"type": "uint256"
			}
		],
		"name": "instructorInfo",
		"type": "event"
	}
])

// this variable holds the address of the contract on the blockchain (testrpc).
//var nodeGang = nodeGangContract.at("0x6fd4023fa92dc9dd25d76db3655b3285621e08fa");
var nodeGang = nodeGangContract.at("0x254dffcd3277c0b1660f6d42efbb754edababc2b");
console.log(nodeGang);

// this variable's value holds a smart contract event
var instructorEvent = nodeGang.instructorInfo({}, 'latest');
console.log(instructorEvent);

instructorEvent.watch(function (err, result) {
    if (!err) {
		if (result.blockHash != $("#insTrans").html())
		$("#loader").hide();
		$("#insTrans").html('Block hash: ' + result.blockHash);
        $("#Airdrone").html(web3.toAscii(result.args.fName) + ' ' + web3.toAscii(result.args.lName) + ' (' + result.args.age + ' years old)');
    } else {
        $("#loader").hide();
        console.log(err);
    }
});

nodeGang.countInstructors((err, res) => {
	if (res)
	$("#countIns").html(res.c + ' Number ');
});

//this jQuery code triggers "on click" to call the setMaster function to take the values from the input.
$(document).on('click', '#button', function () {
    $('#loader').show();
    nodeGang.setInstructor(web3.eth.defaultAccount, $("#age").val(), $("#fName").val(), $("#lName").val(), (err, res) => {
		if (err) {
			$("#loader").hide();
			console.log(err);
		}
	});
    $("#fName").val(''), $("#lName").val(''), $("#age").val('');
    console.log('I took the inputs.');
});

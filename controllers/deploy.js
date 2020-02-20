const Web3 = require('web3');
const solc = require('solc');
const path = require('path');
const fs = require('fs');
const jsonFile = require('jsonfile');
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));    
const path1 = path.join(__dirname, '../contractAddress/feedback.json');
const location = path.join(__dirname, '../contractAddress/userAddress.json');
const userAddress = jsonFile.readFileSync(location);

    web3.eth.getAccounts().then((res) => {
    const ElectionPath = path.resolve(__dirname,"../allContracts/contracts","feedback.sol");
    const input = fs.readFileSync(ElectionPath,'UTF-8');
    const output = solc.compile(input.toString(), 1);
    const bytecode = output.contracts[':feedback'].bytecode;
    const abi1 = JSON.parse(output.contracts[':feedback'].interface);
    const gasEstimate = web3.eth.estimateGas({ data: '0x' + bytecode });
    const contract = new web3.eth.Contract(abi1,res[1]);

    contract.deploy({
        data:'0x'+bytecode,
        arguments:["0xe95d54702846fbfa9d23710f70eeb4693aca25f1"],
    })
    .send({
        from: res[1],
        gasPrice: '300000',
        gas:1500000,
        value:200
    })
    .then(function(newContractInstance){
        console.log("contract address:= >>>",newContractInstance.options.address) // instance with the new contract address
       let contractAddress1 = {
            'address': newContractInstance.options.address,
            'abi': abi1
        };
        fs.writeFileSync(path1, JSON.stringify(contractAddress1, null, 4), { spaces: 2 });
        userAddress["Harshal@gmail.com"] = {
            'address': res[1],
            'name': "Harshal Patil"
        };
        fs.writeFileSync(location, JSON.stringify(userAddress, null, 4), { spaces: 2 });
    });
}).catch((err) => {
    console.log("error-->",err);
});
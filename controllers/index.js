const Web3 = require('web3');
const solc = require('solc');
const path = require('path');
const fs = require('fs');
const jsonFile = require('jsonfile');
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const path1 = path.join(__dirname, '../contractAddress/Election.json');
const path1 = path.join(__dirname, '../contractAddress/userAddressAndContract.json');
const contractAddress = jsonFile.readFileSync(path1);
const address = contractAddress.address;
const abi = contractAddress.abi;
const instance = new web3.eth.Contract(abi,address);
let coinbase;
web3.eth.getAccounts((err,res)=>{
    if(res){
        coinbase = res[1]
    }else{
        console.log("Harshal Patil");
}
});

const register = (data) => new Promise((resolve, reject) => {
    web3.eth.personal.newAccount(data.password).then((result) => {
        editeditems["Address"] = address; 
        let userAddressAndEmail = {
            'address': result,
            'abi': data.email
        };
        fs.appendFileSync(path1, JSON.stringify(userAddressAndEmail, null, 4), { spaces: 2 });
        resolve()
        web3.eth.sendTransaction({from:coinbase, to:result, value: 10000000000000000}).then((receipt) => {
            instance.methods.addUser(result,data.name,data.email).send({from:coinbase},function(err, res){
                if(res){
                    console.log(res);
                    resolve();
                }
                else{
                    reject();
                }
            });
        }).catch((err) => {
            console.log(err)
            reject();
        });
    }).catch((err) => {
        reject();
    });
});

const feedback = (data) => new Promise((resolve, reject) => {
        instance.methods.addFeedback(data.f1,data.f2,data.f3).send({from:coinbase},function(err, res){
            if(res){
                console.log(res);
                resolve();
            }
            else{
                reject();
            }
        });
});





const getData = () => new Promise((resolve, reject) => {
    web3.eth.getAccounts((err,res)=>{
        if(res){
           resolve(res);
        }else{
            reject(err);
            console.log("Harshal Patil");
            
        }
    });    
});
const compiler = () => new Promise((resolve, reject)=>{
    accounts = web3.eth.getAccounts().then((res) => {
        // const path1 = path.join(__dirname, '../../contractAddress/Election.json');
        const ElectionPath = path.resolve(__dirname,"../allContracts/contracts","Election.sol");
        const input = fs.readFileSync(ElectionPath,'UTF-8');
        const output = solc.compile(input.toString(), 1);
        const bytecode = output.contracts[':feedback'].bytecode;
        const abi1 = JSON.parse(output.contracts[':feedback'].interface);
        console.log(abi1);
        console.log(abi1.toString());
        const gasEstimate = web3.eth.estimateGas({ data: '0x' + bytecode });
        const contract = new web3.eth.Contract(abi1,res[0]);
        // const instance = contract.deploy({data:'0x'+bytecode});

        contract.deploy({
            data:'0x'+bytecode
        })
        .send({
            from: res[0],
            gas: 1500000,
            gasPrice: '300000'
        })
        .then(function(newContractInstance){
            console.log("newContractInstance",newContractInstance.options.address) // instance with the new contract address
           let contractAddress1 = {
                'address': newContractInstance.options.address,
                'abi': abi1
            };
            fs.writeFileSync(path1, JSON.stringify(contractAddress1, null, 4), { spaces: 2 });
            resolve()
        });
        // console.log(instance);;
        // console.log(instance.methods);
    }).catch((err) => {
        console.log("error-->",err);
        reject();
    });
});

const depoyContract = () => new Promise((resolve, reject)=>{
        let voteCount1;
        let voteCount2;
        let accounts;
        console.log("in",instance);
        web3.eth.getAccounts((err,res)=>{
            if(res){
            accounts = [...res];
            }else{
                reject();
            }
        });
        instance.methods.candidates(1).call((err,result) => {
            if(result){
                voteCount1 =result.voteCount;
                candidate1 =result.name;
                instance.methods.candidates(2).call((err,result) => {
                    if(result){
                        voteCount2=result.voteCount;
                        candidate2=result.name;
                        resolve({voteCount1,candidate1,voteCount2,candidate2,accounts})
                    }else{
                        console.log("error",err);
                    }
                });
            }else{
                console.log("error",err);
            }
        });
});

const vote = (data) => new Promise((resolve, reject) => {
    instance.methods.isVoted(data.account).call(function(err,result){
        console.log("result--2",result);
        if(result==0){
          console.log("selected",data.account);
          instance.methods.vote(data.id).send({from:data.account},function(err,res){
            if(res){
            console.log(res);
            resolve(res)
            }
            else{
            console.log(err);
            reject({message:"something went wrong !!!"});
            }
         });      
        }
        else{
          console.log("voter alredy voted !!!");
          reject({message:"voter alredy voted !!!"});
        }  
    });
})

module.exports = {
    getData,
    compiler,
    depoyContract,
    vote,
    register
}
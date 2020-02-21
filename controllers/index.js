const Web3 = require('web3');
const solc = require('solc');
const path = require('path');
const fs = require('fs');
const jsonFile = require('jsonfile');
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const path1 = path.join(__dirname, '../contractAddress/feedback.json');
const location = path.join(__dirname, '../contractAddress/userAddress.json');
const userAddress = jsonFile.readFileSync(location);
const contractAddress = jsonFile.readFileSync(path1);
const address = contractAddress.contractAddress;
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
		userAddress[data.email] = {
			'address': result,
			'name': data.name
		};
		fs.writeFileSync(location, JSON.stringify(userAddress, null, 4), { spaces: 2 });
        web3.eth.sendTransaction({from:coinbase, to:result, value: 100000000000000000000}).then((receipt) => {
            instance.methods.addUser(result,data.name,data.email).send({from:coinbase},function(err, res){
                if(res){
                    console.log(res);
                    resolve(res);
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

const login = (data) => new Promise ((resolve, reject) => {
        let address = userAddress[data.username].address;
        web3.eth.personal.unlockAccount(address,data.password,9999, function(err, res) {
            if(err){
                reject();
            }
            else{
                resolve(data.username);
            }
        });
});

const feedback = (data) => new Promise((resolve, reject) => {
        let address = userAddress[data.username].address;
        instance.methods.addFeedback(data.f1,data.f2,data.f3).send({from:address},function(err, res){
            if(res){
                console.log(res);
                resolve(res);
            }
            else{
                reject(err);
            }
        });
});

const avgFeedback = () => new Promise((resolve, reject) => {
    instance.methods.getAverageFeedback().call({from:coinbase},function(err, res){
        if(res){
            resolve(res);
        }
        else{
            reject(err);
        }
    });
});

const admin = () => new Promise((resolve, reject) => {
    instance.methods.transferMoneyToInstructor().send({from:coinbase,gas:230000},function(err, res){
        if(res){
            resolve(res);
        }
        else{
            reject(err);
        }
    });


    // instance.methods.getAverageFeedback().call({from:coinbase},function(err, res){
    //     if(res){
    //         let value;
    //         if(res === "1")
    //             value = 20;
    //         else if(res === "2")
    //             value = 40;
    //         else if(res === "3")
    //             value = 60;                
    //         else if(res === "4")
    //             value = 80;                
    //         else if(res === "5")
    //             value = 100;                
            
    //     web3.eth.sendTransaction({from:coinbase, to:"0xe95d54702846fbfa9d23710f70eeb4693aca25f1", value:value}).then((receipt) => {
    //             resolve(receipt);
    //         }).catch((err) => {
    //             reject(err);
    //         });
    //     }
    //     else{
    //         reject(err);
    //     }
    // });
});

module.exports = {
    register,
    login,
    feedback,
    avgFeedback,
    admin
}
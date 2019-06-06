const assert=require('assert');
// const ganache=require('ganache-cli');
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = "suspect eye traffic inmate reward during admit joy amateur replace demise infant";
const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/b6a3065cc3f1487ea7f1535fe0f0d2d0");
const Web3=require('./web3');
const {interface,bytecode}=require('./compile');
const  web3=new Web3(provider);


let accounts;
let balance;
let ctract;
const deploy = async () => {


    try {
         accounts=await web3.eth.getAccounts().catch(error=>{
             console.log(error)
         });
        console.log(accounts[0])
         // balance=await web3.eth.getBalance('0x3cB1e4c4AF86041C0F43DF1f2aF49561f6d600f9').catch(error=>{
         //     console.log("blance---",balance)
         // });
    }catch (e){
        assert.ok()
    }

    console.log(balance);
    // const translation = await web3.eth.sendTransaction({from: accounts[0], to: accounts[1], value: 3000000})
    // console.log(translation);
    //
    // console.log(await  web3.eth.getBalance(accounts[0]));
    // console.log(await web3.eth.getBalance(accounts[1]));

    // contract=await new web3.eth.Contract(JSON.parse(interface)).deploy({
    //     data:bytecode
    // }).send({
    //     from:accounts[0],
    //     gas:'3000000'
    //     }
    // )
    // console.log("result::",contract.options.address)
    // console.log(interface)


    let num=await web3.eth.estimateGas({data: '0x'+bytecode}).catch(error=>{
        console.log(error)
    });
    console.log("num---",num)


    ctract=await new web3.eth.Contract(JSON.parse(interface)).deploy(
        {
            data: '0x'+bytecode
        }
    ).send({
        from: accounts[0],
        gas:'600000'
    }).catch(error=>{
        console.log("send---",error)
    })



    console.log("data---",ctract.options.data);
    console.log("address---",ctract.options.address);

    console.log(await ctract.methods.getPlayers().call().catch(error=>{
        console.log(error)
    }))

};
deploy();
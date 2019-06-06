const  path=require('path');
const fs=require('fs');
const solc=require('solc');

//读取智能合约
const  inboxPath=path.resolve(__dirname,'contracts','Lottery.sol');
// console.log(inboxPath);
let source=fs.readFileSync(inboxPath,'utf-8');

let result=solc.compile(source,1)
console.log(result)

module.exports=result.contracts[':Lottery'];
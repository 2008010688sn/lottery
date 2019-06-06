pragma solidity ^0.4.17;

contract Lottery{

    address public manager;

    address[] public players;

    uint public touzhuValue;

    address  public  winner;

    //constroctor init manager's address
//    function Lottery() public{
//        manager=msg.sender;
//        touzhuValue=10000;
//    }

    constructor() public{
        manager=msg.sender;
        touzhuValue=10000;
    }

    //touzhu
    function enter() public payable{
        require(msg.value==touzhuValue);
        players.push(msg.sender);
    }

    function getManager() public view returns(address){
        return manager;
    }
    //chanshengsuijishu
    function random() public view returns(uint){
//        return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp/now,players)));
        return uint(keccak256(block.difficulty,now,players));
    }


    //kaijiang
    function pickWinner() public payable onlyManagerCall{
        uint index=random()%players.length;
        winner=players[index];
        winner.transfer(address(this).balance);
        players = new address[](0);

    }

    //get winner‘s info
    function getWinner() public view returns(address){
        return winner;
    }

    //tuikuan
    function refound() public onlyManagerCall{
        for(uint i=0;i<players.length;i++){
            players[i].transfer(touzhuValue);
        }
    }

    //get players's count
    function getPlayersCount() public view returns(uint){
        return players.length;
    }

    //get total money
    function getBlance() public view returns(uint){
        return address(this).balance;
    }

    //get all players
    function getPlayers() public view returns(address[]){
        return players;
    }


    modifier onlyManagerCall(){
        require(msg.sender==manager);
        _;
    }

}

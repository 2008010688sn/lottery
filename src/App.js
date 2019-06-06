import React, { Component } from 'react';
import { Message,Container, Card, Icon, Image,Button ,Statistic,Label} from 'semantic-ui-react'
import web3 from './web3sn';
import  lottery from './lottery';

// import { Button } from "react-bootstrap";

class App extends Component{
    state = {
        manager: "",
        players: [],
        balance: "",
        value: "",
        message: "",
        loading:false,
        showButton: 'none'
    };

    async componentDidMount() {
        //管理员地址
        const manager = await lottery.methods.getManager().call();
        //玩家地址集合
        const players = await lottery.methods.getPlayers().call();
        // const balance = await web3.eth.getBalance(lottery.options.address);
        const balance = await lottery.methods.getBlance().call()
        this.setState({
            manager:manager,
            players:players,
            balance:web3.utils.fromWei(balance,'ether') });
        console.log('manager==',manager+'--players---',players+'---balance---',balance)
        console.log(web3)

        const addres=await  web3.eth.getAccounts();
        if (addres[0]===manager){
            //管理员
            this.setState({showButton:'inline'})
        }else {
            //非管理员
            this.setState({showButton:'none'})
        }
    }

    onEnter = async event => {
        event.preventDefault();
        this.setState({loading:true});
        const accounts = await web3.eth.getAccounts();
        console.log("acc-------",accounts)
        this.setState({ message: "交易进行中..." });
        this.state.value=10000;
        await lottery.methods.enter().send({
            from: accounts[0],
            value: this.state.value
        });

        this.setState({ message: "您已下注成功！" });
        this.setState({loading:false});
        //刷新页面
        window.location.reload(true)
    };

    onWinner = async () => {
        this.setState({loading:true});
        const accounts = await web3.eth.getAccounts();
        this.setState({ message: "交易进行中..." });
        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });
        this.setState({loading:false});
        this.setState({ message: "中奖人已选出！" });
        //刷新页面
        window.location.reload(true)
    };



    render() {
        console.log("web3----",web3.version)
        return (
            <div className="App">
                <Container>
                    <Message info>
                        <Message.Header>Lottery区块链彩票</Message.Header>
                        <p>快来投注</p>
                    </Message>

                    <Card.Group>
                    <Card>
                        <Image src='./images/logo.png' wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>管理员地址</Card.Header>
                            <Label size={'tiny'}>
                                {this.state.manager}
                            </Label>
                            <Card.Description>
                                每周三早上九点开奖
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button>
                                <Icon name='user' />
                                {this.state.players.length} 人数
                            </Button>
                        </Card.Content>
                        <Card.Content extra>
                            <Statistic color='red'>
                                <Statistic.Value>{this.state.balance} ether</Statistic.Value>
                                <Statistic.Label>奖池</Statistic.Label>
                            </Statistic>
                        </Card.Content>

                        <Button animated='fade' onClick={this.onEnter} loading={this.state.loading} disabled={this.state.loading}>
                            <Button.Content visible>购买实现财务自由</Button.Content>
                            <Button.Content hidden>购买放飞自我</Button.Content>
                        </Button>

                        <Button color='orange' style={{display:this.state.showButton}} loading={this.state.loading} onClick={this.onWinner}>开奖</Button>
                        <Button color='red' style={{display:this.state.showButton}} loading={this.state.loading} >退钱</Button>

                    </Card>
                 </Card.Group>
                </Container>
            </div>


        );
    }
}

export default App;

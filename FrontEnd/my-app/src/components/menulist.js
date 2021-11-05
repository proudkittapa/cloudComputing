import axios from 'axios';
import React from 'react';

export default class MenuList extends React.Component{
    state = {
        menu : [],
    };

    compomentDidMount(){
        axios.get
        ("localhost:8080/pos/menu").then(res => {
            alert(res)
            console.log(res);
            this.setState({menu: res.data});
        });
    }
    render(){
        return(
            <ul>
                {this.state.menu.map(menuL => (<li key={menuL.data.id}>{menuL.data.id}</li>))}
            </ul>
        )
    }
}
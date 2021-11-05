import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom"; 
import Page2 from "./page2";
import HomePage from './pages/homePage';
import ShowMenu from './pages/showMenu';
import MenuInfo from './pages/menuInfo';
import ShowCart from './pages/showCart';
import UpdateMenu from './pages/updateMenu';
import CreateMenu from './pages/createMenu';
import ShowOrder from './pages/showOrder';
import ChangeBill from './pages/changeBill'
import ShowHistory from './pages/showHistory'
import OrderInfo from './pages/orderInfo'
import Report from './pages/report'
import ShowMoney from './pages/showMoney'
import React, { Component }  from 'react';
import TestAxios from './pages/testAxios';


function App() {
    return (
        // <TestAxios></TestAxios>
        <Router>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/homepage">
                    <HomePage />
                </Route>
                <Route exact path="/showMenu/:page">
                    <ShowMenu />
                </Route>
                <Route exact path="/menuInfo/:id" >
                    <MenuInfo />
                </Route>
                <Route exact path="/showCart">
                    <ShowCart />
                </Route>
                <Route exact path="/createMenu">
                    <CreateMenu />
                </Route>
                <Route exact path="/showOrder">
                    <ShowOrder />
                </Route>
                <Route exact path="/updateMenu/:id">
                    <UpdateMenu />
                </Route>
                <Route exact path="/changeBill">
                    <ChangeBill />
                </Route>
                <Route exact path="/showHistory">
                    <ShowHistory />
                </Route>
                <Route exact path="/orderInfo/:id">
                    <OrderInfo />
                </Route>
                <Route exact path="/showReport">
                    <Report />
                </Route>
                <Route exact path="/showMoney">
                    <ShowMoney />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;


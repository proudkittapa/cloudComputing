import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect
} from "react-router-dom"; 
import Book from './pages/book';
import Profile from './pages/profile';
import History from './pages/history';
import Home from './pages/home';
import Publish from './pages/publish';
import React, { Component }  from 'react';
import BookShelf from './pages/bookShelf';
import CreateProfile from './pages/createprofile';
import AllBook from './pages/allbooks';
import BookShelfList from './pages/bookShelfList';
import Payment from './pages/payment';
import AddMoney from './pages/addMoney';
import CreateShelf from './pages/createShelf';
import AccountSetting from './pages/setting';
import Subscription from './pages/subscription';
import Read from './pages/read';
import Author from './pages/author';
import Error from './pages/error'

function App() {
    return (
        // <TestAxios></TestAxios>
        <Router>
            <Switch>
                <Route exact path="/">
                    <CreateProfile />
                </Route>
                <Route exact path="/user/:userId/book/:bookId">
                    <Book />
                </Route>
                <Route exact path="/user/:userId">
                    <Profile />
                </Route>
                <Route exact path="/user/:userId/author/:authorId">
                    <Author />
                </Route>
                <Route exact path="/user/:userId/history">
                    <History />
                </Route>
                <Route exact path="/home/:userId">
                    {/* <Home /> */}
                    <AllBook/>
                </Route>
                <Route exact path="/user/:userId/bookShelf">
                    <BookShelf />
                </Route>
                <Route exact path="/user/:userId/publish">
                    <Publish />
                </Route>
                <Route exact path="/createProfile">
                    <CreateProfile />
                </Route>
                <Route exact path="/user/:userId/allBook">
                    <AllBook />
                </Route>
                <Route exact path="/user/:userId/error">
                    <Error />
                </Route>
                <Route exact path="/user/:userId/shelf/:shelfId">
                    <BookShelfList />
                </Route>
                <Route exact path="/user/:userId/payment">
                    <Payment />
                </Route>
                <Route exact path="/user/:userId/addMoney">
                    <AddMoney />
                </Route>
                <Route exact path="/user/:userId/createShelf">
                    <CreateShelf />
                </Route>
                <Route exact path="/user/:userId/setting">
                    <AccountSetting />
                </Route>
                <Route exact path="/user/:userId/subscription">
                    <Subscription />
                </Route>
                <Route exact path="/user/:userId/book/:bookId/read">
                    <Read />
                </Route>
                <Route component={Error}/>
            </Switch>
        </Router>
    )
}

export default App;


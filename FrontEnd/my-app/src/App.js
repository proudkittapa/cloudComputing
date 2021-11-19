import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom"; 
import Book from './pages/book';
import Profile from './pages/profile';
import History from './pages/history';
import Home from './pages/home';
import Publish from './pages/publish';
import React, { Component }  from 'react';
import BookShelf from './pages/bookShelf';
import CreateProfile from './pages/createprofile';


function App() {
    return (
        // <TestAxios></TestAxios>
        <Router>
            <Switch>
                <Route exact path="/user/:userId/book/:bookId">
                    <Book />
                </Route>
                <Route exact path="/user/:userId">
                    <Profile />
                </Route>
                <Route exact path="/user/:userId/history">
                    <History />
                </Route>
                <Route exact path="/home/:userId">
                    <Home />
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
            </Switch>
        </Router>
    )
}

export default App;


import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/bookdisplay.css'
import { Link } from "react-router-dom";
import { Redirect } from 'react-router'

function Book(){
    const [bookItem, setBookItems] = useState({})
    const [user, setUsers] = useState({})
    const [author, setAuthor] = useState({})
    const [addMessage, setAddMessage] = useState("Add Book")

    const [error, setError] = useState("");
    let {userId, bookId} = useParams()
    useEffect(()=>{
        console.log("before get book")
        getBook()
        getUser()
    }, []);
    const getBook = () =>{
        axios.get(`http://localhost:8080/bababook/book/${bookId}`)
        .then((response) => {
            console.log(response);
            const temp = response.data.data.book;
            setBookItems(temp)
            setAuthor(response.data.data.user)
            console.log(bookItem)
        })
    }
    const getUser = () =>{
        axios.get(`http://localhost:8080/bababook/user/${userId}`)
        .then((response) => {
            console.log(response);
            setUsers(response.data.data.user)
        })
    }

    const addBook = () =>{
        console.log("in add book")
        
        axios.post(`http://localhost:8080/bababook/user/${userId}/book/${bookId}`, {})
        .then((response) =>{
            console.log("response", response)
            if (response.status === 200){
                alert("book added to Your Shelf")
                setAddMessage("Added")
            }
        }).catch(function(error) {

            // if (error.response) {
            //     console.log("1", error.response.data);
            //     console.log("2", error.response.status);
            //     console.log("3", error.response.headers);
            //   }
            alert(error.response.data.error.message)
            setError(error.response.data.error.message)
        })
        
    }

    if (addMessage == "Added"){
        return <Redirect to= {{pathname:`/user/${userId}/bookShelf`}}/>
    }

    if (error == "Insufficient balance"){
        return <Redirect to= {{pathname:`/home/${userId}`}}/>
    }
    return(
        <body>
            <nav class="navbar border-bottom">
                <div class="container-fluid">
                    <a class="navbar-brand flex-fill" href="/"><i class="fas fa-book"></i> Bababook</a>

                    <div class="d-none d-lg-block flex-grow-1 flex-fill">
                        <form class="d-flex input-group">
                            <input class="form-control" type="search" placeholder="Search" aria-label="Search"></input>
                            <button class="btn btn-navbar" type="button" id="button-addon2"><i class="fas fa-search"></i></button>
                        </form>
                    </div>

                    <div class="d-flex flex-fill align-items-center">

                        <Link to={{pathname:`/user/${userId}/addMoney`}}><a href="/" class="px-3">{(Math.round([user.balance] * 100) / 100).toFixed(2)} THB</a></Link>

                        <a href="/">
                            <svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 64 64" style={{"enable-background":"new 0 0 64 64", width:"32px", height:"32px", xmlSpace:"preserve"}}>
                                <polyline class="st0" points="31.63,44.51 54.52,61.28 54.5,61 54.5,2.5 9.5,2.5 9.5,61 9.48,61.28 32.23,44.61 "/>
                                <polygon class="st1" points="32,11.55 35.89,19.42 44.58,20.69 38.29,26.82 39.77,35.47 32,31.39 24.23,35.47 25.71,26.82 
                                    19.42,20.69 28.11,19.42 "/>
                            </svg>
                        </a>
                        
                        <div class="flex-fill">
                            <div class="nav-item dropdown">
                                <button class="btn btn-navbar rounded-circle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-user"></i>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Link to={{pathname:`/user/${userId}`}}><a className="dropdown-item" href="#"><i className="fas fa-user"></i> Profile</a></Link>
                                    <a class="dropdown-item" href="#"><i class="fas fa-cog"></i> Account Settings</a>
                                    <hr class="dropdown-divider"></hr>
                                    <a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt"></i> Log Out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="d-flex">
                <div class="d-flex flex-column sidebar">
                    <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
                        <li class="nav-item">
                            <Link to={{pathname:`/home/${userId}`}}><a href="#" className="nav-link py-3">
                                <i className="fas fa-home"></i>
                            </a></Link>
                        </li>
                        <li className="nav-item">
                            <Link to={{pathname:`/user/${userId}/bookShelf`}}><a href="#" className="nav-link py-3">
                                <i className="fas fa-book"></i>
                            </a></Link>
                        </li>
                        <li className="nav-item">
                            <Link to={{pathname:`/user/${userId}/publish`}}><a href="#" className="nav-link py-3">
                                <i className="fas fa-book-open"></i>
                            </a></Link>
                        </li>
                        <li className="nav-item">
                            <Link to={{pathname:`/user/${userId}/history`}}><a href="#" className="nav-link py-3">
                                <i className="fas fa-clock"></i>
                            </a></Link>
                        </li>
                        <li class="nav-item">
                        <a href="#" class="nav-link py-3">
                            <i class="fas fa-users"></i>
                        </a>
                        </li>
                    </ul>
                </div>

                <div class="container content">
                    <div class="row row-book-container row-book-sm row-book-lg">
                        <div class="col-auto">
                            <img class="book-cover" src={bookItem.img}></img>
                        </div>

                        <div class="col-lg">
                            <div class="d-flex align-items-end">
                                <h1>{bookItem.name}</h1>
                                <h2 class="separator"> • </h2>
                                <h2>{author.full_name}</h2>
                            </div>

                            <hr/>

                            <div class="d-flex align-items-end py-1">                            
                                {Array.from({ length: Math.ceil([bookItem.rating])}, (_, i) => <h3 key={i}><i className="fas fa-star"></i></h3>)}
                                {Array.from({ length: 5-Math.ceil([bookItem.rating])}, (_, i) => <h3 key={i}><i className="far fa-star"></i></h3>)}
                                
                                <h3 class="px-3"></h3>
                            </div>
                            
                            <div class="pricing-add">
                                <div class="d-flex">
                                    <h3 class="py-1">Price: </h3>
                                    <h3 class="py-1 px-3">{(Math.round([bookItem.price] * 100) / 100).toFixed(2)} THB</h3>
                                </div>
                                <button class="btn btn-success" type="submit" onClick={addBook}><i class="fas fa-plus py-1"></i> {addMessage}</button>
                            </div>
                        </div>
                    </div>

                    
                    <h2>Description</h2>
                    <hr/>
                    <p class="book-desc"> {bookItem.description}
                    </p>
                </div>
            </div>

        </body>
        
    )
}

export default Book


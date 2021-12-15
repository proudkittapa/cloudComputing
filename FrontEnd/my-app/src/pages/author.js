import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/profile.css'
import '../css/main.css'
function Author(){
    const [user, setUsers] = useState({})
    const [author, setAuthor] = useState({})
    let {userId, authorId} = useParams()
    useEffect(()=>{
        console.log("before get user")
        getUser()
        getAuthor()
    }, []);
    const getUser = () =>{
        axios.get(`http://18.138.251.129:8080/bababook/user/${userId}`)
        .then((response) => {
            console.log(response);
            setUsers(response.data.data.user)
        })
    }
    const getAuthor = () =>{
        axios.get(`http://18.138.251.129:8080/bababook/user/${authorId}`)
        .then((response) => {
            console.log(response);
            setAuthor(response.data.data.user)
        })
    }

    
    return(
        <body>
            <nav class="navbar border-bottom">
                <div class="container-fluid">
                    <Link to={{pathname:`/home/${userId}`}}><a className="navbar-brand flex-fill" href="/"><i className="fas fa-book"></i> Bababook</a></Link>

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
                            viewBox="0 0 64 64" style={{'enable-background':'new 0 0 64 64', width:'32px', height:'32px', xmlSpace:'preserve'}}>
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
                                    <Link to={{pathname:`/user/${userId}/setting`}}><a class="dropdown-item" href="#"><i class="fas fa-cog"></i> Account Settings</a></Link>
                                    <Link to={{pathname:`/user/${userId}/subscription`}}><a class="dropdown-item" href="#"><i class="fas fa-star"></i> Subscription</a></Link>
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
                    <div class="container-fluid" >
                        <h3 style={{"padding-left":"5%"}} >Profile</h3>
                        <div class="row row-cols-1 row-cols-lg-2 g-5">
                            <div class="col-4" style={{padding:'0px 5% 0px 2%', 'min-width': '250px'}}>
                                <a>
                                    <div class="authorimg" >
                                        <div class="container" style={{padding:'20px', margin: '20px', 'text-align': 'center' }}>
                                            <div class="ratio ratio-1x1 rounded" >
                                                <img src={author.img}
                                                        class="img mx-auto d-block" style={{'min-width': '250px', 'min-height': '250px'}}/>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div class="col-8">
                                <div class="container" style={{padding:'20px', margin: '20px', 'text-align': 'left'}}>
                                    <div class="row g-5">
                                        <div class="col">
                                            <div class="d-flex align-items-baseline">
                                                <h1>{author.full_name}</h1>
                                                <h2 class="flex-fill">@{author.username}</h2>
                                                </div>

                                        </div>
                                    </div>
                                    {/* <div class="row g-5">
                                        <div class="col">
                                            <div class="container" padding="50px">
                                                <Link to={{pathname:`/user/${userId}/setting`}}><button class="btn-pro btn-pro1" href="#" type="submit"><i class="fas fa-cog"/> Edit Account Settings</button></Link>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                            <hr width="60%"></hr>

                        <div class="row">
                            <div class="col">
                                <div class="card-body">
                                    <p >Any of your description. </p>
                                    <p >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col col-lg-3 d-flex align-items-stretch mx-auto">
                                <div class="container-fluid" ><h4 class="text-center">Fav Bookshelf</h4>
                                    <div class="card card-body flex-fill" style={{'max-width': '250px', margin: '10px', 'padding-top':'20px'}}>
                                        <a href="tag_a.asp">
                                            <div class="shelfimg">
                                                <div class="ratio ratio-1x1 rounded">
                                                    <img src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
                                                        class="img mx-auto d-block" />
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-title">Fav Shelf</h5>
                                                <p class="card-text text-truncate">by saaasa</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="col col-lg-3 d-flex align-items-stretch mx-auto ">
                                <div class="container-fluid"><h4 class="text-center">Fav Author</h4>
                                    <div class="card card-body flex-fill" style={{'max-width': '250px', margin: '10px', 'padding-top':'20px'}}>
                                        <a href="tag_a.asp">
                                            <div class="authorimg">
                                                <div class="ratio ratio-1x1 rounded">
                                                    <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                                        class="img mx-auto d-block"/>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-title">Fav Author</h5>
                                                <p class="card-text text-truncate">Author</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="col col-lg-3 d-flex align-items-stretch mx-auto">
                                <div class="container-fluid"><h4 class="text-center">My work</h4>
                                    <div class="card card-body flex-fill" style={{'max-width': '250px', margin: '10px', 'padding-top':'20px'}}>
                                        <a href="tag_a.asp">
                                            <div class="shelfimg">
                                                <div class="ratio ratio-1x1 rounded">
                                                    <img src="https://media.istockphoto.com/photos/daisy-picture-id172185799?k=20&m=172185799&s=612x612&w=0&h=j59GAht7XA_9oEH0itZ77hBm6u2f4GBkRdzYi2Z4Jts="
                                                        class="img mx-auto d-block" />
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-title">My work</h5>
                                                <p class="card-text text-truncate">by Name</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </body>
        
    )
}

export default Author


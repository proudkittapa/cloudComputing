import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/bookshelf.css'
import '../css/main.css'
import {Link} from 'react-router-dom'
function BookShelf(){

   let {userId} = useParams()
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

                    <a href="/" class="px-3">200.00 THB</a>

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
                        <Link to="/user/1"><a className="dropdown-item" href="#"><i className="fas fa-user"></i> Profile</a></Link>
                        <a class="dropdown-item" href="#"><i class="fas fa-book"></i> Account</a>
                        <a class="dropdown-item" href="#"><i class="fas fa-cog"></i> Settings</a>
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
           
                <div class="container-fluid content" >
                <div class="row g-3">
                    <div class="col order-first col-lg-3 d-flex align-items-stretch">
                    <div href="/" class="card card-body flex-fill" style={{"max-width": "250px", margin: '10px', 'padding-top':'20px'}}>
                        <a href="tag_a.asp">
                            <div class="ratio ratio-1x1 rounded">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Plus_font_awesome.svg/1200px-Plus_font_awesome.svg.png"
                                class="img mx-auto d-block" />
                            </div>
                            <div class="card-body">
                            <h5 class="card-title">Add new book shelf</h5>
                            </div>
                        </a>
                    </div>
                    </div>

                    <div class="col col-lg-3 d-flex align-items-stretch">
                    <div class="card card-body flex-fill" style={{"max-width": "250px", margin: '10px', 'padding-top':'20px'}}>
                        <a href="tag_a.asp">
                        <div class="ratio ratio-1x1 rounded">
                            <img src="https://www.gamemonday.com/wp-content/uploads/2021/10/Botworld-Adventure-13102021-1.jpg" class="img mx-auto d-block"/>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Shelf title</h5>
                            <p class="card-text text-truncate">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        </a>
                    </div>
                    </div>

                    <div class="col col-lg-3 d-flex align-items-stretch">
                    <div class="card card-body flex-fill" style={{"max-width": "250px", margin: '10px', 'padding-top':'20px'}}>
                        <a href="tag_a.asp">
                        <div class="ratio ratio-1x1 rounded">
                            <img src="https://images.unsplash.com/photo-1544526226-d4568090ffb8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                                class="img mx-auto d-block" />
                            </div>
                            <div class="card-body">
                            <h5 class="card-title">Shelf title</h5>
                            <p class="card-text text-truncate">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </a>
                    </div>
                    </div>

                    <div class="col col-lg-3 d-flex align-items-stretch">
                    <div class="card card-body flex-fill" style={{"max-width": "250px", margin: '10px', 'padding-top':'20px'}}>
                        <a href="tag_a.asp">
                        <div class="ratio ratio-1x1 rounded">
                            <img src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
                                class="img mx-auto d-block" />
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Shelf title</h5>
                            <p class="card-text text-truncate">by saaasa</p>
                        </div>
                        </a>
                    </div>
                    </div>

                    <div class="col col-lg-3 d-flex align-items-stretch">
                    <div class="card card-body flex-fill" style={{"max-width": "250px", margin: '10px', 'padding-top':'20px'}}>
                        <a href="tag_a.asp">
                        <div class="ratio ratio-1x1 rounded">
                            <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                class="img mx-auto d-block"/>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Shelf title</h5>
                            <p class="card-text text-truncate">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        </a>
                    </div>
                    </div>

                    <div class="col col-lg-3 d-flex align-items-stretch">
                    <div class="card card-body flex-fill" style={{"max-width": "250px", margin: '10px', 'padding-top':'20px'}}>
                        <a href="tag_a.asp">
                        <div class="ratio ratio-1x1 rounded">
                            <img src="https://media.istockphoto.com/photos/daisy-picture-id172185799?k=20&m=172185799&s=612x612&w=0&h=j59GAht7XA_9oEH0itZ77hBm6u2f4GBkRdzYi2Z4Jts="
                                class="img mx-auto d-block" />
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Shelf title</h5>
                            <p class="card-text text-truncate">by saaasa</p>
                        </div>
                        </a>
                    </div>
                    </div>

                    <div class="col col-lg-3 d-flex align-items-stretch">
                    <div class="card card-body flex-fill" style={{"max-width": "250px", margin: '10px', 'padding-top':'20px'}}>
                        <a href="tag_a.asp">
                        <div class="ratio ratio-1x1 rounded">
                            <img src="https://img-19.ccm2.net/WNCe54PoGxObY8PCXUxMGQ0Gwss=/480x270/smart/d8c10e7fd21a485c909a5b4c5d99e611/ccmcms-commentcamarche/20456790.jpg"
                                class="img mx-auto d-block" />
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Shelf title</h5>
                            <p class="card-text text-truncate">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        </a>
                    </div>
                    </div>
                </div>
                </div>
            </div>


            </body>
        
    )
}

export default BookShelf


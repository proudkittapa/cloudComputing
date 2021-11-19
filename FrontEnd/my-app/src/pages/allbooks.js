import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/History.css'
import '../css/createprofile.css'
import {Link} from 'react-router-dom'
function AllBook(){

   
    return(
        <body>
            <nav className="navbar border-bottom">
                <div className="container-fluid">
                    <a className="navbar-brand flex-fill" href="/"><i className="fas fa-book"></i> Bababook</a>

                    <div className="d-none d-lg-block flex-grow-1 flex-fill">
                        <form className="d-flex input-group">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={handleChangeInput}></input>
                            <button className="btn btn-navbar" type="button" id="button-addon2"><i className="fas fa-search"></i></button>
                        </form>
                    </div>

                    <div className="d-flex flex-fill align-items-center">

                        <a href="/" className="px-3">200.00 THB</a>

                        <a href="/">
                            <svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 64 64" style={{"enable-background":"new 0 0 64 64", width:"32px", height:"32px", xmlSpace:"preserve"}}>
                                <polyline className="st0" points="31.63,44.51 54.52,61.28 54.5,61 54.5,2.5 9.5,2.5 9.5,61 9.48,61.28 32.23,44.61 "/>
                                <polygon className="st1" points="32,11.55 35.89,19.42 44.58,20.69 38.29,26.82 39.77,35.47 32,31.39 24.23,35.47 25.71,26.82 
                                    19.42,20.69 28.11,19.42 "/>
                            </svg>
                        </a>
                        
                        <div className="flex-fill">
                            <div className="nav-item dropdown">
                                <button className="btn btn-navbar rounded-circle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-user"></i>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#"><i className="fas fa-user"></i> Profile</a>
                                    <a className="dropdown-item" href="#"><i className="fas fa-book"></i> Account</a>
                                    <a className="dropdown-item" href="#"><i className="fas fa-cog"></i> Settings</a>
                                    <hr className="dropdown-divider"></hr>
                                    <a className="dropdown-item" href="#"><i className="fas fa-sign-out-alt"></i> Log Out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="d-flex">
                <div className="d-flex flex-column sidebar">
                    <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                        <li className="nav-item">
                            <a href="#" className="nav-link py-3">
                            <i className="fas fa-home"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link py-3">
                                <i className="fas fa-book"></i>
                            </a>
                        </li>
                        <li className="nav-item active">
                        <a href="#" className="nav-link py-3">
                            <i className="fas fa-book-open"></i>
                        </a>
                        </li>
                        <li className="nav-item">
                        <a href="#" className="nav-link py-3">
                            <i className="fas fa-clock"></i>
                        </a>
                        </li>
                        <li className="nav-item">
                        <a href="#" className="nav-link py-3">
                            <i className="fas fa-users"></i>
                        </a>
                        </li>
                    </ul>
                </div>

                
                <div className="container content">
                    <h3>Featured Author</h3>
                    <div class="container home-bar d-flex">
                        <a href="">
                            <div><img class="home-bar-item user" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item user" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item user" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item user" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item user" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item user" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="/" class="home-bar-item see-more"><i class="fas fa-plus"></i></a>
                    </div>
                    <br/>

                    <h3>All Books</h3>
                    <div class="container allbook-bar d-flex flex-wrap">
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                        <a href="">
                            <div><img class="home-bar-item book" src="https://via.placeholder.com/160"/></div>
                        </a>
                    </div>
                    <br/>

                    <div class="pagination">
                    <a href="#">&laquo;</a>
                    <a href="#" class="active" >1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">&raquo;</a>
                    </div>
                </div>
            </div>

        </body>

    )
}

export default AllBook
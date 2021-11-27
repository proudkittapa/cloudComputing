import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/History.css'
import '../css/main.css'
import {Link} from 'react-router-dom'
function History(){

   let {userId} = useParams()
    return(
        <body>
            <nav className="navbar border-bottom">
                <div className="container-fluid">
                    <a className="navbar-brand flex-fill" href="/"><i className="fas fa-book"></i> Bababook</a>
                    <div className="d-none d-lg-block flex-grow-1 flex-fill">
                        <form className="d-flex input-group">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-navbar" type="button" id="button-addon2"><i className="fas fa-search"></i></button>
                        </form>
                    </div>

                    <div className="d-flex flex-fill align-items-center">

                        <Link to={{pathname:`/user/${userId}/addMoney`}}><a href="/" class="px-3">200 THB</a></Link>

                        <a href="/">
                            <svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 64 64" style={{'enable-background':'new 0 0 64 64', width:'32px', height:'32px', xmlSpace:"preserve"}}>
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
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Link to="/user/1"><a className="dropdown-item" href="#"><i className="fas fa-user"></i> Profile</a></Link>
                                    <a class="dropdown-item" href="#"><i class="fas fa-cog"></i> Account Settings</a>
                                    <hr class="dropdown-divider"></hr>
                                    <a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt"></i> Log Out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="d-flex">
            <div className="d-flex flex-column sidebar">
                <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
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
                    <li className="nav-item active">
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
            <div className="container-fluid content" >
                <h3> 18 Dec 2020</h3>
                <div className="row g-3">
                    <div className="col order-first col-lg-3 d-flex align-items-stretch">
                    <div className="card card-body flex-fill" style={{'max-width': '250px', margin: '10px', 'padding-top':'20px'}}>
                        <a href="tag_a.asp">
                            <div className="authorimg">
                                <div className="ratio ratio-1x1 rounded">
                                <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/da3c9d43-2638-4757-b3d0-b8d5d0dcd7c7/de548p5-b657cd2a-f663-4540-af13-54f395a585af.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZGEzYzlkNDMtMjYzOC00NzU3LWIzZDAtYjhkNWQwZGNkN2M3XC9kZTU0OHA1LWI2NTdjZDJhLWY2NjMtNDU0MC1hZjEzLTU0ZjM5NWE1ODVhZi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.P7PswzM7IyPk-AdfDkovFGDmU478yifKRzBXu7xlKkE"
                                        className="img mx-auto d-block" />
                                </div>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Author name</h5>
                                <p className="card-text text-truncate">Author</p>
                            </div>
                        </a>
                    </div>
                    </div>

                <div className="col col-lg-3 d-flex align-items-stretch">
                    <div className="card card-body flex-fill" style={{'max-width': '250px', margin: '10px', 'padding-top':'20px'}}>
                        <a href="tag_a.asp">
                            <div className="shelfimg">
                            <div className="ratio ratio-1x1 rounded">
                                <img src="https://www.gamemonday.com/wp-content/uploads/2021/10/Botworld-Adventure-13102021-1.jpg" className="img mx-auto d-block"/>
                            </div>
                            </div>
                        <div className="card-body">
                            <h5 className="card-title">Shelf title</h5>
                            <p className="card-text text-truncate">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        </a>
                    </div>
                </div>
                </div>

                <h3> 18 Dec 2020</h3>
                <div className="row g-3">
                <div className="col col-lg-3 d-flex align-items-stretch">
                    <div className="card card-body flex-fill" style={{'max-width': '250px', margin: '10px', 'padding-top':'20px'}}>
                        <a href="tag_a.asp">
                            <div className="shelfimg">
                            <div className="ratio ratio-1x1 rounded">
                                <img src="https://images.unsplash.com/photo-1544526226-d4568090ffb8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                                    className="img mx-auto d-block" />
                            </div>
                            </div>
                        <div className="card-body">
                            <h5 className="card-title">Shelf title</h5>
                            <p className="card-text text-truncate">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        </a>
                    </div>
                </div>

                <div className="col col-lg-3 d-flex align-items-stretch">
                    <div className="card card-body flex-fill" style={{'max-width': '250px', margin: '10px', 'padding-top':'20px'}}>
                        <a href="tag_a.asp">
                            <div className="shelfimg">
                            <div className="ratio ratio-1x1 rounded">
                                <img src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
                                    className="img mx-auto d-block" />
                            </div>
                            </div>
                        <div className="card-body">
                            <h5 className="card-title">Shelf title</h5>
                            <p className="card-text text-truncate">by saaasa</p>

                        </div>
                        </a>
                    </div>
                </div>

                <div className="col col-lg-3 d-flex align-items-stretch">
                    <div className="card card-body flex-fill" style={{'max-width': '250px', margin: '10px', 'padding-top':'20px'}}>
                        <a href="tag_a.asp">
                            <div className="authorimg">
                            <div className="ratio ratio-1x1 rounded">
                                <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                                    className="img mx-auto d-block"/>
                            </div>
                            </div>
                        <div className="card-body">
                            <h5 className="card-title">Author name</h5>
                            <p className="card-text text-truncate">Author</p>

                        </div>
                        </a>
                    </div>
                </div>

                <div className="col col-lg-3 d-flex align-items-stretch">
                    <div className="card card-body flex-fill" style={{'max-width': '250px', margin: '10px', 'padding-top':'20px'}}>
                        <a href="tag_a.asp">
                            <div className="shelfimg">
                            <div className="ratio ratio-1x1 rounded">
                                <img src="https://media.istockphoto.com/photos/daisy-picture-id172185799?k=20&m=172185799&s=612x612&w=0&h=j59GAht7XA_9oEH0itZ77hBm6u2f4GBkRdzYi2Z4Jts="
                                    className="img mx-auto d-block" />
                            </div>
                            </div>
                        <div className="card-body">
                            <h5 className="card-title">Shelf title</h5>
                            <p className="card-text text-truncate">by saaasa</p>

                        </div>
                        </a>
                    </div>
                </div>

                <div className="col col-lg-3 d-flex align-items-stretch">
                    <div className="card card-body flex-fill" style={{'max-width': '250px', margin: '10px', 'padding-top':'20px'}}>
                        <a href="tag_a.asp">
                            <div className="authorimg">
                            <div className="ratio ratio-1x1 rounded">
                                <img src="https://img-19.ccm2.net/WNCe54PoGxObY8PCXUxMGQ0Gwss=/480x270/smart/d8c10e7fd21a485c909a5b4c5d99e611/ccmcms-commentcamarche/20456790.jpg"
                                    className="img mx-auto d-block" />
                            </div>
                            </div>
                        <div className="card-body">
                            <h5 className="card-title">Author name</h5>
                            <p className="card-text text-truncate">Author</p>
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

export default History


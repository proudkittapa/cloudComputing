import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/createShelf.css'
import '../css/main.css'

import {Link} from 'react-router-dom'
import { generateUploadURL } from './s3';
import { Redirect } from 'react-router'


function CreateShelf(){
    const [user, setUsers] = useState({})
    const [shelf, setShelf] = useState("")
    const [status, setStatus] = useState("")
    const [imgFile, setImgFile] = useState({})

    let {userId} = useParams()
    useEffect(()=>{
        getUser()
    }, []);
    const getUser = () =>{
        axios.get(`http://18.138.251.129:8080/bababook/user/${userId}`)
        .then((response) => {
            console.log(response);
            setUsers(response.data.data.user)
        })
    }    

    const newShelf = async(e) =>{
        e.preventDefault()
        const url = await generateUploadURL()
        var options = {
            headers: {
            'Content-Type': "multipart/form-data"
            }
        };
        console.log(url)

        axios.put(url, imgFile, options).then((response) => {
            console.log("response")
            console.log(response)
        })
        const imgURL = url.split('?')[0]
        const shelfName = {name:shelf, img:imgURL}
        e.preventDefault()

        console.log("shelf", shelf)
        
        axios.post(`http://18.138.251.129:8080/bababook/user/${userId}/shelf`, shelfName)
        .then((response) => {
            setStatus("successful")
            console.log("createShelf", response)
        })
        .catch(function(error) {
            alert(error.response.data.error.message)
        })
        
    }

    const handleChangeInput = (e) => {
        setShelf(e.target.value)
    }

    const handleImageFile = (e) =>{
        // e.preventDefault()
        const value = e.target.files[0]
        setImgFile(value)
    }
    
    if (status == "successful"){
        return <Redirect to= {{pathname:`/user/${userId}/bookShelf`}}/>
    }
    return(
        <body>
        <nav className="navbar border-bottom">
            <div className="container-fluid">
                <Link to={{pathname:`/home/${userId}`}}><a className="navbar-brand flex-fill" href="/"><i className="fas fa-book"></i> Bababook</a></Link>

                <div className="d-none d-lg-block flex-grow-1 flex-fill">
                    <form className="d-flex input-group">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search"></input>
                        <button className="btn btn-navbar" type="button" id="button-addon2"><i className="fas fa-search"></i></button>
                    </form>
                </div>

                <div className="d-flex flex-fill align-items-center">

                    <Link to={{pathname:`/user/${userId}/addMoney`}}><a href="/" class="px-3">{(Math.round([user.balance] * 100) / 100).toFixed(2)} THB</a></Link>

                    <a href="/">
                        <svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 64 64" style={{'enable-background': 'new 0 0 64 64', width:'32px', height:'32px', xmlSpace:'preserve'}}>
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
                    <li className="nav-item">
                        <Link to={{pathname:`/user/${userId}/history`}}><a href="#" className="nav-link py-3">
                            <i className="fas fa-clock"></i>
                        </a></Link>
                    </li>
                    <li>
                    <a href="#" className="nav-link py-3">
                        <i className="fas fa-users"></i>
                    </a>
                    </li>
                </ul>
            </div>
            
            <div className="container content">
                <form enctype="multipart/form-data">
            
                <div className="pub-item">
                    <h3>Bookshelf Name</h3>
                    <input type="text" className="form-control" id="name" placeholder="Bookshelf Name" onChange={handleChangeInput}/>
                </div>

                <br/>
                <div className="pub-item">
                    <h3>Upload Bookshelf Picutre</h3>
                    <input type="file" className="form-control" id="img_url"  accept="image/*" onChange={handleImageFile}/>
                </div>

                <br/>
                <button className="btn btn-success" type="submit" onClick={newShelf}><i className="fas fa-book py-1" ></i> Create Bookshelf</button>
                </form>
                </div>
            </div>

    </body>
        
    )
}

export default CreateShelf


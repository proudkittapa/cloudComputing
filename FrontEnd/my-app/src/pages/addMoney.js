import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/addmoney.css'
import '../css/main.css'

import {Link} from 'react-router-dom'
import { generateUploadURL } from './s3';
import { Redirect } from 'react-router'


function AddMoney(){
    const [user, setUsers] = useState({})
    const [balance, setBalance] = useState(50)
    const [status, setStatus] = useState("")
    const [errorMess, setErrorMess] = useState("")
    let {userId} = useParams()
    useEffect(()=>{
        getUser()
    }, []);
    const getUser = () =>{
        axios.get(`http://localhost:8080/bababook/user/${userId}`)
        .then((response) => {
            console.log(response);
            setUsers(response.data.data.user)
        })
    }    

    const addBalance = (e) =>{
        console.log("balance", balance)
        e.preventDefault()
        const balancePut = {balance:+balance}
        axios.put(`http://localhost:8080/bababook/user/${userId}/payment`, balancePut)
        .then((response) => {
            setStatus("successful")
            console.log("addBalance", response)
            alert("The balance is updated")
        })
        .catch(function(error) {
            alert(error.response.data.error.message)
            setErrorMess("error")
        })
    }

    const handleChangeInput = (e) => {
        setBalance(e.target.value)
    }
    if (status == "successful"){
        return <Redirect to= {{pathname:`/home/${userId}`}}/>
    }

    if (errorMess == "error"){
        return <Redirect to= {{pathname:`/user/${userId}/setting`}}/>
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
                            viewBox="0 0 64 64" style={{'enableBackground': 'new 0 0 64 64', width:'32px', height:'32px', xmlSpace:'preserve'}}>
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
                    <h3>Add Funds to Your Wallet</h3>
                    <br/>

                    <form enctype="multipart/form-data">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="add_money_radio" id="add_fifty" value={50} onChange={handleChangeInput} defaultChecked/>
                            <label className="form-check-label" for="add_fifty">
                                Add 50 THB
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="add_money_radio" id="add_hundred" value={100} onChange={handleChangeInput}/>
                            <label className="form-check-label" for="add_hundred">
                                Add 100 THB
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="add_money_radio" id="add_twofifty" value={250} onChange={handleChangeInput}/>
                            <label className="form-check-label" for="add_twofifty">
                                Add 250 THB
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="add_money_radio" id="add_fivehun" value={500} onChange={handleChangeInput}/>
                            <label className="form-check-label" for="add_fivehun">
                                Add 500 THB
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="add_money_radio" id="add_thousand" value={1000} onChange={handleChangeInput} />
                            <label className="form-check-label" for="add_thousand">
                                Add 1000 THB
                            </label>
                        </div>
                        <br/>
                        <button className="btn btn-success" type="submit" onClick={addBalance}><i className="fas fa-wallet py-1"></i> Add Funds</button>
                    </form>
                </div>
            </div>
            
        </body>
        
    )
}

export default AddMoney


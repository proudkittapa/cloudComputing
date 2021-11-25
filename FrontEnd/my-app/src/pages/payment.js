import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/publish.css'
import {Link} from 'react-router-dom'
import { generateUploadURL } from './s3';
import { Redirect } from 'react-router'


function Payment(){
    const [user, setUsers] = useState({})
    const [payment, setPayment] = useState({})
    const [status, setStatus] = useState("")

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

    const handleChangeInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setPayment((oldValue) => ({ ...oldValue, [name]: value }))
    }

    const createPayment = () =>{
        const paymentPost = {...payment, card_name:payment.card_name, card_number:payment.card_number, exp:payment.exp, ccv:payment.ccv}
        axios.post(`http://localhost:8080/bababook/user/${userId}/payment`, paymentPost)
        .then((response) => {
            setStatus("successful")
            console.log("CreatePayment", response)
        })
    }

    if (status == "successful"){
        return <Redirect to= {{pathname:`/home/${userId}`}}/>
    }
    
   
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

                    <Link to={{pathname:`/user/${userId}/addMoney`}}><a href="/" class="px-3">{(Math.round([user.balance] * 100) / 100).toFixed(2)} THB</a></Link>

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
                                <Link to={{pathname:`/user/${userId}`}}><a className="dropdown-item" href="#"><i className="fas fa-user"></i> Profile</a></Link>
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
                    <li className="nav-item">
                    <a href="#" className="nav-link py-3">
                        <i className="fas fa-users"></i>
                    </a>
                    </li>
                </ul>
            </div>

            <div className="container content">
                <div className="container-fluid" >
                        <div className="col-8">
                            <div className="proInput">
                                <div className="conpad">
                                    <h3 >Add Payment Information</h3>
                                </div>
                                <label for="card_name" className="form-label">Full Name</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        </svg>
                                    </span>
                                    <input type="text" className="form-control" id="card_name" placeholder="Full Name" name="card_name" onChange={handleChangeInput}/>
                                </div>

                                <label for="card_number" className="form-label">Credit Card Number</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <svg className="svg-inline--fa fa-credit-card fa-w-18" aria-hidden="true" focusable="false" data-prefix="far" data-icon="credit-card" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg="">
                                            <path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"></path>
                                        </svg>
                                    </span>
                                    <input type="number" className="form-control" id="card_number" placeholder="1111-2222-3333-4444" name="card_number" onChange={handleChangeInput}/>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label for="exp" className="form-label">Expiry Date</label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <svg className="svg-inline--fa fa-calendar-alt fa-w-14" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                                                    <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                                                </svg>
                                            </span>
                                            <input type="text" className="form-control" pattern="\d*" id="exp" maxlength="4" placeholder="MM/YY" name="exp" onChange={handleChangeInput}/>
                                        </div>
                                    </div>
                                    

                                    <div className="col">
                                        <label for="ccv" className="form-label">CCV</label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <svg className="svg-inline--fa fa-credit-card fa-w-18" aria-hidden="true" focusable="false" data-prefix="far" data-icon="credit-card" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg="">
                                                    <path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"></path>
                                                </svg>
                                            </span>
                                            <input type="text" className="form-control" pattern="\d*" id="ccv" maxlength="3" placeholder="CCV" name="ccv" onChange={handleChangeInput}/>
                                        </div>
                                    </div>
                                </div>

                                <button className="btn btn-success" type="submit" onClick={createPayment}><i className="fas fa-plus py-1"></i>Submit</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </body>
        
    )
}

export default Payment


import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/accountsettings.css'
import '../css/createprofile.css'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router'
import { generateUploadURL } from './s3';

function AccountSetting(){
    const [user, setUsers] = useState({})
    let {userId} = useParams()
    const [userUpdate, setUserUpdate] = useState({})
    const [status, setStatus] = useState("")
    const [paymentName, setPaymentName] = useState("No card attached to account")
    const [paymentNumber, setPaymentNumber] = useState("XXXX-XXXX-XXXX-X000")
    const [havePayment, setHavePayment] = useState(true)
    const [imgFile, setImgFile] = useState({})
    const empty = {}

    useEffect(()=>{
        console.log("before get user")
        getUser()
        getPayment()
    }, []);
    const getUser = () =>{
        try{
            axios.get(`http://52.221.200.38:8080/bababook/user/${userId}`)
            .then((response) => {
                console.log(response);
                setUsers(response.data.data.user)
            
            })
        }
        catch(error){
            console.log("error", error)

        }
        
    }

    const getPayment = () =>{
        axios.get(`http://52.221.200.38:8080/bababook/user/${userId}/payment`)
        .then((response) => {
            console.log("payment", response);
            setPaymentName(response.data.data.payment.card_name)
            setPaymentNumber(response.data.data.payment.card_number)
            // alert("You already have payment detail")
        })
    }

    const handleChangeInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUserUpdate((oldValue) => ({ ...oldValue, [name]: value }))
    }

    const update = async(e) => {
        console.log("imgFile", imgFile)
        e.preventDefault()
        const url = await generateUploadURL()
        let realURL = user.img

        var options = {
            headers: {
            'Content-Type': "multipart/form-data"
            }
        };
        console.log(url)
        if (imgFile.name != undefined){
            axios.put(url, imgFile, options).then((response) => {
                console.log("response")
                console.log(response)
            })
            const imgURL = url.split('?')[0]
            realURL = imgURL    
        }
    
        let tempFullName = user.full_name
        let tempEmail = user.email

        if (userUpdate.full_name != undefined){
            tempFullName = userUpdate.full_name
        }
        if (userUpdate.email != undefined){
            tempEmail = userUpdate.email
        }
     
        const userTemp = {...userUpdate, full_name:tempFullName, age:+user.age, email:tempEmail, role:user.role, username:user.username, img:realURL}
        console.log(userTemp)
        try{
            axios.put(`http://52.221.200.38:8080/bababook/user/${userId}`, userTemp)
            .then((response) =>{
                console.log("response", response)
                setStatus("successful")
                alert("success")
            })
        }
        catch(error){
            alert("error", error)
            console.log("error", error)
        }
    }
    

    const handleImageFile = (e) =>{
        // e.preventDefault()
        const value = e.target.files[0]
        if (value != null){
            setImgFile(value)
        }
    }

    if (status == "successful"){
        return <Redirect to= {{pathname:`/user/${userId}`}}/>
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
                        viewBox="0 0 64 64" style={{"enableBackground":"new 0 0 64 64", width:"32px", height:"32px", xmlSpace:"preserve"}}>
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

                <h3>Account Settings</h3>
                <hr/>
                <form enctype="multipart/form-data">

                    <div className="pub-item">
                        <h3>Profile Picture</h3>
                        <input type="file" className="form-control" id="img_url"  accept="image/*" onChange={handleImageFile}/>
                    </div>

                    <div className="pub-item">
                        <h3>Name</h3>
                        <input type="text" className="form-control" id="name" placeholder={user.full_name} name="full_name" onChange={handleChangeInput}/>
                    </div>
        
                    <div className="pub-item">
                        <h3>Email</h3>
                        <input type="email" className="form-control" id="name" placeholder={user.email} name="email" onChange={handleChangeInput}/>
                    </div>

                    <div className="pub-item">
                        <h3>Password</h3>
                        <input type="password" className="form-control" id="name" placeholder="Password"/>
                    </div>
                    
                    {/* <div className="form-group pub-item">
                        <h3>Description</h3>
                        <textarea className="form-control" id="description" rows="5"></textarea>
                    </div> */}

                    <button className="btn btn-success" type="submit" onClick={update}><i className="fas fa-save py-1"></i>Save Changes</button>
                    </form>
                    <br/>
                    <hr/>
                    <div className="form-group pub-item">
                        <h3>Payment</h3>
                        <h3><i className="fas fa-credit-card py-1"></i> {paymentName}</h3>
                        <h3><i className="fas fa-credit-card py-1"></i> {paymentNumber}</h3>
                        <h3><a href={`/user/${userId}/payment`} rel="noopener noreferrer"><i className="fas fa-plus py-1"></i> Add Payment Method</a></h3>
                    </div>
                </div>
        </div>


    </body>
        
    )
}

export default AccountSetting


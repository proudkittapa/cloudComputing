import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/publish.css'
import {Link} from 'react-router-dom'
// import { generateUploadURL } from './s3';
import S3 from "react-aws-s3"
import aws from 'aws-sdk'
function Publish(){
    const [book, setBook] = useState({})
    const [imgURL, setImgURL] = useState("")
    const [bookURL, setBookURL] = useState("")
    const fileImg = useRef();
    const fileBook = useRef();
    const [user, setUsers] = useState({})
    let {userId} = useParams()
    // console.log("id:", id)
    useEffect(()=>{
        console.log("before get user")
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
        setBook((oldValue) => ({ ...oldValue, [name]: value }))
    }
    const createBook = async() =>{
        let img = fileImg.current.files[0]
        let newImg = fileImg.current.files[0].name
        let bookFile = fileBook.current.files[0]
        let newBookFile = fileBook.current.files[0].name
        console.log(img, newImg)

        
        
        const config = {
            bucketName: process.env.REACT_APP_BUCKET_NAME,
            dirName: process.env.REACT_APP_DIR_NAME /* optional */,
            region: process.env.REACT_APP_REGION,
            accessKeyId: process.env.REACT_APP_SECRET_KEY,
            secretAccessKey: process.env.REACT_APP_ACCESS_KEY
        }
        const reactS3Client = new S3(config)
        const s3 = new aws.s3(config)
        reactS3Client.uploadFile(img, newImg).then(data =>{
            console.log(data)
            if (data.status === 204){
                console.log("success")
            }else{
                console.log("fail")
            }
            console.log("imgURL", imgURL)
            setImgURL(data.location)
        })
        reactS3Client.uploadFile(bookFile, newBookFile).then(data =>{
            console.log(data)
            if (data.status === 204){
                console.log("success")
            }else{
                console.log("fail")
            }
            setBookURL(data.location)
        })
        
        const bookPost = {...book, price:book.price, name:book.name, description:book.description, img:bookURL, user_id:userId}
        console.log("in create book", bookPost)
        try{
            axios.post(`http://localhost:8080/bababook/book`, bookPost)
            .then((response) =>{
                if (response.status === 200){
                    alert("book added")
                }
                console.log("addbook", response)
            }) 
        }
        catch(error){
            alert(error)
        }
    }

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

                        <a href="/" className="px-3">{user.balance} THB</a>

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
                    <div className="row row-book-container row-book-sm row-book-lg">
                        
                        <div className="col-auto">
                            <form method="post" enctype="multipart/form-data">
                                <div className="upload-book"></div>
                                <br></br>
                                <input type="file" className="form-control" id="img_url"  accept="image/*" ref={fileImg}/>
                            </form>
                        </div>

                        <div className="col-lg">
                            <div className="pub-item">
                                <h3>Book Title</h3>
                                <input type="text" className="form-control" id="name" placeholder="Book Title" name="name" onChange={handleChangeInput} ></input>
                            </div>

                            <div className="pub-item">
                                <h3>Price</h3>
                                <div className="input-group mb-2 mr-sm-2">
                                    <input type="number" className="form-control" id="price" placeholder="Price" min="0" step="any" name="price" onChange={handleChangeInput}></input>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">THB</div>
                                    </div>
                                </div>
                            </div>

                            <div className="pub-item">
                                <h3>Upload Book</h3>
                                <input type="file" className="form-control" id="book"  accept=".pdf" ref={fileBook}/>
                            </div>

                            <div className="form-group pub-item">
                                <h3>Description</h3>
                                <textarea className="form-control" id="description" rows="5" name="description" onChange={handleChangeInput}></textarea>
                            </div>

                            <button className="btn btn-success" type="submit" onClick={createBook}><i className="fas fa-book-open py-1"></i> Publish Book</button>
                            </div>
                        </div>
                    </div>
                </div>


        </body>
        
    )
}

export default Publish


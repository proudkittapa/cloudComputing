import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getBookById } from '../actions/posts';
function HomePage(){
    const [bookItem, setBookItems] = useState([])
    useEffect(() => {
        getBook()
    }, [])
    // let {id} = useParams("id")
    // console.log("id:", id)
    let {id} = "1"
    console.log("id:", id)
    const getBook = async (e) =>{
        try{
            const response = await getBookById(id)
            // console.log(response.data.data)
            if (response.status == 200){
                setBookItems(response.data.data || [])
                console.log(bookItem)
                console.log(bookItem.book.book_id)
            }
        }
        catch(error){
            alert(error)
        }
    }
    return(
        <body>        
            <nav className="navbar">
                <div className="container-fluid">
                <a className="navbar-brand flex-fill">Bababook</a>
                <div className="d-none d-lg-block flex-fill">
                    <form className="d-flex ">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button className="btn btn-secondary" type="submit"><i className="fas fa-search"></i> Search</button>
                    </form>
                </div>
                <div className="dropdown flex-fill">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <form className="d-flex justify-content-center d-lg-none">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-secondary" type="submit"><i className="fas fa-search"></i></button>
                        </form>
                        <a className="dropdown-item" href="#"><i className="fas fa-user"></i> Profile</a>
                        <a className="dropdown-item" href="#"><i className="fas fa-book"></i> Library</a>
                        <a className="dropdown-item" href="#"><i className="fas fa-cog"></i> Settings</a>
                        <hr className="dropdown-divider"></hr>
                        <a className="dropdown-item" href="#"><i className="fas fa-sign-out-alt"></i> Log Out</a>

                    </div>
                </div>
                </div>
            </nav>
            <div className="container">
                <div className="row row-book-container row-book-sm row-book-lg">
                    <div className="col-auto">
                        <img className="book-cover" src="https://i.imgur.com/Io2Jx0c.png"></img>
                    </div>
                    <div className="col-lg">
                        <div className="d-flex align-items-end">
                            <h1>{bookItem.book.name}</h1>
                            <h2 className="separator"> • </h2>
                            <h2>Firstname Lastname</h2>
                        </div>
                        <div className ="hr">
                            <h3>Rating: <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="far fa-star"></i></h3>
                            {/* {bookItem.book.rating} use this variable*/}
                            <br>
                            </br>
                            <div className="pricing-add d-flex align-items-end">
                                <div className="d-flex">
                                    <h3>Price: </h3>
                                    <h3>฿{bookItem.book.price}</h3>
                                </div>
                                <button className="btn btn-success" type="submit"><i className="fas fa-plus"></i> Add Book</button>
                            </div>

                        </div>
                    </div>
                </div>
                <h2>Description</h2>
                <div className="hr"></div>
                <p className="book-desc"> {bookItem.book.description}</p>
            </div>
        </body>
        
    )
}

export default HomePage


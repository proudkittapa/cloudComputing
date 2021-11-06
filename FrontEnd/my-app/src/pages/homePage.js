import React from "react"
import {Link} from "react-router-dom";
// import '/Users/kittapasasivimonpan/Desktop/cloudComputing/FrontEnd/my-app/public/css/bookdisplay.css';
function HomePage(){
    return(
        <body>        
            <nav class="navbar">
                <div class="container-fluid">
                <a class="navbar-brand flex-fill">Bababook</a>
                <div class="d-none d-lg-block flex-fill">
                    <form class="d-flex ">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button class="btn btn-secondary" type="submit"><i class="fas fa-search"></i> Search</button>
                    </form>
                </div>
                <div class="dropdown flex-fill">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <form class="d-flex justify-content-center d-lg-none">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button class="btn btn-secondary" type="submit"><i class="fas fa-search"></i></button>
                        </form>
                        <a class="dropdown-item" href="#"><i class="fas fa-user"></i> Profile</a>
                        <a class="dropdown-item" href="#"><i class="fas fa-book"></i> Library</a>
                        <a class="dropdown-item" href="#"><i class="fas fa-cog"></i> Settings</a>
                        <hr class="dropdown-divider"></hr>
                        <a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt"></i> Log Out</a>

                    </div>
                </div>
                </div>
            </nav>
            <div class="container">
                <div class="row row-book-container row-book-sm row-book-lg">
                    <div class="col-auto">
                        <img class="book-cover" src="https://i.imgur.com/Io2Jx0c.png"></img>
                    </div>
                    <div class="col-lg">
                        <div class="d-flex align-items-end">
                            <h1>Book Name</h1>
                            <h2 class="separator"> • </h2>
                            <h2>Firstname Lastname</h2>
                        </div>
                        <div class ="hr">
                            <h3>Rating: <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i></h3>
                            <br>
                            </br>
                            <div class="pricing-add d-flex align-items-end">
                                <div class="d-flex">
                                    <h3>Price: </h3>
                                    <h3>฿200.00</h3>
                                </div>
                                <button class="btn btn-success" type="submit"><i class="fas fa-plus"></i> Add Book</button>
                            </div>

                        </div>
                    </div>
                </div>
                <h2>Description</h2>
                <div class="hr"></div>
                <p class="book-desc"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam libero lorem, iaculis et nibh maximus, vehicula luctus ex. Cras aliquam urna convallis massa malesuada, et faucibus lorem egestas. Vivamus facilisis orci nec felis maximus eleifend. Etiam pellentesque, diam id mollis iaculis, lectus erat commodo magna, quis tincidunt tortor leo vitae erat. Donec gravida consectetur malesuada. Sed auctor mauris a nisl venenatis, ut vestibulum diam scelerisque. Suspendisse congue eros sed finibus tempor. Etiam porta, nisl ut condimentum luctus, orci dolor tempor ante, ac egestas est enim at dolor.</p>
            </div>
        </body>
        
    )
}

export default HomePage


import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { createPost, getAllMenu } from '../actions/posts'
// import PostList from '../components/PostList'

function ShowMenu() {
    let limit = 10 
    let {page} = useParams()
    // var url = new URL(window.location.href)
    // let page = url.searchParams.get("page")
    // if (Number(page) == 0){
    //     page = "1"
    // }
    const [menuItem, setMenuItems] = useState([])
    const [menu, setMenu] = useState({})
    useEffect(() => {
        getList()
    }, [])
    
    const getList = async (e) => {
        try {
            const response = await getAllMenu(limit,Number(page))
            console.log(response.data.data)
            // alert(response.data.data[0])
            if (response.status === 200) {
                setMenuItems(response.data.data || [])
            }
        } catch (error) {
            alert(error)
        }
    }

    function reloadCss()
    {
    var links = document.getElementsByName("showMenu");
    for (var link of links) {
        // link.href = "./css/showMenu"
        link.href = "./css/showMenu".replace(/\?.*|$/, "?v={" + Date.now() + "}")
      }
    }

    function pageLeft(page)
    {
        if (page == 0){
            return 1
        }

        return page
    }


    return (
        <div className="v1_3">
            <div className="v6_3"></div>
            <div className="v6_2"></div>
            <Link to="/showCart"><div className="v6_10">
                <div className="v6_9"></div>
                <span className="v6_8">cart</span>
            </div></Link>
            <div className="v6_12"></div>
            <span className="v6_13">SHOP</span>
            {/*<form action="https://google.com">*/}
            {/*    <input type="submit" value="Go to Google" />*/}
            {/*</form>*/}
            <Link to="/showMenu/1"><div className="v6_14">MENU</div></Link>
            <Link to="/showOrder"><span className="v6_15">ORDER</span></Link>
            <Link to="/showMoney"><span className="v6_19">MONEY</span></Link>
            <Link to="/showStock"><span className="v6_20">STOCK</span></Link>
            <span className="v6_16">ADMIN</span>
            <Link to="/showReport"><span className="v6_17">REPORT</span></Link>
            <Link to="/showHistory"><span className="v6_18">HISTORY</span></Link>
            <span className="v6_25">
                <div className="v6_22"></div>
                <span className="v6_23">LOG OUT</span>
            </span>
            <Link to="/homepage"><span className="v6_32">POS COFFEE</span></Link>
            <Link to="/createMenu"><div className="v6_62">
                <div className="v6_60"></div><span className="v6_61">Create Menu</span>
            </div></Link>
            <div className="pagination">
                {/* <Link onClick={reloadCss} to={{pathname:`/showMenu/${pageLeft(Number(page-1))}`}}>❮</Link>
                <Link onClick={reloadCss} to={{pathname:`/showMenu/${Number(page)+1}`}}>❯</Link> */}

                {/* <Link  to={{pathname:`/showMenu/${pageLeft(Number(page-1))}`}}>❮</Link>
                <Link  to={{pathname:`/showMenu/${Number(page)+1}`}}>❯</Link> */}

                {/* <Link to={{pathname:`/showMenu?page=${pageLeft(Number(page-1))}`}} >❮</Link>
                <Link to={{pathname:`/showMenu?page=${Number(page)+1}`}} >❯</Link> */}

            </div>
            <div className='menu'>
            {menuItem.map((item, index) => {
                return (
                    
                        <Link to={{pathname:`/menuInfo/${item.id}`}} ><div className="v12_301">
                            <div className="v6_167"></div>
                            <div className="v6_168"></div><span className="v6_169" key={index}>{item.name}</span><span className="v6_170" key={index}>{item.price}</span>
                        </div></Link>
                    
                )
            })}
           </div>
        </div>
    )
}

export default ShowMenu
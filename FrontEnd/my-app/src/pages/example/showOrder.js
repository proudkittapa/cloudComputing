import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { getAllOrder } from '../actions/posts'

function ShowOrder() {
    const [orderItem, setOrderItems] = useState([])
    // const [menu, setMenu] = useState({})
    useEffect(() => {
        getList()
    }, [])

    const getList = async (e) => {
        try {
            const response = await getAllOrder()
            console.log(response.data.data)
            // alert(response.data.data[0])
            if (response.status === 200) {
                setOrderItems(response.data.data || [])
            }
        } catch (error) {
            alert(error)
        }
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
            <div className="pagination">
                <a href="#">❮</a>
                <a href="#">❯</a>
            </div>
            <div className='menu'>
            {orderItem.map((item, index) => {
                return (
                        <Link to={{pathname:`/orderInfo/${item._id}`}}><div className="v12_301">
                            <div className="v6_167"></div>
                            <div className="v6_168"></div><span className="v6_169" key={index}>{item._id}</span>
                            <span className="v6_170" key={index}>{item.price}</span>
                        </div></Link>
                    
                )
            })}
           </div>
        </div>
    )
}

export default ShowOrder
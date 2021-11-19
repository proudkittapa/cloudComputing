import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getEachOrder, getEachMenu, addToCart } from '../actions/posts'

function OrderInfo() {
    const [orderItem, setOrderItem] = useState([])
    const [menuItem, setMenuItem] = useState([])

    useEffect(() => {
        getList()
    }, [])
    let { id } = useParams()
    const getList = async (e) => {
        try {
            console.log("id", id)
            const response = await getEachOrder(id)
            console.log(response.data.data)
            // alert(response.data.data[0])
            if (response.status === 200) {
                console.log("data", response.data)
                console.log("data2", response.data.data.cart.menu)
                const menuFromGet = response.data.data.cart.menu
                const orderItems = response.data.data
                setOrderItem(orderItems || [])
                // console.log("proud mai suay",orderItem.cart.menu)
                setMenuItem(menuFromGet || [])
                console.log("menuItem", menuItem)
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
            <div className="orderArea">
            {menuItem.map((item, index) => {
                return (
                    <div className="order1">
                        <span className="v17_509">Name : </span><div className="v17_510" key={index}>{item.name}</div>
                        <span className="v17_525">Amount :</span><div className="v17_526" key={index}>{item.amount}</div>
                        <span className="v17_523">Price :</span> <div className="v17_524" key={index}>{item.price}</div>
                        <span className="v17_521">Description :</span><div className="v17_522" key={index}>{item.option}</div>
                    </div>
                )
            })}
            </div>
            <span className="v17_513">Method :</span><div className="v17_514" name = "payment_method">{orderItem.payment_method}</div>
            <span className="v17_515">Type :</span> <div className="v17_516" name = "type">{orderItem.type}</div>
            <span className="v17_517">Total Price :</span> <div className="v17_518" name = "price">{orderItem.price}</div>
            {/* <span class="v17_519">Destination :</span><div class="v17_520" name = "destination">{orderItem.destination}</div> */}


        </div>
    )
}

export default OrderInfo
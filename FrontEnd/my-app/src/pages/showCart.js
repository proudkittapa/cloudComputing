import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { FinishCart, getCart } from "../actions/posts";

function ShowCart() {
    const [menuItem, setMenuItem] = useState([])
    const [paid, setPaid] = useState("")
    const [method, setMethod] = useState("")
    const [type, setType] = useState("")
    const [destination, setDestination] = useState("")
    const [total, setTotal] = useState("")
    const id = "pondnarawich"
    const data = "pondnarawich"
    const getList = async (e) => {
        try {
            const response = await getCart(id)
            console.log(response.data.data)
            // alert(response.data.data[0])
            if (response.status === 200) {
            }
        } catch (error) {
            alert(error)
        }
    }

    let map, infoWindow;


    const finish = async (e) => {
        try {
            e.preventDefault()
            const data = {paid: paid, method:method, type: type, latitude: 1, longitude: 2}
            const response = await FinishCart("c3ok6a2mvdvh8i865ta0",data)
            console.log(response)
            

            if (response.status === 200) {
                console.log("create", response)
                alert("created")
            }
        } catch (error) {
            // if (error.status === 422){
            //     alert("422")
            // }
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
            {/* {menuItem.map((item, index) => {
                return (
                <div className="orders">
                    <span class="v14_84">Name : </span><div class="v14_85" key={index}>{item.name}</div>
                    <span class="v14_86">Description :</span><div class="v14_87" key={index}>{item.option}</div>
                    <span class="v17_112">Price :</span><div class="v17_113" key={index}>{item.price}</div>
                    <span class="v17_106">Amount :</span><div class="v17_107" key={index}>{item.amount}</div>
                    
                </div>
                )
            })} */}
            </div>


            <div className="payment">
                <span class="v17_136">Paid :</span><input class="v17_137" type='number' name='name' onChange={(e) => setPaid(e.target.value)}></input>
                <span class="v17_138">Method :</span>
                <select class="v17_139" type='text' name='method' onChange={(e) => setMethod(e.target.value)}>
                    <option value="cash">Cash</option>
                    <option value="mobile-banking">Mobile Banking</option>
                    <option value="credit-card">Credit Card</option>
                    <option value="debit-card">Debit Card</option>
                </select>
                <span class="v17_140">Type :</span>
                <select class="v17_141" type='text' name='type' onChange={(e) => setType(e.target.value)}>
                    <option value="dine-in">Dine-in</option>
                    <option value="takeaway">Takeaway</option>
                    <option value="delivery">Delivery</option>
                </select>
                <span class="v17_144">Total Price :</span><input class="v17_145" type='number' name='name' onChange={(e) => setTotal(e.target.value)}></input>
                <span class="v17_142">Destination :</span>
                <span class="latitude">Latitude :</span>
                <input class="v17_143" type='number' name='latitude' onChange={(e) => setDestination(e.target.value)}></input>

                <span class="longitude">Longitude :</span>
                <input class="longitudeInput" type='number' name='longitude' onChange={(e) => setDestination(e.target.value)}></input>


                <Link to={{pathname:`/changeBill/${id}` ,state:data}}><div class="v14_81">
                    <span class="v14_82" onClick={finish}>Finish</span>
                </div></Link>
            </div>

        </div>


    )
}

export default ShowCart
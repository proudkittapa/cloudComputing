import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { FinishCart } from "../actions/posts";
import data from "../pages/showCart";

function ChangeBill() {
    let { id } = useParams()
    const [Change, setChange] = useState([])

    const getList = async (e) => {
        try {
            const response = await FinishCart(id, data)
            console.log(response.data.data)
            // alert(response.data.data[0])
            if (response.status === 200) {
                setChange(response.data.data || [])
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
            <div class="v17_166">
                <div class="v17_167"></div><span class="v17_168">Print Bills</span>
            </div><span class="v17_170">Changes :</span>
            {Change.map((item, index) => {
                return (
                    <div>
                        <span class="v17_194">Notes / Coins :</span>
                        <div class="v17_195" key={index}>{item.Value}</div>
                        <span class="v17_200">Amount :</span>
                        <div class="v17_201" key={index}>{item.Amount}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default ChangeBill
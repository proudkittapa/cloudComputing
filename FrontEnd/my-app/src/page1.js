import React from "react"
import {Link} from "react-router-dom";

function Page1(){
    return(
        <div className="v1_3">
            <div className="v6_3"></div>
            <div className="v6_2"></div>
            <div className="name"></div>
            <button className="v6_10">
                <span className="v6_8">cart</span>
            </button>
            <div className="v6_12"></div>
            <span className="v6_13">SHOP</span>
            {/*<form action="https://google.com">*/}
            {/*    <input type="submit" value="Go to Google" />*/}
            {/*</form>*/}
            <a href="http://google.com"><div className="v6_14">MENU</div></a>

            <Link to="/order">ORDER</Link>
            <button className="v6_15">ORDER</button>
            <button className="v6_19">MONEY</button>
            <button className="v6_20">STOCK</button>
            <span className="v6_16">ADMIN</span>
            <button className="v6_17">REPORT</button>
            <button className="v6_18">HISTORY</button>
            <button className="v6_25">
                <div className="v6_22"></div>
                <span className="v6_23">LOG OUT</span>
            </button>
            <span className="v6_26">WELCOME</span>
            <span className="v6_32">POS COFFEE</span>
        </div>
    )
}

export default Page1
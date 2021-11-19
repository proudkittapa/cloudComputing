import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getAllMoney, getMoney, deleteMoney} from '../actions/posts'
// import PostList from '../components/PostList'
export default ShowMoney

function ShowMoney() {
    const [moneyItem, setMoneyItems] = useState([])
    const [indexMoney, setIndexMoney] = useState()
    useEffect(() => {
        getList()
    }, [])
    
    const getList = async (e) => {
        try {
            const response = await getAllMoney()
            // console.log(response.data.data)
            // alert(response.data.data[0])
            if (response.status === 200) {
                const temp = response.data.data
                setMoneyItems(temp || [])
                
            }
        } catch (error) {
            alert(error)
        }
    }
    function refreshPage() {
        window.location.reload(false);
      }


    const deleteMoneyItem = async (e) => {
        try {
            e.preventDefault()
            // console.log("indexs",e.currentTarget.dataset.index); //will log the index of the clicked item

            const id = moneyItem[e.currentTarget.dataset.index]._id
            const response = await deleteMoney(id)
            
            if (response.status === 200) {
                alert("deleted")
                refreshPage()
            }
        } catch (error) {
            alert(error)
        }
      }

    return (
        <div className="v1_3">
            <div className="v6_3"></div>
            <div className="v6_2"></div>
            <div className="name"></div>
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

            <div className="moneyArea">

            {moneyItem.map((item, index) => {
                
                return (
    
                    <div className="money"> 
                        <span class="v18_239">Notes / Coins :</span>
                        <div class="v18_240" name="value" key={index}>{item.value}</div>
                        <span class="v18_241">Amount :</span>
                        <div class="v18_242" name="amount" key={index}>{item.amount}</div>
                        <button class="v18_266" key= {index} data-index={index} onClick={deleteMoneyItem}>
                            <span class="v18_267">Delete</span>
                        </button>
                        <button class="v21_430">
                            <span class="v21_431">Update</span>
                        </button>
                    </div>
                    
                )
            })}
                
            </div>

            <button class="v18_285">
                        <span class="v18_286">Add Notes / Coins</span>
            </button>
        </div>
    )
}


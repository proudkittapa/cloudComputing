import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { createPost, getEachMenu, addToCart } from '../actions/posts'
// import PostList from '../components/PostList'
export default MenuInfo

function MenuInfo() {
    // const customer_id = "c3ok6a2mvdvh8i865tag"

    const [menuItem, setMenuItems] = useState([])
    const [menu, setMenu] = useState([])
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState()
    const [cart, setCart] = useState([])
    useEffect(() => {
        getList()
    }, [])
    let {id} = useParams("id")
    console.log("iddd", id)
    const getList = async (e) => {
        try {
            const response = await getEachMenu(id)
            console.log(response.data.data)
            // alert(response.data.data[0])
            if (response.status === 200) {
                setMenuItems(response.data.data || [])
            }

        } catch (error) {
            alert(error)
        }
    }

    const addCart = async (e) => {
        try {
            e.preventDefault()
            console.log("menuItem", menuItem)
            const temp = {_id:menuItem.id, category: menuItem.category, name:menuItem.name, ingredient:menuItem.ingredient, price:+menuItem.price, available:menuItem.available, amount:+amount, option:description}

            let tempMenu = [...menu]
            tempMenu = menu.push(temp)
            const cartData = {_id: "c3ok6a2mvdvh8i865ta0", customer_id: "c3ok6a2mvdvh8i865tag", menu: menu}
            let test2 = [...cart]
            test2 = cart.push(cartData)
            // setCart(cartData)
            console.log("cart", cart)
            // const response = await addToCart({id:id, menu:cart})
            const response = await addToCart(id, cart[0])
            console.log(response.data.data)
            // alert(response.data.data[0])
            if (response.status === 200) {
                alert("created")
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
            <button className="v12_338">

                < div className="v12_339" onClick={addCart}>
                <span className="v12_340">Add to cart</span>
                </ div>
            </button>
            <Link to="/updateMenu"><div className="v14_6">
                <div className="v14_7"></div><span className="v14_8">Update</span>
            </div></Link>
            <div className="v14_9">
                <div className="v14_10"></div><span className="v14_11">Delete</span>
            </div>
                    <div>
                        <span className="v12_342">Name : </span><div className="v12_343" name = "name" >{menuItem.name}</div>
                        <span className="v12_351">Price :</span><div className="v12_352" name = "price" >{menuItem.price}</div>
                        <span className="v12_364">Description :</span>
                        <input className="v12_365" type='text' name='option' onChange={(e) => setDescription(e.target.value)} />
                        <span className="v12_366">Amount :</span>
                        <input className="v12_367" type='number' name='amount' onChange={(e) => setAmount(e.target.value)} />
                    </div>
        </div>
    )
}


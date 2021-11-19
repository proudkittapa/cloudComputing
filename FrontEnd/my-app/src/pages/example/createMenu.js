import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom";
import {createPost, getMenu } from '../actions/posts'
// import PostList from '../components/PostList'
export default CreateMenu

function CreateMenu() {

    const [menu, setMenu] = useState({})
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [itemName, setItemName] = useState("")
    const [amount, setAmount] = useState("")
    const [available, setAvailable] = useState(false)



    const addClick = async (e) => {
        try {
            e.preventDefault()
            const tempIngredients ={item_name:itemName, amount: +amount}
            const temp = {...menu, price:+menu.price, category:[...categories, category], ingredient:[...ingredients, tempIngredients], available:available}
            const response = await createPost(temp)
            console.log(response)
            

            if (response.status === 201) {
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


    const handleChangeInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setMenu((oldValue) => ({ ...oldValue, [name]: value }))

    }
    const handleChangeCategoryInput = (e) =>{

        e.preventDefault()
        let test = [...categories, category]
        setCategories(test)
        setCategory("")
    }

    const handleChangeIngredientInput = (e) =>{
        e.preventDefault()
        const tempIngredientObject = {item_name: itemName, amount: +amount}
        let test2 = [...ingredients, tempIngredientObject]
        setIngredients(test2)
        setAmount("")
        setItemName("")
    }
   


    // console.log(category)
    return(
        <div className="v1_3">

        <form className="form">
            <span className="v6_276">Name : </span>
                <input className="v6_277" type='text' name='name' onChange={handleChangeInput} />
                <span className="v6_278">Category :</span>
                
            
            {categories.length>0 && categories.map((categoryItem, index) => {
                return (
                    <div key = {index} className="category"  disabled>
                        <input className="v6_279" type='text' name='category' defaultValue={categoryItem}/>
                    </div>
                )
            })}

            <div className="category" id="category1">
                {/* <input className="v6_279" type='text' name='category'  onChange={(e) => setCategory(e.target.value)} value={category}/> */}
                <input className="v6_279" type='text' name='category'  onChange={(e) => setCategory(e.target.value)} value={category}/>
                <button className="v6_295" onClick={handleChangeCategoryInput}></button >
            </div>
          
            
            <div className="addname"> 
            {ingredients.length>0 && ingredients.map((ingredientItem, index) =>{
                console.log("ingredient item", ingredientItem.amount)
                return (
                    <div key={index} className="ingredientAdd" >
                        <span className="v6_283">Name :</span>
                        <input className="v6_282" type='text' defaultValue={ingredientItem.item_name}/>
                        <span className="v6_284">Amount :</span>
                        <input className="v6_285" type='number' defaultValue={ingredientItem.amount} />
                    </div>
                )
            }

            )}
            </div>


            <div className="ingredient" id="ingredient">  
                <span className="v6_281">Ingredient :</span>
                <span className="v6_283">Name :</span>
                <input className="v6_282" type='text' name='item_name' onChange={(e) => setItemName(e.target.value)} value={itemName} />
                <span className="v6_284">Amount :</span>
                <input className="v6_285" type='number' name='amount'  onChange={(e) => setAmount(e.target.value)} value={amount}/>
                <button className="v6_296" onClick={handleChangeIngredientInput}> </button>
            </div>

           

            <span className="v6_286">Price :</span>
                <input className="v6_287" type='number' name='price' onChange={handleChangeInput} /*required="true"*//>
            <span className="v6_288">Available :</span>
                <input className="v6_289" type='checkbox' name='available' onChange={(e) => setAvailable(e.currentTarget.checked)} />
            <button className="v6_192" onClick={addClick}>  
                {<Link to="/homepage"><span className="v6_194">Create Menu</span></Link>}
            </button>

            </form >

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
           
        </div>
    )
}
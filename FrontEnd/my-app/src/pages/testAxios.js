import React from 'react';
import axios from 'axios'


function TestAxios() {
    const getdata = document.getElementById('data');
    const getId = document.getElementById('id');
    const getAvailable= document.getElementById('available');
    const getCategory = document.getElementById('category');
    const getIngredients = document.getElementById('ingredient');
    const getName = document.getElementById('name');
    const getPrice = document.getElementById('price');


    axios.get("http://127.0.0.1:8080/pos/menu/c3e2obiciaeng9b27p3g").then(res => {
        alert(res.data.data.id);
        console.log(res.data.data);
        console.log(res.data.data.id);

        getId.innerHTML = res.data.data.id;
        getName.innerHTML = res.data.data.name;
        getCategory.innerHTML = res.data.data.category;
        getIngredients.innerHTML = res.data.data.ingredient;
        getPrice.innerHTML = res.data.data.getPrice;
        getAvailable.innerHTML = res.data.data.avalable;
    });


        return(
            <div>
                <h2 id="id"></h2>
                <h2 id="name"></h2>

            </div>
        )
        }
export default TestAxios

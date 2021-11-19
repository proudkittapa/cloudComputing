import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { report, reportSale, reportStock } from '../actions/posts'
// import PostList from '../components/PostList'
export default Report

function Report() {

    const [format, setFormat] = useState("excel")
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState("")
    const [field, setField] = useState("name")
    const [order, setOrder] = useState("ascending")


    function todayDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 

        var date = yyyy+'-'+mm+'-'+dd
        return date
    }

    function firstDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear()-1;
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 

        var date = yyyy+'-'+mm+'-'+dd
        return date
    }

    const getReportStock = async (e) => {
        try {
            e.preventDefault()

            if (format === "Excel"){
                setFormat("excel")
            }
            else if (format === "CSV"){
                setFormat("csv")
            }
            if (order === "Ascending"){
                setOrder("ascending")
            }
            else if(order === "Descending"){
                setOrder("descending")
            }
            const data = {format:format, field: field, order: order}

            console.log("data", data)

            const response = await reportStock(data)
            console.log(response)
            
            if (response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                if (format === "excel"){
                    link.setAttribute('download', 'reposrtStock.xlsx');
                }
                else{
                    link.setAttribute('download', 'reportStock.csv');
                }
                
                document.body.appendChild(link);
                link.click();
            }
            
            
        } catch (error) {
            // if (error.status === 422){
            //     alert("422")
            // }
            alert(error)
        }
      }

      const getReport = async (e) => {
        try {
            e.preventDefault()
            if (format === "Excel"){
                setFormat("excel")
            }
            else if (format === "CSV"){
                setFormat("csv")
            }
            if (order === "Ascending"){
                setOrder("ascending")
            }
            else if(order === "Descending"){
                setOrder("descending")
            }
            const startDateUnix = new Date(startDate).getTime()/1000;
            const untilDateUnix = new Date(endDate).getTime()/1000;
            const data = {from: startDateUnix, until: untilDateUnix, format:format, field: field, order: order}

            console.log("data", data)
            if (startDate === "" || endDate === ""){
                alert("Please enter start and until date")
            }
            else{
                const response = await report(data)
                console.log(response)
                

                if (response.status === 200) {
                    
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                if (format === "excel"){
                    link.setAttribute('download', 'reposrtStock.xlsx');
                }
                else{
                    link.setAttribute('download', 'reportStock.csv');
                }
                
                document.body.appendChild(link);
                link.click();
                  
                }
            }
            
        } catch (error) {
            // if (error.status === 422){
            //     alert("422")
            // }
            alert(error)
        }
      }

      const getReportSale = async (e) => {
        if (format === "Excel"){
            setFormat("excel")
        }
        else if (format === "CSV"){
            setFormat("csv")
        }
        if (order === "Ascending"){
            setOrder("ascending")
        }
        else if(order === "Descending"){
            setOrder("descending")
        }
        try {
            e.preventDefault()
            const startDateUnix = new Date(startDate).getTime()/1000;
            const untilDateUnix = new Date(endDate).getTime()/1000;
            const data = {from: startDateUnix, until: untilDateUnix, format:format, field: field, order: order}

            console.log("data", data)
            if (startDate === "" || endDate === ""){
                alert("Please enter start and until date")
            }
            else{
                const response = await reportSale(data)
                console.log(response)
                

                if (response.status === 200) {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                if (format === "excel"){
                    link.setAttribute('download', 'reposrtStock.xlsx');
                }
                else{
                    link.setAttribute('download', 'reportStock.csv');
                }
                
                document.body.appendChild(link);
                link.click();         
                }
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
           
            <span className="genReport">General / Sale Report </span>
            <span className="format">Format : </span>
            <select className="formatInput" type='text' name='format' onChange={(e) => setFormat(e.target.value)}>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
            </select>

            <span className="from">Start Date : </span>
            <input className="frominput" type="date" id="start" name="trip-start"
                    min={firstDate()} max={todayDate() } onChange={(e) => setStartDate(e.target.value)}/>

            <span className="until">Until Date : </span>
            <input className="untilinput" type="date" id="start" name="trip-start"
                    min={firstDate()} max={todayDate()} onChange={(e) => setEndDate(e.target.value)}/>

            <span className="stockReport">Stock Report </span>

            <span className="field">Field : </span>
            <select className="fieldInput" type='text' name='field' onChange={(e) => setField(e.target.value)}>
                <option value="name">Name</option>
                <option value="amount">Amount</option>
                <option value="importDate">Import Date</option>
                <option value="expireDate">Expire Date</option>
            </select>

            <span className="order">Ordering : </span>
            <select className="orderInput" type='text' name='order' onChange={(e) => setOrder(e.target.value)}>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>

            <div class="v18_47">
                <div class="v18_52"></div>
                <span class="v18_53">General Report</span>
                <button class="v18_188" onClick={getReport}>
                    <span class="v18_190">Download</span>
                </button>
            </div>
        
            <div class="v18_194">
                <div class="v18_195"></div>
                <span class="v18_196">Sale Report</span>
                <button class="v18_198" onClick={getReportSale}>
                    <span class="v18_199">Download</span>
                </button>
            </div>
       
            <div class="v18_203">
                <div class="v18_204"></div>
                <span class="v18_205">Stock Report</span>
                <button class="v18_207" onClick={getReportStock}>
                    {<Link to= "/homepage"><span class="v18_208">Download</span></Link>}
                </button>
            </div>
            
        </div>
    )
}

import axios from 'axios'
import {data} from '../pages/showMenu'

export const createPost = (data) => axios.post("http://127.0.0.1:8080/pos/menu", data)
export const getAllMenu = (limit,page) => axios.get(`http://127.0.0.1:8080/pos/menu?limit=${limit}&page=${page}`)
export const putMenu = (data) => axios.put("http://127.0.0.1:8080/pos/menu", data)
export const addToCart = (id, data) => axios.put(`http://127.0.0.1:8081/pos/cart/${id}`, data)
export const getEachMenu = (id) => axios.get(`http://127.0.0.1:8080/pos/menu/${id}`)
export const getCart = (id) => axios.get(`http://127.0.0.1:8080/pos/cart/${id}`)
export const FinishCart = (id,data) => axios.post(`http://127.0.0.1:8080/pos/cart/${id}/finish`, data)
export const getAllOrder = () => axios.get("http://127.0.0.1:8082/pos/product/transaction")
export const reportStock = (data) => axios.post("http://127.0.0.1:8082/pos/product/reportStock", data, {responseType: 'arraybuffer'})
export const report = (data) => axios.post("http://127.0.0.1:8082/pos/product/report", data, {responseType: 'arraybuffer'})
export const reportSale = (data) => axios.post("http://127.0.0.1:8082/pos/product/reportSale", data, {responseType: 'arraybuffer'})
export const getEachOrder = (id) => axios.get(`http://127.0.0.1:8082/pos/product/transaction/${id}`)
export const getAllMoney = () => axios.get("http://127.0.0.1:8082/pos/product/money")
export const getMoney = (id) => axios.get(`http://127.0.0.1:8082/pos/product/money/${id}`)
export const deleteMoney = (id) => axios.delete(`http://127.0.0.1:8082/pos/product/money/${id}`)
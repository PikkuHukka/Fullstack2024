import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const get = (capital) => {
    console.log(baseUrl + capital + '&appid=' + api_key)
    return axios.get(baseUrl + capital + '&appid=' + api_key)
}



export default {
    get : get
}
import axios from 'axios';


const service = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'seu-valor-customizado'
    }
})


export default service
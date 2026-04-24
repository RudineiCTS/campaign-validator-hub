import axios from 'axios';

const serviceTest = axios.create({
    baseURL: 'https://github.com/RudineiCTS/campaign-validator-hub/blob/main/src/test/campanhas.json',
    headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'seu-valor-customizado'
    }
})


export default serviceTest
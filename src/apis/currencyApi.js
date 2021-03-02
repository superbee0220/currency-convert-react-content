import axios from 'axios';

export default axios.create({
    baseURL: 'https://free.currconv.com/api/v7/',
    params: {
        apiKey: 'fe1b1ee27be181e858a0'
        // apiKey: 'fe542cb64ed1dbeb808a'
        // apiKey: '5aaa9968cef56716b765'
    }
})



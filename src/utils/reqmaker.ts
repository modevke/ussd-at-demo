import axios from 'axios';

const url = 'http://ec2-3-83-118-207.compute-1.amazonaws.com/graphql';

interface Reqmaker{
    operation: 'query' | 'mutation', 
    operation_name: string, 
    operation_params: Object,
    operation_returns: Array<string>,
    headers?: Object
}

function reqmaker({ operation, operation_name, operation_params, operation_returns, headers = {} }){
     
    return new Promise( (resolve, reject) => {

        let data = '', param_string = ''

        for (const [key, value] of Object.entries(operation_params)) {
            param_string += `${key}: "${value}", `;
        }


        if(operation === 'query'){
            data = `query{
                ${operation_name}(${param_string}){
                    ${operation_returns.join(", ")}
                }
            }`
        } else if(operation === 'mutation'){
            data = `mutation{
                ${operation_name}(${param_string}){
                    ${operation_returns.join(", ")}
                }
            }`
        }

        axios({
            url: url,
            method: 'POST',
            headers: headers,
            data: JSON.stringify({ query: data })
        }).then((response) => {
            console.log(response.status);
            resolve(response.data)
        }).catch((error) => {
            if(error.response){
                console.log(error.response.status);
                reject(error.response.data);
            } else if(error.request){
                console.log('Server conection failed');
                reject();
            } else {
                console.log('Error', error.message);
                reject();
            }
        });
    })
}


reqmaker({
    operation: 'query',
    operation_name: 'getCustomerThirdPartyMotor',
    operation_params: {
        countryCode: 'NG_T',
        phoneNumber: '+2347089512036'
    },
    operation_returns: ['policy_number', 'premium_amount', 'policy_status', 'vehicle_make'],
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJpYXQiOjE2MTcwOTQ4NTAsImV4cCI6MTYxNzY5OTY1MH0.MtiLd6vDIhJD1Iy2zPAR7gUGGLHm7R9DrWNJz2MdqK0'
    }
}).then(res => {
    console.log('Response is', res);
    
}).catch(err => {
    console.log('Error is', err);  
})
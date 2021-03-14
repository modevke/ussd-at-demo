import express from "express"

import {menu} from '../modules/ussd/menu-builder'

const sessions = []

export class UssdController{
    static async callback(req: express.Request, res: express.Response){

        console.log("CALLBACK BODY", req.body);

        try{
            menu.run(req.body, ussdResult => {
                res.send(ussdResult);
            });
        } catch(e){
            menu.go('Error');
            console.log('Menu error: ', e);
            
        }
    }
    static async events(req: express.Request, res: express.Response){
        console.log("EVENTS BODY", req.body);
        res.send({ code: "000" });
    }
}



// console.log("CALLBACK BODY", req.body);
        
// // {
// //     phoneNumber: '+254713730377',
// //     serviceCode: '*384*22780#',
// //     text: '4232',
// //     sessionId: 'ATUid_ed8ae8307ac7c68e09a2d3afabfd0657',
// //     networkCode: '99999'
// //   }
// const {phoneNumber, serviceCode, text, sessionId,networkCode} = req.body

// const session = sessions.findIndex((el) => el.id === sessionId)
// console.log("SESSION", session);

// let count,sessId
// if(session === -1){
//     sessions.push({
//         id: sessionId,
//         count: 0,
//     })
//     count = 0
//     sessId = 0
// } else {
//     count = sessions[session].count;
//     sessId = session;
//     console.log("CURRENT COUNT", count);
    
// }


// let response;

// if(text === '' && count === 0){
//     response = `CON Welcome to Old Mutual Nigeri Abimbola Kareem, please enter your secret 4 digit PIN code.`
// }else if( text === '' && count > 0 ){
//     response = 'END Input required'
// } else if( text !== '' && count >= 0 ){
//     const textArr = text.split("*")
//     const textlen = textArr.length
    
//     console.log('TEXT ARR', textArr);
//     console.log('TEXT LEN', textlen);

//     switch (textlen) {
//         case 1:
//             const pin = textArr[0]
//             console.log("VALIDATE PIN ", pin);

//             // TODO VALIDATE USER

//             response = 'CON 1. insure with us\n 2. invest with us\n3. View My Portfolio'
//             break;
//         case 2:
//             const mainMenuRes = textArr[1]
//             if(mainMenuRes === ''){
//                 response = 'END Input required'
//             } else {
//                 if(Number(mainMenuRes) === 3){
//                     response = 'CON 1. View My General Insurance Products\n 2. View My Life Insurance Products\n 3. View My Savings Products\n 0. Main Menu'
//                 }
//             }
            
//             break;
    
//         default:
//             response = 'END Network Error try again'
//             break;
//     }

   

// }

// setTimeout(() => {
//     sessions[sessId].count++
//     res.send(response);
//     res.end()

// }, 2000)
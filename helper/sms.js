const Nexmo = require('nexmo')

const nexmo = new Nexmo({
    apiKey: '333f5a68',
    apiSecret: 'W2rEiXXYQtaw3Y6m',
  });
  module.exports = nexmo.message;




  

// const from = 'Vonage APIs';
// const to = '972599192995';
// const text = 'Hello from Vonage SMS API';

//  nexmo.message.sendSms(from, to, text);

// nexmo.message.sendSms(from, to, text, (err, responseData) => {
//     if (err) {
//         console.log(err);
//     } else {
//         if(responseData.messages[0]['status'] === "0") {
//             console.log("Message sent successfully.");
//         } else {
//             console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
//         }
//     }
// })
// const Nexmo = require('nexmo');


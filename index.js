const https = require('https');

const TELEGRAM_TOKEN = '7410600441:AAEVi-ZprdaukcRdHp0nx6vYI9aa_fMBwic'
const CHATID = '390588081'
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzcRUaKySaeYh_SGYb3pnL4dhRrHTzq-hnOaAd_lRR8TKwwFtf7sLv8EmP-Fjot465uKQ/exec'; // Замініть на URL вашого Google Apps Script веб-додатку
const LAMBDA_WEBHOOK_URL = 'https://zaii5o5q6f.execute-api.us-east-1.amazonaws.com/webhook'

exports.handler = async (event) => {
    const botMessage = "Hello, this is the bot from telegram";

    const sendText = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${CHATID}&parse_mode=HTML&text=${encodeURIComponent(botMessage)}`;

    const response = await new Promise((resolve, reject) => {
        https.get(sendText, (res) => {
            let data = '';

            // A chunk of data has been received.
            res.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received.
            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (e) => {
            reject(e);
        });
    });

    console.log(response);

    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!')
    };
};
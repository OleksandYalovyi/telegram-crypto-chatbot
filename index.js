const https = require('https');

const TELEGRAM_TOKEN = '7410600441:AAEVi-ZprdaukcRdHp0nx6vYI9aa_fMBwic'
const CHATID = '390588081'
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzcRUaKySaeYh_SGYb3pnL4dhRrHTzq-hnOaAd_lRR8TKwwFtf7sLv8EmP-Fjot465uKQ/exec'; // Замініть на URL вашого Google Apps Script веб-додатку
const LAMBDA_WEBHOOK_URL = 'https://zaii5o5q6f.execute-api.us-east-1.amazonaws.com/webhook'

exports.handler = async (event) => {
    const requestBody = JSON.parse(event.body);

    const requestMsg = requestBody.message;

    const chatId = requestMsg.chat.id;

    let command = requestMsg.text.trim();

    if (command.startsWith('/')) {
        command = command.substring(1);
    }

    let message;

    // Визначаємо відповідь залежно від команди
    if (command === 'start') {
        message = "Welcome to my bot! How can I help you today?"; // Відповідь на команду /start
    } else if (command === 'help') {
        message = "Here are the available commands: /start, /help"; // Відповідь на команду /help
    } else {
        message = "I'm sorry, I didn't understand that command. Please try again."; // Відповідь на невідому команду
    }

    // Формуємо URL для запиту до Telegram API
    const sendText = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${encodeURIComponent(message)}`;


    const response = await new Promise((resolve, reject) => {
        https.get(sendText, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (e) => {
            reject(e);
        });
    });

    console.log(sendText);
    console.log(response);

    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!')
    };
};
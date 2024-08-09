const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const TELEGRAM_TOKEN = '7410600441:AAEVi-ZprdaukcRdHp0nx6vYI9aa_fMBwic';
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzcRUaKySaeYh_SGYb3pnL4dhRrHTzq-hnOaAd_lRR8TKwwFtf7sLv8EmP-Fjot465uKQ/exec'; // Замініть на URL вашого Google Apps Script веб-додатку
const LAMBDA_WEBHOOK_URL = 'https://zaii5o5q6f.execute-api.us-east-1.amazonaws.com/webhook'

const bot = new TelegramBot(TELEGRAM_TOKEN);

bot.setWebHook(`${LAMBDA_WEBHOOK_URL}/bot${TELEGRAM_TOKEN}`);

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Відправка повідомлення у відповідь
    bot.sendMessage(chatId, `Ви сказали: ${text}`);
});

// AWS Lambda handler
exports.handler = async (event) => {
    const body = JSON.parse(event.body);

    // Обробка оновлення від Telegram
    bot.processUpdate(body);

    // if (body.message && body.message.text === '/get-analytics') {
    //     const chatId = body.message.chat.id;
    //
    //     try {
    //         const response = await axios.post(GOOGLE_SCRIPT_URL, { key: 'value' });
    //         console.log('res', response)
    //
    //         if (response.status === 200) {
    //             await bot.sendMessage(chatId, `Success ${response.toString()}`);
    //         } else {
    //             await bot.sendMessage(chatId, `Error ${response.toString()}`);
    //         }
    //     } catch (error) {
    //         console.error('Error sending request to Google Apps Script:', error);
    //         await bot.sendMessage(chatId, 'Сталася помилка при отриманні аналітики');
    //     }
    // }
    //
    // if (body.message && body.message.text === '/test') {
    //     const chatId = body.message.chat.id;
    //
    //     try {
    //         console.log('test response')
    //
    //         await bot.sendMessage(chatId, `Success response`);
    //
    //     } catch (error) {
    //         console.error('Error sending request to Google Apps Script:', error);
    //         await bot.sendMessage(chatId, 'Сталася помилка при отриманні аналітики');
    //     }
    // }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Запит оброблено' }),
    };
};
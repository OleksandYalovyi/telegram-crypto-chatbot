const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Введіть ваші значення
const TELEGRAM_TOKEN = '7410600441:AAEVi-ZprdaukcRdHp0nx6vYI9aa_fMBwic'; // Замініть на ваш Telegram бот токен
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzcRUaKySaeYh_SGYb3pnL4dhRrHTzq-hnOaAd_lRR8TKwwFtf7sLv8EmP-Fjot465uKQ/exec'; // Замініть на URL вашого Google Apps Script веб-додатку

// Ініціалізація бота в "polling" режимі (для локального тестування)
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// AWS Lambda handler
exports.handler = async (event) => {
    const body = JSON.parse(event.body);

    if (body.message && body.message.text === '/get-analytics') {
        const chatId = body.message.chat.id;

        try {
            const response = await axios.post(GOOGLE_SCRIPT_URL, { key: 'value' });
            console.log('res', response)

            if (response.status === 200) {
                await bot.sendMessage(chatId, `Success ${response.toString()}`);
            } else {
                await bot.sendMessage(chatId, `Error ${response.toString()}`);
            }
        } catch (error) {
            console.error('Error sending request to Google Apps Script:', error);
            await bot.sendMessage(chatId, 'Сталася помилка при отриманні аналітики');
        }
    }

    if (body.message && body.message.text === '/test') {
        const chatId = body.message.chat.id;

        try {
            console.log('test response')

            await bot.sendMessage(chatId, `Success response`);

        } catch (error) {
            console.error('Error sending request to Google Apps Script:', error);
            await bot.sendMessage(chatId, 'Сталася помилка при отриманні аналітики');
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Запит оброблено' }),
    };
};
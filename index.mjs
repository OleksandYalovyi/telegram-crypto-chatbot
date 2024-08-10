import axios from 'axios';

const sendMsgToBot = async (msg, chatId) =>{
    const sendText = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${encodeURIComponent(msg)}`;
    return await axios.get(sendText);
}

export const handler = async (event) => {
    // const requestBody = JSON.parse(event.body);

    // const requestMsg = requestBody.message;

    // const chatId = requestMsg.chat.id;

    // let command = requestMsg.text.trim();

    // if (command.startsWith('/')) {
    //     command = command.substring(1);
    // }

    // let message;

    // if (command === 'start') {
    //     message = "Welcome to my bot! How can I help you today?";
    // } else if (command === 'help') {
    //     message = "Here are the available commands: /start, /help, /send_stats";
    // } else if (command === 'send_stats') {
    //     try{
    //         await sendMsgToBot("Try to send analytics to your email", chatId)
    //         await axios.post(process.env.GOOGLE_SCRIPT_URL);
    //         message = "Check your email";
    //     } catch(e) {
    //         console.error('error', e);
    //         await sendMsgToBot("Something went wrong", chatId)
    //     }
    // } else {
    //     message = "I'm sorry, I didn't understand that command. Please try again.";
    // }

    // const response = await sendMsgToBot(message, chatId)

    // console.log('success response', response);

    await sendMsgToBot("I will send it every 12 hours", process.env.CHAT_ID)


    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!')
    };
};


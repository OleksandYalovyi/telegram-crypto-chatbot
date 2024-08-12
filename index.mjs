import axios from 'axios';

const sendMsgToBot = async (msg, chatId) =>{
    const sendText = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${encodeURIComponent(msg)}`;
    return await axios.get(sendText);
}

export const handler = async (event) => {
    const res = await axios.get('https://rest.coinapi.io/v1/exchangerate/USD/PLN?apikey=044008B4-27A0-437E-8F26-842F42A4CFE9')

    const rate = Number(res.data.rate)
    console.log('res', res)
    console.log('rate', rate)

    if (rate > 3.97) {
        await sendMsgToBot(`Coin api PLN rate = ${rate}!!! It's time to sell!`, process.env.CHAT_ID)
    }


    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!')
    };
};


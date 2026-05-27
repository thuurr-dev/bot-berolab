import wpp from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

import { getPuppeteerConfig } from "./get-puppeteer-config.js";
import { askGPT } from "./gpt.js";

const localAuthConfiguration = {
    dataPath: "../wpp1"
};

const puppeteerConfig = getPuppeteerConfig();

const wppClientConfiguration = {
    authStrategy: new wpp.LocalAuth(localAuthConfiguration),
    puppeteer: puppeteerConfig
};

const client = new wpp.Client(wppClientConfiguration);

client.on("qr", function (qr) {
    qrcode.generate(qr, { small: true });
});

client.on("ready", function () {
    console.log("Bot conectado!");
})

//se usa async porque é uma promessa
client.on("message", async function (message) {
    //ler a mensagem utilizando o chatgpt
    //ler o prompt com todas as informações que meu bot vai usar para responder
    //gera uma resposta utilizando o chatgpt
    //responder meu usuario

    //meu bot ---> servidor do whatsapp ---> chat --> msgs
    //chamado como promessa
    //promise -> [ {from, body, timestamp} ]
    const chat = await message.getChat(); //e await porque é uma promessa, tem que esperar a resposta do servidor do whatsapp
    
    const messages = await chat.fetchMessages({ limit: 10 });

    const formatedMessage = messages.map(function (item) {
        return {
            from: item.from,
            body: item.body,
            timestamp: item.timestamp
        }
    })

    const res = await askGPT(JSON.stringify(formatedMessage));

    message.reply(res);
});

console.log("Bot inicializado...");
client.initialize();
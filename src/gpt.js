import { config } from "./config.js";
import fs from "fs"; //ler arquivos

export async function askGPT(message) {
    const prompt = await fs.promises.readFile("./prompt.txt");

    const messages = [{
        role: 'system',
        content: prompt.toString()
    },
    {
        role: 'user',
        content: message
    }]
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.openai.key
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages,
            temperature: 0.7
        })
    })

    const data = await response.json();

    const content = data.choices[0].message.content;

    return content;
}
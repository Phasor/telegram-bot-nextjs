const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
import { NextResponse } from 'next/server'
import OpenAI from "openai";


const openai = new OpenAI({ apiKey:process.env.OPEN_AI_API_KEY});
const bot = new Telegraf(process.env.BOT_TOKEN)

// Function to get a response from OpenAI
async function getAIResponse(query) {
  const completion = await openai.chat.completions.create({
    messages: [
      {"role": "system", "content": "You are a helpful assistant." },
      {"role": "user", "content": query},
    ],
      model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content
}

// export async function POST(request) {
//   const data = await request.json()
//   console.log(data)
//   // const message = data.message.text
//   //const reply = await getAIResponse(message)
//   //console.log(reply.message.content)
//   return NextResponse.json({message: "success"})
// }

// Named export for the POST method
export async function POST(request) {
  try {
    const data = await request.json();
    // console.log(`data:${data}`)
    const chatId = data.message.chat.id; // Get the chat ID from the incoming Telegram message
    const text = data.message.text; // Get the text of the message
    // console.log(`user query: ${text}`)
    const replyText = await getAIResponse(text); // Get the AI response
    // console.log(`replyText: ${replyText}`)

    // Using Telegraf to send a message back to the Telegram chat
    await bot.telegram.sendMessage(chatId, replyText);

    // Return a success message as HTTP response
    return NextResponse.json({ message: "success" }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

/*

Telegram webhook response 

{
  update_id: 45294786,
  message: {
    message_id: 14,
    from: {
      id: 900885905,
      is_bot: false,
      first_name: 'Phas0ruk',
      username: 'phas0ruk',
      language_code: 'en'
    },
    chat: {
      id: 900885905,
      first_name: 'Phas0ruk',
      username: 'phas0ruk',
      type: 'private'
    },
    date: 1701274414,
    text: 'are you alive?'
  }
}

*/
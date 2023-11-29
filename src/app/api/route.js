const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')

const bot = new Telegraf(process.env.BOT_TOKEN)

// bot.on(message('text'), async (ctx) => {
//     // Explicit usage
//     let chatID = ctx.message.chat.id
//     let message = ctx.message.text
//     console.log(message)
//     await ctx.telegram.sendMessage(chatID, `Hello ${ctx.message.from.first_name}`)
//     //console.log(ctx)
  
//     // Using context shortcut
//     //await ctx.reply(`Hello ${ctx.state.role}`)
//   })

// adding for updating webhook url

export async function GET() {
    return Response.json({ reply:"Hi from the api. You sent a get request" })
  }

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // await bot.handleUpdate(req.body);  // Process the update
      console.log(req.body)
      res.status(200).send('Got it. You sent a post request.');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}

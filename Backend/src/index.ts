import { Telegraf } from 'telegraf';

import { about, Bots, host, Social, Trainging, website } from './commands';
import { greeting, servicing } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import { Markup } from 'telegraf';
require('dotenv').config();
const BOT_TOKEN = process.env.TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(BOT_TOKEN);


const webLink = '';
const channelId = '@babyloncenter_net'; // Replace with your channel username or ID



bot.start((ctx) =>
  ctx.reply('اهلا وسهلا بكم في شركة الحر!', {
    reply_markup: {
      keyboard: [[{ text: 'اضغط هنا لفتح قائمة المواد', web_app: { url: webLink } }]],
    },
  })
);
// bot.start((ctx) =>
//   ctx.replyWithHTML('اهلا وسهلا بكم في شركة الحر!', {
//     reply_markup: {
//       inline_keyboard: [
//         [{ text: 'اضغط هنا لفتح قائمة المواد', web_app: { url: webLink } }
//       ],
//     ],
//     },
//   })
// );


// bot.start((ctx) => {
//   ctx.reply('اهلا وسهلا بكم في شركة الحرة العراقية!', {
//       reply_markup: {
//         inline_keyboard: [
            
              
//               /* Also, we can have URL buttons. */
//               [ { text: 'اضغط هنا لفتح قائمة المواد', web_app: { url: webLink } } ]
//           ]
//       }
//   });
// })









// bot.start((ctx) => {
//   const welcomeMessage = 'اهلا وسهلا بكم في شركة الحر!';
//   const buttonText = 'اضغط هنا لفتح قائمة المواد';

//   const fullMessage = `${welcomeMessage}\n\n${buttonText}`;

//   return ctx.reply(fullMessage, {
//     reply_markup: Markup.inlineKeyboard([
//       [Markup.button.url(buttonText, webLink)],
//     ]).extra(),
//     parse_mode: 'Markdown',
//   });
// });


// bot.start((ctx) => {
//   const message = 'اهلا وسهلا بكم في مطعمكم!';
//   const buttonText = 'اضغط هنا لفتح قائمة الطعام';
//   const fullMessage = `${message}\n\n${buttonText} (${webLink})`;

//   return ctx.reply(fullMessage, {
//     parse_mode: 'Markdown',
//   });
// });


// bot.start((ctx) => {
//   const message = 'اهلا وسهلا بكم في <b>مطعمكم</b>!';
//   const inlineKeyboard = Markup.inlineKeyboard([
//     Markup.button.url('اضغط هنا لفتح <i>قائمة الطعام</i>', webLink),
//   ]);

//   return ctx.replyWithHTML(message, { reply_markup: inlineKeyboard });
// });



let shouldSendChannelMessage = true;  // Set this flag based on your condition


bot.on('message', async (ctx) => {
  try {
    // Use 'any' type to avoid TypeScript errors
    const receivedData = JSON.parse((ctx.message as any).web_app_data.data);

    const cartItems = receivedData.cartItems;
    const phoneNumber = receivedData.phoneNumber;
    const address = receivedData.address;
    const notice = receivedData.notice;
    const totalPrice = receivedData.totalPrice;
    const totalItems = receivedData.totalItems// Add total count
    const storeName = receivedData.storeName

    // Create an array to store the details of each item
  //   const orderDetails = [];

  //   for (const item of cartItems) {
  //     const title = item.title;
  //     const price = item.price;
  //     const quantity = item.quantity;
  //     const description = item.description

  

  //   // Join the array elements into a single string
  //   orderDetails.push(`- المادة: ${title}\n  التفاصيل: ${description}\n  السعر: ${price}\n  العدد: ${quantity}\n`);
  // }
  const orderDetails = [];

for (const item of cartItems) {
  const title = item.title;
  const price = item.price;
  const quantity = item.quantity;
  const description = item.description;
  
  // Calculate the total price for the current item
  const totalItemPrice = price * quantity;

  // Join the array elements into a single string
  orderDetails.push(`- المادة: ${title}\n  التفاصيل: ${description}\n  السعر: ${price}\n  العدد: ${quantity}\n  السعر الإجمالي: ${totalItemPrice}\n`);
}

  // Join the array elements into a single string
  const orderMessage = orderDetails.join('\n');

  // Send the order message
  ctx.replyWithMarkdown(
    `**${ctx.from.first_name}**\n` +
    `تم ارسال الطلب التالي:\n\n` +
    `${orderMessage}\n` +
    `**المجموع:د.ع. ${totalPrice.toFixed(2)}**\n` +
    `**مجموع المواد :** ${totalItems}\n` +
    `**اسم المحل:** ${storeName}\n` +
    `**رقم الهاتف:** ${phoneNumber}\n` +
    `**العنوان:** ${address}\n` +
    `**الملاحظات:** ${notice}`
  );

  // Prepare a message for the channel
  const channelMessage = `تم استلام طلب جديد:\n` +
    `**${ctx.from.first_name}**\n\n` +
    `${orderMessage}\n` +
    `**المجموع: د ${totalPrice.toFixed(2)}**\n` +
    `**مجموع المواد :** ${totalItems}\n` +
    `**اسم المحل:** ${storeName}\n` +
    `**رقم الهاتف:** ${phoneNumber}\n` +
    `**العنوان:** ${address}\n` +
    `**الملاحظات:** ${notice}`;

    // Log and send the message to the channel
    if (shouldSendChannelMessage) {
      console.log('Sending message to channel:', channelMessage);
      try {
        const result = await bot.telegram.sendMessage(channelId, channelMessage, { parse_mode: 'Markdown' });
        console.log('Telegram API result:', result);
      } catch (error) {
        console.error('Telegram API error:', error);
      }
    }
  } catch (error) {
    console.error('Error parsing received data:', error);
  }
});



//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};

//dev mode
ENVIRONMENT !== 'production' && development(bot);
export { bot };







// import { Telegraf } from 'telegraf';

// import { about, Bots, host, Social, Trainging, website } from './commands';
// import { greeting, servicing } from './text';
// import { VercelRequest, VercelResponse } from '@vercel/node';
// import { development, production } from './core';
// import { Markup } from 'telegraf';

// const BOT_TOKEN = process.env.TOKEN || '';
// const ENVIRONMENT = process.env.NODE_ENV || '';

// const bot = new Telegraf(BOT_TOKEN);

// const webLink = 'https://alhur.vercel.app/';
// const channelId = '@babyloncenter_net';

// // bot.start((ctx) =>
// //   ctx.replyWithHTML('اهلا وسهلا بكم في شركة الحر!', {
// //     reply_markup: {
// //       inline_keyboard: [
// //         [{ text: 'اضغط هنا لفتح قائمة المواد', web_app: { url: webLink } }]
// //       ],
// //     },
// //   })
// // );

// bot.start((ctx) =>
//   ctx.reply('اهلا وسهلا بكم في شركة الحر!', {
//     reply_markup: {
//       keyboard: [[{ text: 'اضغط هنا لفتح قائمة المواد', web_app: { url: webLink } }]],
//     },
//   })
// );

// let shouldSendChannelMessage = true;

// bot.on('message', async (ctx) => {
//   try {
//     // Use 'any' type to avoid TypeScript errors
//     const receivedData = JSON.parse((ctx.message as any).web_app_data.data);

//     const cartItems = receivedData.cartItems;
//     const phoneNumber = receivedData.phoneNumber;
//     const address = receivedData.address;
//     const notice = receivedData.notice;
//     const totalPrice = receivedData.totalPrice;
//     const storeName = receivedData.storeName

//     // Create an array to store the details of each item
//     const orderDetails = [];

//     // Add the table header
//     orderDetails.push('| المادة | التفاصيل | السعر | العدد |');

//     for (const item of cartItems) {
//       const title = item.title;
//       const price = item.price.toFixed(2);
//       const quantity = item.quantity;
//       const description = item.description;

//       // Add details to the array
//       orderDetails.push(`| ${title} | ${description} | ${price} | ${quantity} |`);
//     }

//     // Join the array elements into a single string
//     const orderTable = orderDetails.join('\n');

//     // Send the order message with the table
//     ctx.replyWithMarkdown(
//       `${ctx.from.first_name}\n` +
//       `تم ارسال الطلب التالي:\n` +
//       `${orderTable}\n` +
//       `- المجموع: د ${totalPrice.toFixed(2)}\n` +
//       `- اسم المحل: ${storeName}\n` +
//       `- رقم الهاتف: ${phoneNumber}\n` +
//       `- العنوان: ${address}\n` +
//       `- الملاحظات: ${notice}`
//     );

//     // Prepare a message for the channel
//    // ...

// // Prepare a message for the channel (without Markdown)
// const channelMessage = `تم استلام طلب جديد:\n` +
//   `${ctx.from.first_name}\n` +
//   `${orderTable}\n` +
//   `- المجموع: د ${totalPrice.toFixed(2)}\n` +
//   `- اسم المحل: ${storeName}\n` +
//   `- رقم الهاتف: ${phoneNumber}\n` +
//   `- العنوان: ${address}\n` +
//   `- الملاحظات: ${notice}`;

// // ...


//     // Log and send the message to the channel
//     if (shouldSendChannelMessage) {
//       console.log('Sending message to channel:', channelMessage);
//       try {
//         const result = await bot.telegram.sendMessage(channelId, channelMessage, { parse_mode: 'Markdown' });
//         console.log('Telegram API result:', result);
//       } catch (error) {
//         console.error('Telegram API error:', error);
//       }
//     }
//   } catch (error) {
//     console.error('Error parsing received data:', error);
//   }
// });

// export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
//   await production(req, res, bot);
// };

// ENVIRONMENT !== 'production' && development(bot);
// export { bot };







// import { Telegraf } from 'telegraf';
// import { VercelRequest, VercelResponse } from '@vercel/node';
// import { development, production } from './core';
// const PDFDocument = require('pdfkit');


// import * as fs from 'fs';


// const BOT_TOKEN = process.env.TOKEN || '';
// const ENVIRONMENT = process.env.NODE_ENV || '';

// const bot = new Telegraf(BOT_TOKEN);

// const webLink = 'https://alhur.vercel.app/';
// const channelId = '@babyloncenter_net';

// bot.start((ctx) =>
//   ctx.replyWithHTML('اهلا وسهلا بكم في شركة الحر!', {
//     reply_markup: {
//       inline_keyboard: [
//         [{ text: 'اضغط هنا لفتح قائمة المواد', web_app: { url: webLink } }]
//       ],
//     },
//   })
// );

// let shouldSendChannelMessage = true;

// bot.on('message', async (ctx) => {
//   try {
//     // Use 'any' type to avoid TypeScript errors
//     const receivedData = JSON.parse((ctx.message as any).web_app_data.data);

//     const cartItems = receivedData.cartItems;
//     const phoneNumber = receivedData.phoneNumber;
//     const address = receivedData.address;
//     const notice = receivedData.notice;
//     const totalPrice = receivedData.totalPrice;

//     // Create an array to store the details of each item
//     const orderDetails = [];

//     // Add the table header
//     orderDetails.push('| المادة | التفاصيل | السعر | العدد |');

//     for (const item of cartItems) {
//       const title = item.title;
//       const price = item.price.toFixed(2);
//       const quantity = item.quantity;
//       const description = item.description;

//       // Add details to the array
//       orderDetails.push(`| ${title} | ${description} | ${price} | ${quantity} |`);
//     }

//     // Join the array elements into a single string
//     const orderTable = orderDetails.join('\n');

//     // Generate receipt as a PDF
//     const pdfDoc = new PDFDocument();
//     const pdfFilePath = `receipt_${ctx.from.id}_${Date.now()}.pdf`;
//     pdfDoc.pipe(fs.createWriteStream(pdfFilePath));
    
//     pdfDoc
//       .fontSize(18)
//       .text(`تم ارسال الطلب التالي:`)
//       .fontSize(12)
//       .text(orderTable, { align: 'center' })
//       .text(`- المجموع: د ${totalPrice.toFixed(2)}`)
//       .text(`- رقم الهاتف: ${phoneNumber}`)
//       .text(`- العنوان: ${address}`)
//       .text(`- الملاحظات: ${notice}`)
//       .end();

//     // Send the order message with the PDF as a document
//     ctx.replyWithDocument({ source: pdfFilePath }, { caption: 'فاتورة الطلب' });
// console.log(pdfDoc)
//     // Prepare a message for the channel
//     const channelMessage = `تم استلام طلب جديد:\n` +
//       `${ctx.from.first_name}\n` +
//       `${orderTable}\n` +
//       `- المجموع: د ${totalPrice.toFixed(2)}\n` +
//       `- رقم الهاتف: ${phoneNumber}\n` +
//       `- العنوان: ${address}\n` +
//       `- الملاحظات: ${notice}`;

//     // Log and send the message to the channel
//     if (shouldSendChannelMessage) {
//       console.log('Sending message to channel:', channelMessage);
//       try {
//         const result = await bot.telegram.sendMessage(channelId, channelMessage, { parse_mode: 'Markdown' });
//         console.log('Telegram API result:', result);
//       } catch (error) {
//         console.error('Telegram API error:', error);
//       }
//     }

//     // Remove the generated PDF file
//     fs.unlinkSync(pdfFilePath);
//   } catch (error) {
//     console.error('Error parsing received data:', error);
//   }
// });

// export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
//   await production(req, res, bot);
// };

// ENVIRONMENT !== 'production' && development(bot);
// export { bot };


// import { Telegraf } from 'telegraf';
// import { VercelRequest, VercelResponse } from '@vercel/node';
// import { development, production } from './core';
// import { PDFDocument } from 'pdf-lib';
// import * as fs from 'fs';

// const BOT_TOKEN = process.env.TOKEN || '';
// const ENVIRONMENT = process.env.NODE_ENV || '';

// const bot = new Telegraf(BOT_TOKEN);

// const webLink = 'https://alhur.vercel.app/';
// const channelId = '@babyloncenter_net';

// bot.start((ctx) =>
//   ctx.replyWithHTML('اهلا وسهلا بكم في شركة الحر!', {
//     reply_markup: {
//       inline_keyboard: [
//         [{ text: 'اضغط هنا لفتح قائمة المواد', web_app: { url: webLink } }]
//       ],
//     },
//   })
// );

// let shouldSendChannelMessage = true;

// bot.on('message', async (ctx) => {
//   try {
//     // Use 'any' type to avoid TypeScript errors
//     const receivedData = JSON.parse((ctx.message as any).web_app_data.data);

//     const cartItems = receivedData.cartItems;
//     const phoneNumber = receivedData.phoneNumber;
//     const address = receivedData.address;
//     const notice = receivedData.notice;
//     const totalPrice = receivedData.totalPrice;

//     // Create an array to store the details of each item
//     const orderDetails = [];

//     // Add the table header
//     orderDetails.push('| المادة | التفاصيل | السعر | العدد |');

//     for (const item of cartItems) {
//       const title = item.title;
//       const price = item.price.toFixed(2);
//       const quantity = item.quantity;
//       const description = item.description;

//       // Add details to the array
//       orderDetails.push(`| ${title} | ${description} | ${price} | ${quantity} |`);
//     }

//     // Join the array elements into a single string
//     const orderTable = orderDetails.join('\n');

//     // Generate receipt as a PDF
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage();
    
    
//     const fontSize = 12;


//     // ...
//     const fontBytes = await fs.promises.readFile(require.resolve('pdfkit/js/data/Helvetica.afm'));
// const customFont = await pdfDoc.embedFont(fontBytes);


//   // Add the table to the page
// page.drawText(orderTable, { x: 50, y: 500, font: customFont, size: fontSize });

//     // Save the PDF to a buffer
//     const pdfBytes = await pdfDoc.save();

//     // Send the order message with the PDF as a document
//     ctx.replyWithDocument({ source: Buffer.from(pdfBytes), filename: 'receipt.pdf' }, { caption: 'فاتورة الطلب' });

//     // Prepare a message for the channel
//     const channelMessage = `تم استلام طلب جديد:\n` +
//       `${ctx.from.first_name}\n` +
//       `${orderTable}\n` +
//       `- المجموع: د ${totalPrice.toFixed(2)}\n` +
//       `- رقم الهاتف: ${phoneNumber}\n` +
//       `- العنوان: ${address}\n` +
//       `- الملاحظات: ${notice}`;

//     // Log and send the message to the channel
//     if (shouldSendChannelMessage) {
//       console.log('Sending message to channel:', channelMessage);
//       try {
//         const result = await bot.telegram.sendMessage(channelId, channelMessage, { parse_mode: 'Markdown' });
//         console.log('Telegram API result:', result);
//       } catch (error) {
//         console.error('Telegram API error:', error);
//       }
//     }
//   } catch (error) {
//     console.error('Error parsing received data:', error);
//   }
// });

// export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
//   await production(req, res, bot);
// };

// ENVIRONMENT !== 'production' && development(bot);
// export { bot };


// import { Telegraf } from 'telegraf';
// import { Context as TelegrafContext } from 'telegraf';


// import { VercelRequest, VercelResponse } from '@vercel/node';
// import { development, production } from './core';

// const { Markup } = require('telegraf');

// import { Context } from 'telegraf/typings/context';
// const BOT_TOKEN = process.env.TOKEN || '';
// const ENVIRONMENT = process.env.NODE_ENV || '';


// const bot = new Telegraf(BOT_TOKEN);
// const webLink = 'https://alhur.vercel.app/';
// const channelId = '@babyloncenter_net';

// bot.start((ctx) =>
//   ctx.reply('اهلا وسهلا بكم في شركة الحرة العراقية!', {
//     reply_markup: {
//       keyboard: [[{ text: 'اضغط هنا لفتح قائمة المواد', web_app: { url: webLink } }]],
//     },
//   })
// );

// // bot.start((ctx) =>
// //   ctx.reply('اهلا وسهلا بكم في شركة الحرة العراقية!', {
// //     reply_markup: {
// //       keyboard: [[{ text: 'اضغط هنا لفتح قائمة المواد', web_app: { url: webLink } }]],
// //     },
// //   })
// // );


// let shouldSendChannelMessage = true;

// // Updated function with type annotations and ctx parameter
// function formatOrderDetails(
//   cartItems: any[],  // Replace 'any' with the appropriate type for cartItems
//   totalPrice: number, 
//   storeName: string, 
//   phoneNumber: string, 
//   address: string, 
//   notice: string,
//   ctx: TelegrafContext  // Add context parameter
// ): string {
//   const orderDetails = cartItems.map((item) => {
//     const { title, description, price, quantity } = item;
//     return `- المادة: ${title}\n  التفاصيل: ${description}\n  السعر: ${price}\n  العدد: ${quantity}\n`;
//   });

//   const orderMessage = `**${ctx.from?.first_name ?? 'Unknown'}**\nتم ارسال الطلب التالي:\n\n${orderDetails.join('\n')}\n` +
//   `**المجموع: د ${totalPrice.toFixed(2)}**\n` +
//     `**اسم المحل:** ${storeName}\n` +
//     `**رقم الهاتف:** ${phoneNumber}\n` +
//     `**العنوان:** ${address}\n` +
//     `**الملاحظات:** ${notice}`;

//   return orderMessage;
// }

// bot.on('message', async (ctx) => {
//   try {
//     const receivedData = JSON.parse((ctx.message as any).web_app_data.data);
//     console.log('Received data:', receivedData);
//     const { cartItems, phoneNumber, address, notice, totalPrice, storeName } = receivedData;

//     // Format order details with ctx parameter
//     const orderMessage = formatOrderDetails(cartItems, totalPrice, storeName, phoneNumber, address, notice, ctx);

//     // Send the order message
//     ctx.replyWithMarkdown(orderMessage);

//     // Prepare a message for the channel
//     const channelMessage = `تم استلام طلب جديد:\n${ctx.from.first_name}\n${orderMessage}`;

//     // Log and send the message to the channel
//     if (shouldSendChannelMessage) {
//       console.log('Sending message to channel:', channelMessage);
//       try {
//         const result = await bot.telegram.sendMessage(channelId, channelMessage, { parse_mode: 'Markdown' });
//         console.log('Telegram API result:', result);
//       } catch (error) {
//         console.error('Telegram API error:', error);
//       }
//     }
//   } catch (error) {
//     console.error('Error parsing received data:', error);
//   }
// });


// export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
//   await production(req, res, bot);
// };

// ENVIRONMENT !== 'production' && development(bot);
// export { bot };

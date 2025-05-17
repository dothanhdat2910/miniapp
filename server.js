const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // hoặc dùng axios
const app = express();
const port = process.env.PORT || 3000;

// Thay bằng token và chat ID thật của bạn
const TELEGRAM_BOT_TOKEN = "7619980384:AAEvxTEye2oHd9-n2ArKOXsO7moWmNcHhuc";
const TELEGRAM_CHAT_ID = "7356958443";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cho phép CORS để front-end gọi
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Route nhận yêu cầu gửi lời ước
app.post('/send-wish', async (req, res) => {
  const wish = req.body.wish;
  if (!wish) {
    return res.status(400).json({ error: 'No wish provided' });
  }

  const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const message = `📨 Lời ước từ Zèn:\n\n${wish}`;

  try {
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message
      }),
    });

    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.description);
    }

    res.json({ success: true, message: 'Đã gửi lời ước tới Telegram!' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Lỗi khi gửi lời ước' });
  }
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});

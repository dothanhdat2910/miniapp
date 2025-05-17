const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Thay bằng token và chat_id thật của bạn
const TELEGRAM_BOT_TOKEN = "7619980384:AAEvxTEye2oHd9-n2ArKOXsO7moWmNcHhuc";
const TELEGRAM_CHAT_ID = "7356958443";

app.use(cors());
app.use(bodyParser.json());

app.post("/order", async (req, res) => {
  const { name, phone, dish, address, time } = req.body;
  const message = `\uD83D\uDCE6 Đơn hàng mới:\n\uD83C\uDF5C Món: ${dish}\n\uD83D\uDC64 Tên: ${name}\n\uD83D\uDCF1 SĐT: ${phone}\n\uD83C\uDFE0 Địa chỉ: ${address}\n\u23F0 Nhận lúc: ${time}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });
    res.send("\u2705 Đặt món thành công! Đơn đã gửi cho chủ quán.");
  } catch (error) {
    console.error("Lỗi gửi Telegram:", error.message);
    res.status(500).send("\u274C Gửi đơn hàng thất bại.");
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
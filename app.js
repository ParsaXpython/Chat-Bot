const express = require('express');
const RiveScript = require('rivescript');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use((req, res, next) => {
    if (req.path.endsWith('.html')) {
        return res.redirect('/');
    } else {
        next();
    }
});
app.use(express.static(path.join(__dirname, 'dist')));

const bot = new RiveScript({
    utf8: true
});
bot.loadDirectory('brain')
    .then(() => {
        console.log("Files loaded successfuly.");
        bot.sortReplies(); // مرتب‌سازی پاسخ‌ها پس از بارگذاری ضروری است
    })
    .catch(err => console.error("Error:", err))

app.post("/api/send", async (req, res) => {
    const { message } = req.body;

    const response = await bot.reply('id', message);

    return res.send({
        "message": response
    })
});

app.listen(PORT, () => {
    console.log(`Server Started on https://localhost:${PORT}`);
});
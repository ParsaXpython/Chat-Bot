const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    if (req.path.endsWith('.html')) {
        return res.redirect('/');
    } else {
        next();
    }
});
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(PORT, () => {
    console.log(`Server Started on https://localhost:${PORT}`);
});
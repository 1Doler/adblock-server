const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use((req, res, next) => {
    const origin = req.headers.origin;
    res.header('Access-Control-Allow-Origin', origin);
    next();
});
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

app.get('/img', (req, res) => {
    // Путь к файлу, который вы хотите вернуть
    const filePath = path.join(__dirname, 'reklama.jpg');

    // Проверка существования файла
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }

        // Чтение файла и отправка его содержимого в ответе
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});

app.get('/js', (req, res) => {
    // Путь к файлу, который вы хотите вернуть
    const filePath = path.join(__dirname, 'banner.js');

    // Проверка существования файла
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }

        // Чтение файла и отправка его содержимого в ответе
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});
app.get('/html', (req, res) => {
    // Путь к файлу, который вы хотите вернуть
    const filePath = path.join(__dirname, 'index.html');

    // Проверка существования файла
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }

        // Чтение файла и отправка его содержимого в ответе
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});
app.get('/html2', (req, res) => {
    // Путь к файлу, который вы хотите вернуть
    const filePath = path.join(__dirname, 'index2.html');

    // Проверка существования файла
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }

        // Чтение файла и отправка его содержимого в ответе
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

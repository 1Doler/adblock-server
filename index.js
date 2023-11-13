const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
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

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

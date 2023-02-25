const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
require('dotenv').config();

const authRouter = require('./routes/auth.routes');
const filesRouter = require('./routes/files.routes');
const filePath = require('./middleware/filePath');

const app = express();
app.use(express.json());
app.use(express.static('static'))
app.use(fileUpload({}));
app.use(cors());
app.use(filePath(path.resolve(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB is up and running'))
    .catch((err) => console.log(err));

app.use('/api/auth', authRouter);
app.use('/api/files', filesRouter);

app.get('/', (req, res) => {
    res.send('hello');
});

app.listen(PORT, (err) => {
    if (err) {
        throw Error(err);
    }

    console.log(`Server is running on PORT: ${PORT}`);
});

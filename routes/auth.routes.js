const Router = require('express');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { registerValidation } = require('../validation/auth');
const authMiddleWare = require('../middleware/auth');
const router = new Router();
const fileService = require('../services/fileService');
const File = require('../models/File');

router.post('/registration', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const { email, password } = req.body;

        const candidate = await User.findOne({ email });

        if (candidate) {
            return res.status(400).json({ message: `User with email ${email} already exists` });
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const document = new User({
            email,
            password: hashedPassword,
        });

        const user = await document.save();
        await fileService.createDir(
            req, new File({ user: user.id, name: '' }),
        );

        res.json({
            email: user.email,
            diskSpace: user.diskSpace,
            usedSpace: user.usedSpace,
            files: user.files,
            _id: user._id,
            avatar: user.avatar,
        });

    } catch (err) {
        console.log(err);
        res.json({ message: err.message });
    }
});

router.post('/login', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValidPassword = await bcrypt.compareSync(password, user.password);

        if (!isValidPassword) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        return res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar,
            }
        });
    } catch (err) {
        console.log(err);
        res.json({ message: err.message });
    }
});

router.get('/check', authMiddleWare, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        return res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar,
            }
        });
    } catch (err) {
        console.log(err);
        res.json({ message: err.message });
    }
});


module.exports = router;

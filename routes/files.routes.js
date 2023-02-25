const Router = require('express');
const authMiddleWare = require('../middleware/auth');
const fileController = require('../controllers/fileController');

const router = new Router();

router.get('', authMiddleWare, fileController.getFiles);
router.get('/download', authMiddleWare, fileController.downloadFile);
router.get('/search', authMiddleWare, fileController.searchFile);
router.post('', authMiddleWare, fileController.createDir);
router.post('/upload', authMiddleWare, fileController.uploadFile);
router.post('/avatar', authMiddleWare, fileController.uploadAvatar);
router.delete('', authMiddleWare, fileController.deleteFile);
router.delete('/avatar', authMiddleWare, fileController.deleteAvatar);

module.exports = router;

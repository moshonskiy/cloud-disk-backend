const fs = require('fs');
const File = require('../models/File');

class FileService {
    createDir(req, file) {
        const filePath = this.getPath(req, file);

        return new Promise((res, rej) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);

                    return res({ message: 'File was created' });
                } else {
                    return rej({ message: 'File already exists' });
                }
            } catch (err) {
                return rej({ message: 'File error' });
            }
        })
    }

    deleteFile(req, file) {
        const path = this.getPath(req, file);

        if (file.type === 'dir') {
            fs.rmdirSync(path);
        } else {
            fs.unlinkSync(path);
        }
    }

    getPath(req, file) {
        return `${req.filePath}\\${file.user}\\${file.path}`;
    }
}

module.exports = new FileService();

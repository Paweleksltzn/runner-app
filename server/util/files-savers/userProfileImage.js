const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

module.exports = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type')
        if (isValid) {
            error = null;
        }
        cb(error, 'public/files/profile-images')
    },
    filename: (req, file, cb) => {
        const name = (req.token.name + req.token.surname || 'randomUser').toLocaleLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        const finalName = `${name}-${Date.now()}.${ext}`;
        req.profileImg = finalName;
        cb(null, finalName);
    }
});

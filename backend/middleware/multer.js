const multer = require('multer');

// we use 'memoryStorage' so the file is temporarily kept in the server's RAM 
// instead of saving it to your computer's hard drive. This is much faster!
const storage = multer.memoryStorage();

// we expect the frontend to send the file in a field name "file"
const singleUpload = multer({ storage }).single("file");

module.exports = singleUpload;
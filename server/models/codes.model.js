const mongoose = require('mongoose');

const codeSchema = mongoose.Schema({
    code: String,     
});

const CodeModel = mongoose.model('CodeModel', codeSchema);

module.exports = CodeModel;
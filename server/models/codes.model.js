import mongoose from 'mongoose';

const codeSchema = mongoose.Schema({
    code: String,     
});

const CodeModel = mongoose.model('CodeModel', codeSchema);

export default CodeModel;
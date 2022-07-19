const mongoose = require('mongoose'); // cria objeto do mongoose
const Schema = mongoose.Schema;  // objeto para construir schemas

const PostagemSchema = new Schema({

    usuario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comentario: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },

});

module.exports = Postagem = mongoose.model("postagem", PostagemSchema);

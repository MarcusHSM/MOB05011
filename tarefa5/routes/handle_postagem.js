// tratamento na página de postagem

const express = require('express');  // cria objeto do express
const router = express.Router();    // objeto do express que faz tratamento de rotas

// ----------------tratar postagem --------------------------------
const Postagem = require("../models/postagem"); // importa a coleção
const bcrypt = require("bcrypt");  // criptografia da senha, precisa instalar npm install bcrypt

router.post('/processa', (req, res) => {
 console.log("Entrou!");

// verifica se já tem algum registro (documento) com o usuário, e-mail e comentário enviado no body 
Postagem.findOne({email: req.body.email})   
.then(doc_postagem => {
 if (doc_postagem){
    // já existe documento com o usuário, e-mail e comentário fornecido
    return res.status(404).json({duplicidadeerror: "Usuário, e-mail e comentário já registrado no sistema"});
 } else{
    // inserir informação no BD
    const novo_registro_postagem = Postagem({
        // obtém dados de um formulário
        usuario: req.body.usuario,
        email: req.body.email,
        comentario: req.body.comentario,
        senha: req.body.senha,
    });

    //criptografia da senha 
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(novo_registro_postagem.senha, salt, function(err, hash) {
            if (err) throw err;
            novo_registro_postagem.senha = hash; 

            // salva no BD
            novo_registro_postagem
            .save()
            .then(p => res.json(p))   // foi inserido esses dados. Retorna isso para o front
            .catch(err => console.log(err));

        });
    });

 }  
})
.catch(err => console.log(err));

});


router.get("/", (req, res) => res.json({status: "Acesso permitido"}));

module.exports = router;    
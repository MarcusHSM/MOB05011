const express = require('express');  // cria objeto do express
const app = express();  // cria aplicação que usa o express, tem as funcionalidades do express

//--------------banco de dados-----------------------------
const mongoose = require('mongoose'); // cria objeto do mongoose
const db_access = require('./setup/db').mongoURL;       // objeto para conectar ao bd

mongoose
.connect(db_access, {useNewUrlParser: true, useUnifiedTopology: true})   // faz conexao
// se a conexao for bem sucedida o que ocorre fica no then
.then(() =>  console.log("Conexão ao MongoDB bem sucedida!"))
.catch(err => console.log(err));   // trata erro na conexao

//----------------Tratamento da postagem---------------------------------------------

const bodyparser = require("body-parser");  // cria objeto do body-parser
// recebe o body, pode ser objeto mais simples (extended:false) ou o objeto mais completo extended:true 
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());   // informações entre front e back transmitidas via json

const Postagem = require("./models/postagem"); // importa a coleção
const bcrypt = require("bcrypt");  // criptografia da senha, precisa instalar npm install bcrypt

app.post('/processa', (req, res) => {
  //  console.log("Entrou!");
  // FAZER TODO O CODIGO DO HANDLE_POSTAGEM AQUI

    // verifica se já tem algum registro (documento) com o usuário, e-mail e comentário enviado no body 
    Postagem.findOne({ usuario: req.body.usuario, email: req.body.email, comentario: req.body.comentario})   
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


//----------------------------------------------------------------------------------


// define rota para a raiz
// recebe dois parâmetros : rota (link que o cliente está acessando)
// e o callback, sendo que o callback possui a requisição e a resposta
// rota foi passada a raiz  /   
app.get('/',(req, res) => {
 res.send("Olá! Seja bem-vindo!");   // envia resposta textual ao usuário   

});  // lida com os acessos do usuário

const port = 3000;

// pasta publica para realizar os comentários
 app.use('/comentario', express.static(__dirname + '/public/comentario'));

 // caso default, isto é, não caiu em nenhum caso anterior
app.get('*',(req, res) => {
    res.send("Link inválido: 404");   // envia resposta textual ao usuário   
   
});  // lida com os acessos do usuário
  

// quando não passa o host, o padrão é o localhost
app.listen(port, () => console.log(`Escutando na porta ${port}`));  // Servidor permanece ativo escutando a porta




/*
no arquivo handle_postagem
const Postagem = require("../models/postagem"); // importa a coleção

no arquivo index.js
const handle_postagem = require("./routes/handle_postagem");
app.use("/handle_postagem", handle_postagem);

*/
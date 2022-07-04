const express = require('express');  // cria objeto do express
const app = express();  // cria aplicação que usa o express, tem as funcionalidades do express

let port = 3000;

// ORDEM DO TRATAMENTO DE ROTAS É IMPORTANTE

// recebe dois parâmetros : rota (link que o cliente está acessando)
// e o callback, sendo que o callback possui a requisição e a resposta
// rota foi passada a raiz  /   
app.get('/',(req, res) => {
 res.send("Olá! Seja bem-vindo!");   // envia resposta textual ao usuário   

});  // lida com os acessos do usuário


// trata acesso ao arquivo left-sidebar.html
// mostra uso de tag html
app.get('/left-sidebar.html',(req, res) => {
    res.send("<h1>Você está na página left-sidebar.html </h1>");   // envia resposta textual ao usuário   
   
});  // lida com os acessos do usuário


// exemplo json
app.get('/json',(req, res) => {
    res.status(200).json({usuario: "Marcus", id:123456});     
});  // lida com os acessos do usuário


// exemplo de expressão regular
app.get('/ab[0-9]cd',(req, res) => {
    res.send("Essa é uma expressão regular.");   // envia resposta textual ao usuário   
   
});  // lida com os acessos do usuário

// inclui o tratamento de parâmetros
let params_module = require('./params.js');
// ao acessar a raiz, verifique se tem rota no arquivo params_module
app.use ('/', params_module);

// exemplo com post
app.post('/post/teste_post/',(req, res) => {
    res.send("Você acessou via método POST.");   // envia resposta textual ao usuário   
   
});  // lida com os acessos do usuário


// caso default, isto é, não caiu em nenhum caso anterior
app.get('*',(req, res) => {
    res.send("Link inválido: 404");   // envia resposta textual ao usuário   
   
});  // lida com os acessos do usuário


// quando não passa o host, o padrão é o localhost
app.listen(port, () => console.log(`Escutando na porta ${port}`));  // Servidor permanece ativo escutando a porta
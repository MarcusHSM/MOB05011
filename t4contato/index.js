const express = require('express');  // cria objeto do express
const bodyparser = require('body-parser');  // cria objeto do body-parser
const app = express();  // cria aplicação que usa o express, tem as funcionalidades do express

let port = 3000;

// define rota para a raiz
// recebe dois parâmetros : rota (link que o cliente está acessando)
// e o callback, sendo que o callback possui a requisição e a resposta
// rota foi passada a raiz  /   
app.get('/',(req, res) => {
 res.send("Olá! Seja bem-vindo!");   // envia resposta textual ao usuário   

});  // lida com os acessos do usuário


// recebe o body, pode ser objeto mais simples (extended:false) ou o objeto mais completo extended:true 
app.use(bodyparser.urlencoded({extended:false}));
// pasta que vai ter os arquivos públicos
app.use('/contato', express.static(__dirname + '/public/contato'));
// o primeiro parâmetro é o action do formulário html
app.post('/pagina-processa-dados-do-form', (req, res) => {
console.log("Nome: " + req.body.name );  // req.body.name_do_campo   
console.log("E-mail: " + req.body.mail );  // req.body.name_do_campo   
console.log("Mensagem: " + req.body.msg );  // req.body.name_do_campo   

res.redirect('/');  //  volta para raiz
});

 // caso default, isto é, não caiu em nenhum caso anterior
app.get('*',(req, res) => {
    res.send("Link inválido: 404");   // envia resposta textual ao usuário   
   
});  // lida com os acessos do usuário
  

// quando não passa o host, o padrão é o localhost
app.listen(port, () => console.log(`Escutando na porta ${port}`));  // Servidor permanece ativo escutando a porta





/*
// middleware
// é executado independente da rota
// next cria uma corrente de middleware
const  middleware1  = function(req, res, next){
    console.log("Executando middleware 1");
    next();   // necessário chamar a fim de encadear o próximo middleware, se houver.
}

// usa o middleware 1 definido previamente
app.use(middleware1);


// define middleware2
const  middleware2  = function(req, res, next){
    console.log("Executando middleware 2");
    next();   // necessário chamar a fim de encadear o próximo middleware, se houver.
}

// usa middleware 2 somente na pasta definida   (pasta2) no caso
app.use('/pasta2', middleware2);

// define rota /pasta2
app.get('/pasta2',(req, res) => {
    res.send("Olá! Você está na pasta 2!");   // envia resposta textual ao usuário   
   
   });
*/


/*
const path = require("path");  

// seta qual motor de visualização será usado
app.set('view engine', 'pug');
// seta em qual pasta estarão as views
app.set('views', path.join(__dirname, "views"));

app.get('/',(req, res) => {
  res.render("index"); // renderiza view chamada index
   });  
*/


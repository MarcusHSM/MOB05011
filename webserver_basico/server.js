const http = require('http');   // inclui objeto do protocolo http

const hostname = '127.0.0.1';   // inclui o endereço de acesso, nesse exemplo, o localhost (a própria máquina)
const port = 3000;      // porta usada

// cria o servidor
// cria uma arrow function com 2 parâmetros
//  require (req) e response (res)
// a requisição http feita e a resposta fornecida
http.createServer (  (req,res) =>  {
// escreve a resposta no cabeçãlho (metadados)    
 // código 200: informa que a página foi encontrada
// 'text/plain': o conteúdo retornado é texto
res.writeHead(200, {'Content-Type': 'text/plain'}); 
// finaliza o objeto response e fornece a resposta
res.end("Hello World - Tarefa 1!")  // texto retornado

// listen permite servidor continuar na ativa
// permanece escutando port do hostname
// terceiro parâmetro é algo que será executado
// foi coloado uma mensagem de log no console 
}).listen(port, hostname,  () => {
//console.log("O servidor está sendo executado em http://127.0.0.1:3000/");

console.log(`O servidor está sendo executado em http://${hostname}:${port}/`);

} );  

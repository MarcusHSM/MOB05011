const http = require('http');   // inclui pacote do protocolo http para lidar com a camada de aplicação, transmissão de arquivos do usuários
const url =  require('url');  //  permite entender cada parte da url, isto é, "resolver" e fazer o parser de uma url
const fs =  require('fs');   // file server, interação com sitemas de arquivos
const path =  require('path');   // permite manipular caminhos de pastas, usando para juntar nomes neste exemplo

const hostname = '127.0.0.1';   // inclui o endereço de acesso, nesse exemplo, o localhost (a própria máquina)
const port = 3000;      // porta usada

//media type tipo de arquivos que a aplicação vai processar
// mime multipurpose internet mail extension indica natureza e formato de um arquivo
const mimeTypes = {
    html: "text/html",
    css: "text/css",
    js: "text/javascript",
    png: "image/png",
    jpeg: "image/jpeg",
    jpg: "image/jpg",
    woff: "font/woof"  // arquivo de  fontes (texto, letras)
};


// cria o servidor
// cria uma arrow function com 2 parâmetros
//  require (req) e response (res)
// a requisição http feita e a resposta fornecida
http.createServer (  (req,res) =>  {
    //console.log(url.parse(req.url).pathname);
    let acesso_uri = url.parse(req.url).pathname;  // uri endereço mais amplo de qq recurso
    //objeto process sempre funciona quando aplicação do noje js está em execução
    // fornece diversas informações do runtime
    //process.cwd()   // current work directory
    //console.log(path.join(process.cwd(),decodeURI(acesso_uri))); // decodeURI trata possiveis erros do URI, acentos, espaços, caracteres especiais ...
    let caminho_completo_recurso = path.join(process.cwd(),decodeURI(acesso_uri)); // decodeURI trata possiveis erros do URI, acentos, espaços, caracteres especiais ...
    console.log(caminho_completo_recurso);
    let recurso_carregado;
    try{    // tenta acessar o recurso
        recurso_carregado = fs.lstatSync(caminho_completo_recurso);  // lstatSync que aponta e permite acesso ao recurso
    } catch (error){  
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404: Arquivo não encontrado!');   // redireciona para mensagem de erro 404
        // finaliza o objeto response e fornece a resposta
        res.end(); 
    }

    if(recurso_carregado.isFile()) {   // verifica se recurso carregado é um arquivo
        let mimeType = mimeTypes[path.extname(caminho_completo_recurso).substring(1)];  // obtém o mimeType dada a extensão do arquivo sem o .         
        res.writeHead(200, {'Content-Type': mimeType});    // escreve o código de resposta e o mimeType do recurso carregado (tipo de arquivo)
        // carrega efetivamente o recurso
        let fluxo_arquivo = fs.createReadStream(caminho_completo_recurso);
        fluxo_arquivo.pipe(res);    // encapsula e transmite o recurso para o usuário
      }  else if(recurso_carregado.isDirectory()) { // verifica se recurso carregado é um diretório
        // por padrão, tenta encontrar um index.html
        res.writeHead(302, {'Location': 'index.html'});   // código 302 indica que está encaminhando a solicitação para index.html
        res.end();
      } else {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.write('500 Erro interno no Servidor');
        res.end();
      }

    /*  
    // escreve a resposta no cabeçãlho (metadados)    
     // código 200: informa que a página foi encontrada
    // 'text/plain': o conteúdo retornado é texto
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Ok!');
    // finaliza o objeto response e fornece a resposta
    res.end();  // texto retornado
    */
    // listen permite servidor continuar na ativa
    // permanece escutando port do hostname
    // terceiro parâmetro é algo que será executado
    // foi coloado uma mensagem de log no console 
    }).listen(port, hostname,  () => {
    
    console.log(`O servidor está sendo executado em http://${hostname}:${port}/`);
    
    } );  
    
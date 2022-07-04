let express = require ('express');
let router = express.Router();  // incluir o submódulo router do express

// exemplo de parâmetro na url
router.get('/:p',(req, res) => {
    res.send("Você informou o parâmetro " + req.params.p);   // envia resposta textual ao usuário   
   
});  // lida com os acessos do usuário


// exemplo de parâmetro na url
router.get('/user/:u/nome/:n',(req, res) => {
    res.send("Você acessou informações do usuário " + req.params.u + " de nome " + req.params.n);   // envia resposta textual ao usuário   
   
});  // lida com os acessos do usuário

// exporta o objeto router
module.exports = router;
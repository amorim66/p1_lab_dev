const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const Cliente = require("./models/cliente");
const Handlebars = require('handlebars');

const app = express();

// Configuração do middleware de análise de corpo
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Registrar o helper equal
Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
      throw new Error("Handlebars Helper 'equal' needs 2 parameters");
    if (lvalue === rvalue) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  

// Configuração do Handlebars
app.engine('handlebars', exphbs.engine({defaultLayout: 'main', runtimeOptions:{allowProtoPropertiesByDefault:true,
    allowedProtoMethodsByDefault:true}}));
app.set('view engine', 'handlebars');
app.set('views', './views');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Definindo rotas
app.get('/', (req, res) => {
    const title = "Página inicial";
    res.render('index',);
});

app.get('/cadastro', (req, res) => {
    const title = "Página de cadastro";
    res.render('cadastro',);
});

app.post("/cadastrar", function(req, res){
    Cliente.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    }).then(function(){
        console.log("Cliente cadastrado com sucesso!");
        res.redirect('/consultar');
    }).catch(function(erro){
        console.log("Erro: Cliente não cadastrado!" + erro);
        res.status(500).send("Erro ao cadastrar cliente.");
    });
});

// Rota para exibir a tela de consulta de clientes
app.get('/consultar', async (req, res) => {
    try {
        const clientes = await Cliente.findAll({ attributes: ['id', 'nome', 'endereco', 'bairro', 'cep', 'cidade', 'estado'] });
        res.render('consulta', { clientes: clientes, title: 'Lista de Clientes' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao buscar clientes.' });
    }
});

//Rota para exibir a tela de edição de cliente
app.get('/editar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const cliente = await Cliente.findByPk(id);
        res.render('editar', { cliente, title: 'Página de Atualização' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar o formulário de edição');
    }
});

// Rota para atualizar os dados do cliente
app.post('/editar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const cliente = req.body;
        await Cliente.update(cliente, { where: { id: id } });
        res.redirect('/consultar');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar o cliente');
    }
});

// Rota para excluir um cliente
// Rota para excluir um cliente
app.get("/excluir/:id", async (req, res) => {
    try {
        await Cliente.destroy({ where: { id: req.params.id } });
        console.log("Cliente excluído com sucesso!");
        res.redirect('/consultar');
    } catch (error) {
        console.error("Erro: Cliente não excluído!" + error);
        res.status(500).send('Erro ao excluir o cliente');
    }
});


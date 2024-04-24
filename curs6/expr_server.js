const bodyParser = require('body-parser')
const express = require ('express')
const app = express ()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

app.get('/', (req, res) => res.send ('Hello World'));
app.get('/blog', (req, res) => res.sendfile ("./blog.html"));

app.post('/', function (req, res){
    console.log (req.body);
    res.send ('POST request')
})
app.put('/user', function (req, res){
    res.send ('DELETE request la /user')
})
app.listen(
    3002,
    ()=> console.log ('Aplicatie ce ruleaza pe portul 3002!')
)
const express =require ('express')
const app = express();
const PORT = 3000;
const fs = require('fs');

//el servidor cuenta con script dev- watch para reiniciar

//hacer publica la carpeta assets
app.use(express.static("assets"));

//devolver un json con un arreglo de usuarios permitidos
app.get('/abracadabra/usuarios', (req, res) => {
    const data = fs.readFileSync('./usuarios.json', 'utf8');
    const usuarios = JSON.parse(data)
    console.log(usuarios)
    res.json(usuarios)
});

//middleware para validar la autorizacion de un grupo de usuarios

app.use('/abracadabra/juego/:usuario', (req,res,next)=>{
    const data = fs.readFileSync('./usuarios.json', 'utf8');
    const usuarios = JSON.parse(data);
    const nombre_usuario = usuarios.usuarios;
    const user = req.params.usuario;
    const validar = nombre_usuario.find(function(option){
        if(option==user){
            return true
        }
    });
validar ? next() : res.sendFile(__dirname + '/assets/who.jpeg');
});

//ruta para acceder al juego de magia
app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//ruta para la conmutacion de opciones en el juego
app.get('/abracadabra/conejo/:n', (req, res) => {
    
    const num = Math.floor(Math.random() * (5 - 1)) + 1;
    
    const numero = req.params.n;
  
    numero == num
      ? res.sendFile(__dirname + '/assets/conejito.jpg')
      : res.sendFile(__dirname + '/assets/voldemort.jpg');
});

// ruta personalizada para direcciones que no existen
app.get('*', (req, res) => {
    res.send('<center><h1>Esta Pagina no existe</h1></center>');
});

//levantamiento del servidor con atajo de direccion
app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en ${PORT} http://localhost:${PORT}/abracadabra`)
})
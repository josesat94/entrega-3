//importamos la dependencia express
const express = require('express')

//importamos handlebars
const handlebars = require('express-handlebars')

//importacion socket
const {Server} = require('socket.io')

const productManager = require('./class/ProductManager');
const pm = new productManager('./data/products.json')

const productsRouter = require('./routers/routerProducts')
const cartRouter = require('./routers/routerCart')

const todosLosProductos = require('./routers/todosLosProductos.router')
const realTimeProducts = require('./routers/realTimeProducts.router')

//guardamos el puerto en una variable
const port = 3001

//creamos la variable app y esta ejecuta express
const app = express()

app.use(express.json());

//configurar el servidor para que reciba datos complejos
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname +'/views');
app.set('view engine', 'handlebars');

//rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', todosLosProductos);
app.use('/realtimeproducts', realTimeProducts)

const httpServer = app.listen(port, ()=>{console.log(`Ejecutandose en el puerto ${port}`)})
const io = new Server(httpServer);

//servidor sockets
io.on("connection", async(socket) =>{
    console.log('Cliente conectado en ' + socket.id);

    const products = await pm.getProducts();
    io.emit("realtimeproducts", {products})
})




//importamos la dependencia express
const express = require('express')

const productsRouter = require('./routers/routerProducts')
const cartRouter = require('./routers/routerCart')

//creamos la variable app y esta ejecuta express
const app = express()
//guardamos el puerto en una variable
const port = 3001

app.use(express.json());
//configurar el servidor para que reciba datos complejos
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter) 


app.listen(port, () => {
    console.log(`Se está ejecutando en el puerto ${port}`)
})


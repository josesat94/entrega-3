//importamos la dependencia express
const express = require('express')

//creamos la variable app y esta ejecuta express
const app = express()

//configurar el servidor para que reciba datos complejos
app.use(express.urlencoded({extended:true}))

//guardamos el puerto en una variable
const port = 3001

//importamos la class ProductManager y el json de productos
const ProductManager = require("./ProductManager")
const productManager = new ProductManager("./products.json")

//consulta por productos
app.get('/products', async (req, res) => {
    try {
      const limit = req.query.limit;
      const products = await productManager.getProducts();
      const result = limit ? products.slice(0, limit) : products;
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


//consulta por productos por id
app.get('/products/:pid', async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productManager.getProductById(pid);
      if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
      } else {
        res.json(product);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.listen(port, () => {
    console.log(`Se está ejecutando en el puerto ${port}`)
})


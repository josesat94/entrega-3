//Importación de la libreria File System
const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

//Agregar un producto al archivo
  addProduct(product) {
    const products = this.getProductsArchivo();
    const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
    product.id = lastProductId + 1;
    products.push(product);
    this.saveProductsArchivo(products);
  }

  // Obtener los productos del archivo
  getProducts() {
    return this.getProductsArchivo();
  }

//Obtener un producto por id del archivo
  getProductById(id) {
    const products = this.getProductsArchivo();
    const product = products.find(p => p.id == id);    

    return product || null;
  }

//Actualizar un producto en el archivo
  updateProduct(id, updatedProduct) {
    const products = this.getProductsArchivo();

    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex !== -1) {
      products[productIndex] = Object.assign({}, products[productIndex], updatedProduct, {id});
      this.saveProductsArchivo(products);
    }
  }

//Eliminar un producto del archivo  
  deleteProduct(id) {
    const products = this.getProductsArchivo();
    const filteredProducts = products.filter(p => p.id !== id);

    this.saveProductsArchivo(filteredProducts);
  }

  getProductsArchivo() {
    try {
        if(!fs.existsSync(this.path)){
            fs.writeFileSync(this.path, "[]");
        }
        const productsData = fs.readFileSync(this.path, 'utf-8');
        const products = JSON.parse(productsData);
        return products;
        }
    catch (error){
      console.log(error)
      return [];
    }
  }

  saveProductsArchivo(products) {
    fs.writeFileSync(this.path, JSON.stringify(products));
  }
}

module.exports = ProductManager


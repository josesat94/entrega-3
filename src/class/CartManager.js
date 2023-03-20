//Importación de la libreria File System
const fs = require("fs");

class CartManager {
  constructor(path, pm){
    this.path = path;
    this.productManager = pm;
  }

//Agregar productos al carrito
  addProductToCart(cartId, productId, quantity) {
    const carts = this.getCartsArchivo();
    const cartIndex = carts.findIndex(c => c.id === cartId);

    if (cartIndex !== -1) {
      const cart = carts[cartIndex];
      const product = this.productManager.getProductById(productId);

      if (product) {
        const existingProductIndex = cart.products.findIndex(p => p.id === productId);
        if (existingProductIndex !== -1) {
          cart.products[existingProductIndex].quantity += quantity;
        } else {
          cart.products.push({ id: productId, quantity });
        }
        this.saveCartsArchivo(carts);
      }
    }
  }

//Obtener productos 
  getCarts() {
    return this.getCartsArchivo();
  }

//Obtener productos por ID  
  getCartsById(id) {
    const carts = this.getCartsArchivo();
    const cart = carts.find((c) => c.id == id);

    return cart || null;
  }

//Obtener productos archivo  
  getCartsArchivo() {
    try {
      if (!fs.existsSync(this.path)) {
        fs.writeFileSync(this.path, "[]");
      }
      const cartsData = fs.readFileSync(this.path, "utf-8");
      const carts = JSON.parse(cartsData);
      return carts;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

//Guardar en archivo 
  saveCartsArchivo(carts) {
    fs.writeFileSync(this.path, JSON.stringify(carts));
  }
}

module.exports = CartManager;
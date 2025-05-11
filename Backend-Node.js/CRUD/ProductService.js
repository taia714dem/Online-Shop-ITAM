const Product = require("../models/Product-model.js");
const fileService = require('./fileService.js');

class ProductService {
  async create(product, picture) {
    
    const fileName=fileService.saveFile(picture)
    const createdProduct = await Product.create({...product, picture: fileName });
    return createdProduct;
  }
  async getAll() {
    const products = await Product.find();
    return products;
  }
  async getOne(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const product = await Product.findById(id);
    return product;
  }
  async update(product) {
    if (!product.id) {
        throw new Error("не указан ID");
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      product.id,
      product,
      { new: true }
    );
    return updatedProduct
  }
  async delete(id) {
    if (!id) {
        throw new Error("не указан ID");
    }
    const product = await Product.findByIdAndDelete(id);
    return product;
  }
}

module.exports = new ProductService();

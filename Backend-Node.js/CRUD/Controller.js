const Product = require("../models/Product-model.js");
const ProductService = require("./ProductService.js");
const fs = require("fs");
const { join } = require("path");

class CRUDController {
  async create(req, res) {
    try {

      const product = await ProductService.create(req.body, req.files.picture);
      res.json({
        id: product._id.toString(), // Возвращаем id созданного продукта
        ...product._doc, // Возвращаем остальные поля продукта
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAll(req, res) {
    try {
      const products = await Product.find();
      const response = await Promise.all(
        products.map(async (product) => {
          const imagePath = join(__dirname, "static", product.picture);
          console.log(`Looking for image at: ${imagePath}`);
          const exists = fs.existsSync(imagePath);
          console.log(`Image exists for product ${product.name}: ${exists}`);

          const imageBase64 = exists
            ? `data:image/jpeg;base64,${Buffer.from(
                fs.readFileSync(imagePath)
              ).toString("base64")}`
            : "" ||
              console.warn(`Image not found for product: ${product.name}`);

          return {
            id: product._id.toString(),
            name: product.name,
            price: product.price,
            description: product.description,
            quantity: product.quantity,
            uniqueness: product.uniqueness,
            category: product.category,
            picture: imageBase64,
          };
        })
      );

      return res.json({ data: response });
    } catch (error) {
      console.error("Error in getAll:", error);
      return res
        .status(500)
        .json({ message: "Server Error", error: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const product = await ProductService.getOne(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      const imagePath = join(__dirname, "static", product.picture);
      const imageBase64 = fs.existsSync(imagePath)
        ? `data:image/jpeg;base64,${Buffer.from(
            fs.readFileSync(imagePath)
          ).toString("base64")}`
        : "";

      return res.json({
        id: product._id.toString(),
        name: product.name,
        price: product.price,
        description: product.description,
        quantity: product.quantity,
        uniqueness: product.uniqueness,
        category: product.category,
        picture: imageBase64,
      });
    } catch (error) {
      console.error("Error in getOne:", error);
      return res
        .status(500)
        .json({ message: "Server Error", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const updatedProduct = await ProductService.update(req.body);
      if (!updatedProduct)
        return res.status(404).json({ message: "Product not found" });
      const responseProduct = updatedProduct.toObject();
      delete responseProduct._id; // Удаляем _id из ответа
      delete responseProduct.__v;

      return res.json(responseProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async delete(req, res) {
    try {
      const product = await ProductService.delete(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      return res.json({
        id: product._id.toString(), // Возвращаем id удаленного продукта
        name: product.name, // Можно также вернуть название продукта или другие поля
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new CRUDController();

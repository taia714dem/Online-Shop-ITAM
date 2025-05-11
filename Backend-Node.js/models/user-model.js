const { Schema, model } = require('mongoose');

const UserModel = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    balance: { type: Number, default: 0 },
    role: {type: String, required: true},
    basket: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product' }, // ID продукта
        amount: { type: Number, required: true },
        quantity: { type: Number, required: true }, // Количество
        price: { type: Number, required: true }, // Цена
        name: { type: String, required: true }, // Название
        description: { type: String, required: true }, // Описание
        uniqueness: { type: String, required: true }, // Уникальность
        category: { type: String, required: true }, // Категория
        picture: { type: String } // Изображение
    }],
    inventar: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product' }, // ID продукта
        quantity: { type: Number, required: true }, // Количество
        price: { type: Number, required: true }, // Цена
        name: { type: String, required: true }, // Название
        description: { type: String, required: true }, // Описание
        uniqueness: { type: String, required: true }, // Уникальность
        category: { type: String, required: true }, // Категория
        picture: { type: String } // Изображение
    }]
});

module.exports = model('User', UserModel);
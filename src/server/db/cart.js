const db = require('./client')

const createCart = async({ productId }) => {
    try {
        const { rows: [ cart ] } = await db.query(`
        INSERT INTO cart(productId)
        VALUES($1)
        RETURNING *`, [productId]);

        return cart;
    } catch (err) {
        throw err;
    }
}

const getAllCarts = async() => {
    try {
        const { rows: [ cart ] } = await db.query(`
        SELECT * 
        FROM cart`, []);

        if(!cart) {
            console.error("No Carts");
            return;
        }
        return cart;
    } catch (err) {
        throw err;
    }
}

const getCartByProductId = async(productId) => {
    try {
        const { rows: [ cart ] } = await db.query(`
        SELECT * 
        FROM cart
        WHERE "productId"=$1;`, [ productId ]);

        if(!cart) {
            console.error("No Carts match ProductId");
            return;
        }
        return cart;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createCart,
    getAllCarts,
    getCartByProductId
};
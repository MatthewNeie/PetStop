const db = require('./client')

const createCart = async({ productId }) => {
    try {
        const { rows: [ cart ] } = await db.query(`
        INSERT INTO cart("productId")
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

const updateCartById = async(id, fields = {}) => {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [cart] } = await client.query(`
            UPDATE cart
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return cart;
    } catch (error) {
        throw error;
    }
}

const deleteCartById = async(id) => {
    try {
        const { rows: [ cart ] } = await db.query(`
        DELETE FROM cart
        WHERE id=$1
        RETURNING *;`, [ id ]);

        if(!cart) {
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
    getCartByProductId,
    updateCartById,
    deleteCartById,
};
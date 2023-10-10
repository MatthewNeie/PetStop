const db = require('./client')

const createCart = async({ products, userId }) => {
    try {
        const { rows: [ cart ] } = await db.query(`
        INSERT INTO cart("products", "userId")
        VALUES($1, $2)
        RETURNING *`, [products, userId]);

        return cart;
    } catch (err) {
        throw err;
    }
}

const getAllCarts = async() => {
    try {
        const { rows: carts } = await db.query(`
        SELECT * 
        FROM cart`);

        if(!carts) {
            console.error("No Carts");
            return;
        }
        return carts;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getCartById = async(id) => {
    try {
        const { rows: [ cart ] } = await db.query(`
        SELECT * 
        FROM cart
        WHERE id=$1;`, [ id ]);

        if(!cart) {
            console.error("No Cart");
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

const getCartByUserId = async(userId) => {
    try {
        console.log("getCartByUserId", userId);

        const { rows: [ cart ] } = await db.query(`
        SELECT * 
        FROM cart
        WHERE "userId"=$1;`, [ userId ]);

        if(!cart) {
            console.error("No Carts match UserId");
            return;
        }
        return cart;
    } catch (err) {
        console.log("getCartByUserId error", err);
        throw err;
    }
}

const updateCartById = async(id, fields = {}) => {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [cart] } = await db.query(`
            UPDATE cart
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return cart;
    } catch (error) {
        console.log(error);
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
    getCartById,
    getCartByProductId,
    getCartByUserId,
    updateCartById,
    deleteCartById,
};
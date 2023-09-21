const db = require('./client')

const createProduct = async({ name, description, price, quantity, productType, inStock, isPopular, imgUrl }) => {
    try {
        const { rows: [ products ] } = await db.query(`
        INSERT INTO products(name, description, price, quantity, "inStock", "isPopular", "imgUrl" )
        VALUES($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (name) DO NOTHING
        RETURNING *`, [name, description, price, quantity, inStock, isPopular, imgUrl ]);

        return products;
    } catch (err) {
        throw err;
    }
}

const getAllProducts = async() => {
    try {
        const { rows: [ products ] } = await db.query(`
        SELECT * 
        FROM products`, []);

        if(!products) {
            console.error("No Products");
            return;
        }
        return products;
    } catch (err) {
        throw err;
    }
}

const getProductByName = async(name) => {
    try {
        const { rows: [ products ] } = await db.query(`
        SELECT * 
        FROM products
        WHERE name=$1;`, [ name ]);

        if(!products) {
            console.error("No Products");
            return;
        }
        return products;
    } catch (err) {
        throw err;
    }
}

const getProductByPrice = async(price) => {
    try {
        const { rows: [ products ] } = await db.query(`
        SELECT * 
        FROM products
        WHERE price=$1;`, [ price ]);

        if(!products) {
            console.error("No Products");
            return;
        }
        return products;
    } catch (err) {
        throw err;
    }
}

const getProductByQuantity = async(quantity) => {
    try {
        const { rows: [ products ] } = await db.query(`
        SELECT * 
        FROM products
        WHERE quantity=$1;`, [ quantity ]);

        if(!products) {
            console.error("No Products");
            return;
        }
        return products;
    } catch (err) {
        throw err;
    }
}

const getProductByProductType = async(productType) => {
    try {
        const { rows: [ products ] } = await db.query(`
        SELECT * 
        FROM products
        WHERE "productType"=$1;`, [ productType ]);

        if(!products) {
            console.error("No Products");
            return;
        }
        return products;
    } catch (err) {
        throw err;
    }
}

const getProductByIsPopular = async(isPopular) => {
    try {
        const { rows: [ products ] } = await db.query(`
        SELECT * 
        FROM products
        WHERE "isPopular"=$1;`, [ isPopular ]);

        if(!products) {
            console.error("No Products");
            return;
        }
        return products;
    } catch (err) {
        throw err;
    }
}



module.exports = {
    createProduct,
    getAllProducts,
    getProductByName,
    getProductByPrice,
    getProductByQuantity,
    getProductByProductType,
    getProductByIsPopular
};
const db = require('./client')

const createProduct = async({ name, description, price, quantity, productType, inStock, isPopular, imgUrl }) => {
    try {
        const { rows: [ products ] } = await db.query(`
        INSERT INTO products(name, description, price, quantity, "petType", "productType", "inStock", "isPopular", "imgUrl" )
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`, [name, description, price, quantity, petType, productType, inStock, isPopular, imgUrl ]);
        return products;
    } catch (err) {
        throw err;
    }
}

const getAllProducts = async() => {
    try {
        const { rows: products } = await db.query(`
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

const getProductById = async(id) => {
    try {
        const { rows: [ products ] } = await db.query(`
        SELECT * 
        FROM products
        WHERE id=$1;`, [ id ]);

        if(!products) {
            console.error("No Products with id");
            return;
        }
        return products;
    } catch (err) {
        throw err;
    }
}

const getProductByName = async(name) => {
    try {
        const { rows: products } = await db.query(`
        SELECT * 
        FROM products
        WHERE name=$1;`, [ name ]);

        if(!products) {
            console.error("No Products");
            return;
        }
        console.log(products, "here")
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

const getProductByPetType = async(petType) => {
    try {
        const { rows: [ products ] } = await db.query(`
        SELECT * 
        FROM products
        WHERE "petType"=$1;`, [ petType ]);

        if(!products) {
            console.error("No Products with that pet type");
            return;
        }
        return products;
    } catch (err) {
        console.log(err)
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
            console.error("No Products with that product type");
            return;
        }
        return products;
    } catch (err) {
        console.log(err)
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

const updateProductById = async(id, fields = {}) => {

    console.log(id, fields)
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');

    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [products] } = await db.query(`
            UPDATE products
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return products;
    } catch (error) {
        throw error;
    }
}

const deleteProductById = async(id) => {
    try {
        const { rows: [ products ] } = await db.query(`
        DELETE FROM products
        WHERE id=$1
        RETURNING *;`, [ id ]);

        if(!products) {
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
    getProductById,
    getProductByName,
    getProductByPrice,
    getProductByQuantity,
    getProductByPetType,
    getProductByProductType,
    getProductByIsPopular,
    updateProductById,
    deleteProductById,
};
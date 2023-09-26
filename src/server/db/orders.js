const db = require('./client')

const createOrder = async({ date, createdAt, productId, userId, trackingNumber }) => {
    try {
        const { rows: [ orders ] } = await db.query(`
        INSERT INTO orders(date, "createdAt", "productId", "userId", "trackingNumber")
        VALUES($1, $2, $3, $4, $5)
        ON CONFLICT ("trackingNumber") DO NOTHING
        RETURNING *`, [date, createdAt, productId, userId, trackingNumber]);

        return orders;
    } catch (err) {
        throw err;
    }
}

const getAllOrders = async() => {
        try {
            const { rows: [ orders ] } = await db.query(`
            SELECT * 
            FROM orders`, []);
    
            if(!orders) {
                console.error("No Orders");
                return;
            }
            return orders;
        } catch (err) {
            throw err;
        }
    }

const getOrderById = async(id) => {
    try {
        const { rows: [ orders ] } = await db.query(`
        SELECT * 
        FROM orders
        WHERE name=$1;`, [ id ]);
    
        if(!orders) {
            console.error("No Orders");
            return;
        }
        return orders;
    } catch (err) {
        throw err;
    }
}
    

const getOrderByDate = async(date) => {
    try {
        const { rows: [ orders ] } = await db.query(`
        SELECT * 
        FROM orders
        WHERE date=$1;`, [ date ]);

        if(!orders) {
            console.error("No Orders Match Date");
            return;
        }
        return orders;
    } catch (err) {
        throw err;
    }
}

const getOrderByProductId = async(productId) => {
    try {
        const { rows: [ orders ] } = await db.query(`
        SELECT * 
        FROM orders
        WHERE "productId"=$1;`, [ productId ]);

        if(!orders) {
            console.error("No Orders Match ProductId");
            return;
        }
        return orders;
    } catch (err) {
        throw err;
    }
}

const getOrderByUserId = async(userId) => {
    try {
        const { rows: [ orders ] } = await db.query(`
        SELECT * 
        FROM orders
        WHERE "userId"=$1;`, [ userId ]);

        if(!orders) {
            console.error("No Orders Match UserId");
            return;
        }
        return orders;
    } catch (err) {
        throw err;
    }
}

const getOrderByTrackingNumber = async(trackingNumber) => {
    try {
        const { rows: [ orders ] } = await db.query(`
        SELECT * 
        FROM orders
        WHERE "trackingNumber"=$1;`, [ trackingNumber ]);

        if(!orders) {
            console.error("No Orders Match Tracking Number");
            return;
        }
        return orders;
    } catch (err) {
        throw err;
    }
}

const updateOrderById = async(id, fields = {}) => {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [orders] } = await client.query(`
            UPDATE orders
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return orders;
    } catch (error) {
        throw error;
    }
}

const deleteOrderById = async(id) => {
    try {
        const { rows: [ orders ] } = await db.query(`
        DELETE FROM orders
        WHERE id=$1
        RETURNING *;`, [ id ]);

        if(!orders) {
            return;
        }
        return orders;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByDate,
    getOrderByProductId,
    getOrderByUserId,
    getOrderByTrackingNumber,
    updateOrderById,
    deleteOrderById,
};
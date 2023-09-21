const db = require('./client');
const { createUser } = require('./users');
const { createAdministrator } = require('./administrators')
const { createProduct } = require('./products');
const { createOrder } = require('./orders')
const { createCart } = require('./cart')
const { createReview } = require('./reviews')

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
  },
  // Add more user objects as needed
];  

// Insert starter information:

const administrators = []

const products = []

const orders = []

const carts = []

const reviews = []

//

const dropTables = async () => {
    try {
        await db.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS administrators;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS reviews;
        `)
    }
    catch(err) {
        throw err;
    }
}

const createTables = async () => {
    try{
        await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            token VARCHAR(255)
        );
        
        CREATE TABLE administrators(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            "adminToken" VARCHAR(255)
        );

        CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          name VARCHAR(225) DEFAULT 'name',
          description VARCHAR(255),
          price FLOAT,
          quantity INTEGER,
          "productType" VARCHAR(255),
          "inStock" BOOLEAN DEFAULT true,
          "isPopular" BOOLEAN DEFAULT true,
          "imgUrl" VARCHAR(255) DEFAULT NULL
      );
        
        CREATE TABLE orders(
            id SERIAL PRIMARY KEY,
            date DATE,
            "createdAt" TIMESTAMP,
            "productId" INTEGER[],
            "userId" INTEGER REFERENCES users(id),
            "trackingNumber" VARCHAR(255) UNIQUE
        );
          
                                          -- Cart NEEDS WORK
        CREATE TABLE cart(
            id SERIAL PRIMARY KEY,
            "productId" INTEGER[]
        );

        CREATE TABLE reviews(
          id SERIAL PRIMARY KEY,
          title varchar(255) NOT NULL,
          content TEXT NOT NULL,
          date DATE
          "productId" INTEGER REFERENCES products(id)
          "userId" INTEGER REFERENCES users(id)
        );

        `)
    }
    catch(err) {
        throw err;
    }
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({name: user.name, email: user.email, password: user.password, token: user.token});
    }
    console.log('Seed user data inserted successfully.');
  } catch (error) {
    console.error('Error seeding user data:', error);
  }
};

const insertAdministrators = async () => {
  try {
    for (const administrator of administrators) {
      await createAdministrator({name: administrator.name, email: administrator.email, password: administrator.password, token: administrator.token});
    }
    console.log('Seed administrator data inserted successfully.');
  } catch (error) {
    console.error('Error seeding administrator data:', error);
  }
};

const insertProducts = async () => {
  try {
    for (const product of products) {
      await createProduct({name: product.name,
                        description: product.description,
                        price: product.price,
                        quantity: product.quantity,
                        productType: product.productType,
                        inStock: product.inStock,
                        isPopular: product.isPopular,
                        imgUrl: product.imgUrl});
    }
    console.log('Seed products data inserted successfully.');
  } catch (error) {
    console.error('Error seeding products data:', error);
  }
};

const insertOrders = async () => {
  try {
    for (const order of orders) {
      await createOrder({date: order.date,
                        createdAt: order.createdAt,
                        productId: order.productId,
                        userId: order.userId,
                        trackingNumber: order.trackingNumber});
    }
    console.log('Seed orders data inserted successfully.');
  } catch (error) {
    console.error('Error seeding orders data:', error);
  }
};

const insertCart = async () => {
  try {
    for (const cart of carts) {
      await createCart({productId: cart.productId,});
    }
    console.log('Seed cart data inserted successfully.');
  } catch (error) {
    console.error('Error seeding cart data:', error);
  }
};

const insertReviews = async () => {
  try {
    for (const review of reviews) {
      await createReview({title: review.title,
                        content: review.content,
                        date: review.date,
                        productId: review.productId,
                        userId: review.userId});
    }
    console.log('Seed review data inserted successfully.');
  } catch (error) {
    console.error('Error seeding review data:', error);
  }
};


const seedDatabse = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await insertUsers();
        await insertAdministrators();
        await insertProducts();
        await insertOrders();
        await insertCart();
        await insertReviews();
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabse()

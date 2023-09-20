const db = require('./client');
const { createUser } = require('./users');

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

const dropTables = async () => {
    try {
        await db.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS administrators;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS orderItems;
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
        
        CREATE TABLE products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(225) DEFAULT 'name',
            description VARCHAR(255),
            price FLOAT,
            quantity INTEGER,
            "inStock" BOOLEAN DEFAULT true,
            "isPopular" BOOLEAN DEFAULT true,
            "imgUrl" VARCHAR(255) DEFAULT NULL
        );
        
        CREATE TABLE administrators(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            "adminToken" VARCHAR(255)
        );
        
        CREATE TABLE orders(
            id SERIAL PRIMARY KEY,
            date DATE,
            "createdAt" TIMESTAMP,
            "productId" INTEGER[],
            "userId" INTEGER REFERENCES users(id),
            "trackingNumber" VARCHAR(255) UNIQUE
        );

        CREATE TABLE orderItems(
            id SERIAL PRIMARY KEY,
            "productId" INTEGER[]
        );

        CREATE TABLE reviews(
          id SERIAL PRIMARY KEY,
          title varchar(255) NOT NULL,
          content TEXT NOT NULL,
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
      await createUser({name: user.name, email: user.email, password: user.password});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const seedDatabse = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await insertUsers();
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabse()

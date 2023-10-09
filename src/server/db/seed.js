const db = require('./client');
const { createUser } = require('./users');
const { createProduct } = require('./products');
const { createOrder } = require('./orders')
const { createCart } = require('./cart')
const { createReview } = require('./reviews');

const users = [
  {
    firstName: 'Liu',
    lastName: "Wei",
    email: 'liu@example.com',
    password: 'strongpass'
  },
  {
    firstName: 'Emily',
    lastName: "Johnson",
    email: 'emily@example.com',
    password: 'securepass'
  },
  {
    firstName: 'Isabella',
    lastName: "Garcia",
    email: 'bella@example.com',
    password: 'pass1234'
  },
  {
    firstName: 'Mohammed',
    lastName: "Ahmed",
    email: 'mohammed@example.com',
    password: 'mysecretpassword'
  },
  {
    firstName: 'John',
    lastName: "Smith",
    email: 'john@example.com',
    password: 'password123'
  },
  // Add more user objects as needed
];  

// Insert starter information:

const administrators = [
  {
    name: 'admin1',
    email: 'admin1@gmail.com',
    password: 'password123',
  },
]
const products = [
  {
    name: "toy1",
    description: "first toy",
    price: 10,
    quantity: 5,
    petType: "dog",
    productType: "toy",
    inStock: true,
    isPopular: true,
    imgUrl: "https://i5.walmartimages.com/seo/Multipet-Smiling-Dog-Loofa-Pals-Latex-Plush-Dog-Toy-Banana-Shaped_5510aba5-b44c-4ce3-91fc-226f49f65603.96dad7327bf73586c2685d44654b7764.png"
},
{
    name: "pet food 2",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 30,
    quantity: 12,
    petType: "cat",
    productType: "food",
    inStock: true,
    isPopular: true,
    imgUrl: "https://image.chewy.com/is/image/catalog/76091_MAIN._AC_SL1500_V1683817870_.jpg"
},
{
    name: "pet food 3",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 45,
    quantity: 7,
    petType: "dog",
    productType: "food",
    inStock: true,
    isPopular: false,
    imgUrl: "https://m.media-amazon.com/images/I/81xyE8OZBqL.jpg"
},
{
    name: "dog toy 3",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 18,
    quantity: 10,
    petType: "dog",
    productType: "toy",
    inStock: true,
    isPopular: true,
    imgUrl: "https://www.dailypaws.com/thmb/QFu1znLVvV5myz7_29sa1mI6lvI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Chew-King-Fetch-Balls-56a65d4ac8c442e78bf45992a3007336.jpg"
},
{
    name: "bird cage 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 50,
    quantity: 20,
    petType: "bird",
    productType: "cage",
    inStock: true,
    isPopular: true,
    imgUrl: "https://m.media-amazon.com/images/I/91gb6kQF-xL._AC_UF1000,1000_QL80_.jpg"
},
{
    name: "reptile tank 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 70,
    quantity: 5,
    petType: "reptile-amphibian",
    productType: "tank",
    inStock: true,
    isPopular: true,
    imgUrl: "https://reptizoo.store/cdn/shop/products/20gallon-snake_8bb3fe5b-f9fb-4d70-b43c-d90aeaed06bd.jpg?v=1658291367"
},
{
    name: "dog bed 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 30,
    quantity: 14,
    petType: "dog",
    productType: "bed",
    inStock: true,
    isPopular: false,
    imgUrl: "https://i5.walmartimages.com/seo/Vibrant-Life-Small-Cuddler-Dog-Bed-Gray_664bc6a9-ea04-4248-bdca-49e86f99aa68.7e65d8b17d5cfaeb7494617d2f25c735.jpeg"
},
{
    name: "cat tree 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 55,
    quantity: 2,
    petType: "cat",
    productType: "tree",
    inStock: true,
    isPopular: false,
    imgUrl: "https://target.scene7.com/is/image/Target/GUEST_3985506d-a8fc-4ecb-857f-c42c201ddb16?wid=488&hei=488&fmt=pjpeg"
},
{
    name: "dog accessory 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 20,
    quantity: 20,
    petType: "dog",
    productType: "accessory",
    inStock: true,
    isPopular: true,
    imgUrl: "https://target.scene7.com/is/image/Target/GUEST_e1e6d270-1297-48c3-8718-fc9b2dd92902?wid=1200&hei=1200&qlt=80&fmt=webp"
},
{
    name: "bird food 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 25,
    quantity: 0,
    petType: "bird",
    productType: "food",
    inStock: false,
    isPopular: true,
    imgUrl: "https://images.thdstatic.com/productImages/9508b72a-fc64-4514-a670-5629e65c4985/svn/pennington-bird-seed-food-100542060-64_1000.jpg"
},
{
    name: "reptile lighting 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 32,
    quantity: 4,
    petType: "reptile-amphibian",
    productType: "heating-lighting",
    inStock: true,
    isPopular: false,
    imgUrl: "https://healthlighting.com/cdn/shop/products/UVB-Reptile-Basking-Lamp_1200x1200.jpg?v=1617139396"
}
]

const orders = [
  {
    date: '2023-09-21',
    createdAt: '2023-09-21 18:58:20',
    productId: 1,
    userId: 1,
    trackingNumber: 12365645,
  }
]

const carts = [
  {
    productId: [1]
  }
]

const reviews = [
  {
    title: 'review',
    content: 'some stuff',
    date: '2023-09-21',
    productId: 1,
    userId: 1,
  }
]

//:

const dropTables = async () => {
    try {
        await db.query(`
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS users;
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
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            address VARCHAR (255),
            "firstName" VARCHAR(255),
            "lastName" VARCHAR(255),
            "isAdministrator" BOOLEAN DEFAULT false
        );

        CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          name VARCHAR(225) UNIQUE NOT NULL,
          description VARCHAR(255),
          price FLOAT,
          quantity INTEGER,
          "petType" VARCHAR(255),
          "productType" VARCHAR(255),
          "inStock" BOOLEAN DEFAULT true,
          "isPopular" BOOLEAN DEFAULT true,
          "imgUrl" VARCHAR(255) DEFAULT NULL
      );
        
        CREATE TABLE orders(
            id SERIAL PRIMARY KEY,
            date DATE,
            "createdAt" TIMESTAMP,
            "productId" INTEGER,
            "userId" INTEGER REFERENCES users(id),
            "trackingNumber" VARCHAR(255) UNIQUE
        );
          
                                          -- Cart NEEDS WORK
        CREATE TABLE cart(
            id SERIAL PRIMARY KEY,
            "productId" INTEGER[],
            "userId" INTEGER REFERENCES users(id)
        );

        CREATE TABLE reviews(
          id SERIAL PRIMARY KEY,
          title varchar(255) NOT NULL,
          content TEXT NOT NULL,
          date DATE,
          "productId" INTEGER REFERENCES products(id),
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
    for (let user of users) {
      const _user = await createUser({ firstName: user.firstName, 
                         lastName: user.lastName, 
                         email: user.email, 
                         password: user.password });
      console.log(_user);
      await addCartToUser(_user.id);
    }
    console.log('Seed user data inserted successfully.');
  } catch (error) {
    console.error('Error seeding user data:', error);
  }
};

const addCartToUser = async (userId) => {
  console.log("userId addCartToUser", userId);
  await createCart({ productId:[], userId });
}

// const insertAdministrators = async () => {
//   try {
//     for (const administrator of administrators) {
//       await createAdministrator({name: administrator.name, email: administrator.email, password: administrator.password, token: administrator.token});
//     }
//     console.log('Seed administrator data inserted successfully.');
//   } catch (error) {
//     console.error('Error seeding administrator data:', error);
//   }
// };

const insertProducts = async () => {
  try {
    for (const product of products) {
      await createProduct({name: product.name,
                        description: product.description,
                        price: product.price,
                        quantity: product.quantity,
                        petType: product.petType,
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
      await createCart({productId: cart.productId, userId: 1});
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

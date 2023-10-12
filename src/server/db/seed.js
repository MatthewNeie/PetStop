const db = require('./client');
const { createUser } = require('./users');
const { createProduct } = require('./products');
const { createOrder } = require('./orders')
const { createCart } = require('./cart')
const { createReview } = require('./reviews');

const users = [
  {
    firstName: 'Guest Access',
    lastName: "Guest Access",
    email: 'guest@guest.com',
    password: 'strongpass',
    isAdministrator: false
  },
  {
    firstName: 'Emily',
    lastName: "Johnson",
    email: 'emily@example.com',
    password: 'securepass',
    isAdministrator: false,
  },
  {
    firstName: 'Isabella',
    lastName: "Garcia",
    email: 'bella@example.com',
    password: 'pass1234',
    isAdministrator: false,
  },
  {
    firstName: 'Mohammed',
    lastName: "Ahmed",
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
    isAdministrator: false,
  },
  {
    firstName: 'John',
    lastName: "Smith",
    email: 'john@example.com',
    password: 'password123',
    isAdministrator: false,
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
    name: "dog toy 1",
    description: "first toy",
    price: 7.99,
    quantity: 5,
    petType: "dog",
    productType: "toy",
    inStock: true,
    isPopular: true,
    imgUrl: "https://i5.walmartimages.com/seo/Multipet-Smiling-Dog-Loofa-Pals-Latex-Plush-Dog-Toy-Banana-Shaped_5510aba5-b44c-4ce3-91fc-226f49f65603.96dad7327bf73586c2685d44654b7764.png"
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
    name: "cat toy 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 14,
    quantity: 30,
    petType: "cat",
    productType: "toy",
    inStock: true,
    isPopular: false,
    imgUrl: "https://www.coastalpet.com/remote.axd/images.salsify.com/image/upload/s--R8yRy57W--/bxi15tyclkyhwyifcrvu.jpg?format=webp&quality=80"
  },
  {
    name: "dog house 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 60,
    quantity: 8,
    petType: "dog",
    productType: "house",
    inStock: true,
    isPopular: false,
    imgUrl: "https://sp.menardc.com/main/items/media/SUNCA001/ProductMedium/2536210-DH251_WS.jpg"
  },
  {
    name: "bird toy 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 9,
    quantity: 25,
    petType: "bird",
    productType: "toy",
    inStock: true,
    isPopular: false,
    imgUrl: "https://assets.petco.com/petco/image/upload/f_auto,q_auto/1204335-center-1"
  },
  {
    name: "reptile food 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 19,
    quantity: 10,
    petType: "reptile-amphibian",
    productType: "food",
    inStock: true,
    isPopular: false,
    imgUrl: "https://m.media-amazon.com/images/I/81zF+00YbQL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    name: "cat scratcher 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 29,
    quantity: 14,
    petType: "cat",
    productType: "scratcher",
    inStock: true,
    isPopular: true,
    imgUrl: "https://assets.petco.com/petco/image/upload/f_auto,q_auto/3312421-center-1"
  },
  {
    name: "cat bed 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 14,
    quantity: 13,
    petType: "cat",
    productType: "bed",
    inStock: true,
    isPopular: false,
    imgUrl: "https://assets.petco.com/petco/image/upload/f_auto,q_auto/3124244-center-1"
  },
  {
    name: "dog cage 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 79,
    quantity: 8,
    petType: "dog",
    productType: "cage",
    inStock: true,
    isPopular: false,
    imgUrl: "https://assets.wfcdn.com/im/91506296/resize-h445%5Ecompr-r85/2255/22554978/Brianna+Double+Door+Foldable+Pet+Crate.jpg"
  },
  {
    name: "bird accessory 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 9,
    quantity: 24,
    petType: "bird",
    productType: "accessory",
    inStock: true,
    isPopular: true,
    imgUrl: "https://ae01.alicdn.com/kf/Sda178eb79d4e4780a7938b9d513ce0d6r.jpg"
  },
  {
    name: "reptile accessory 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 14,
    quantity: 27,
    petType: "reptile-amphibian",
    productType: "accessory",
    inStock: true,
    isPopular: false,
    imgUrl: "https://s7d2.scene7.com/is/image/PetSmart/5229837?$CLEARjpg$"
  },
  {
    name: "cat litter box 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 19,
    quantity: 16,
    petType: "cat",
    productType: "litter-box",
    inStock: true,
    isPopular: false,
    imgUrl: "https://www.hartz.com/wp-content/uploads/2016/12/3270081136_Hartz_cat_litter_tray_beige_angle_1300x1300-1.jpg"
  },
  {
    name: "cat accessory 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 16.99,
    quantity: 10,
    petType: "cat",
    productType: "accessory",
    inStock: true,
    isPopular: false,
    imgUrl: "https://image.chewy.com/is/image/catalog/708182_MAIN._AC_SL600_V1689278359_.jpg"
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
  },
  {
    name: "reptile lighting 2",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 24.99,
    quantity: 4,
    petType: "reptile-amphibian",
    productType: "heating-lighting",
    inStock: true,
    isPopular: true,
    imgUrl: "https://cdn.shopify.com/s/files/1/0089/8567/3828/products/PHAL75boxwithbulb_1600x.jpg?v=1631807882"
  },
  {
    name: "reptile lighting 3",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 39.99,
    quantity: 4,
    petType: "reptile-amphibian",
    productType: "heating-lighting",
    inStock: true,
    isPopular: false,
    imgUrl: "https://www.reptiledeli.com/cdn/shop/products/PhotoRoom-20220707_102725_2000x.png?v=1657205087"
  },
  {
    name: "reptile lighting 4",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 19.99,
    quantity: 4,
    petType: "reptile-amphibian",
    productType: "heating-lighting",
    inStock: true,
    isPopular: false,
    imgUrl: "https://www.zillarules.com/-/media/project/oneweb/zilla/images/products-homepage/product-images/lighting-heating/heatuvb-baskingfixture/096316280823main.jpg"
  },
  {
    name: "reptile lighting 5",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 29.99,
    quantity: 4,
    petType: "reptile-amphibian",
    productType: "heating-lighting",
    inStock: true,
    isPopular: false,
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROKYizjb6PNVcLRWs5yFv48S0RrzPe5scjjw&usqp=CAU"
  },
  {
    name: "cat accessory 2",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 14.99,
    quantity: 10,
    petType: "cat",
    productType: "accessory",
    inStock: true,
    isPopular: false,
    imgUrl: "https://www.dailypaws.com/thmb/6adQMIFI7lYSKMEZMKnfsZNO5Yo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/frisco-fair-isle-fleece-lined-cat-hoodie-e3533e8625ca4a52a7de0ab81d4a8638.jpg"
  },
  {
    name: "cat accessory 3",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 9.99,
    quantity: 10,
    petType: "cat",
    productType: "accessory",
    inStock: true,
    isPopular: false,
    imgUrl: "https://m.media-amazon.com/images/I/71QUVzVFaCL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
  },
  {
    name: "cat accessory 4",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 19.99,
    quantity: 10,
    petType: "cat",
    productType: "accessory",
    inStock: true,
    isPopular: true,
    imgUrl: "https://m.media-amazon.com/images/I/71L1a9dPM+L._AC_SY300_SX300_.jpg"
  },
  {
    name: "cat accessory 5",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 29.99,
    quantity: 10,
    petType: "cat",
    productType: "accessory",
    inStock: true,
    isPopular: false,
    imgUrl: "https://m.media-amazon.com/images/I/61OZFvaCC3L.__AC_SX300_SY300_QL70_FMwebp_.jpg"
  },
  {
    name: "cat accessory 6",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 24.99,
    quantity: 10,
    petType: "cat",
    productType: "accessory",
    inStock: true,
    isPopular: true,
    imgUrl: "https://m.media-amazon.com/images/I/51osWpjrdoL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
  },
  {
    name: "bird toy 2",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 12.99,
    quantity: 20,
    petType: "bird",
    productType: "toy",
    inStock: true,
    isPopular: false,
    imgUrl: "https://image.chewy.com/is/image/catalog/228196_MAIN._AC_SL600_V1668531877_.jpg"
  },
  {
    name: "bird toy 3",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 7.99,
    quantity: 25,
    petType: "bird",
    productType: "toy",
    inStock: true,
    isPopular: false,
    imgUrl: "https://s7d2.scene7.com/is/image/PetSmart/5297829?$CLEARjpg$"
  },
  {
    name: "bird toy 4",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 14.99,
    quantity: 25,
    petType: "bird",
    productType: "toy",
    inStock: true,
    isPopular: true,
    imgUrl: "https://m.media-amazon.com/images/I/51mI-AWMx4L.jpg"
  },
  {
    name: "bird toy 5",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 12.99,
    quantity: 25,
    petType: "bird",
    productType: "toy",
    inStock: true,
    isPopular: false,
    imgUrl: "https://image.chewy.com/is/image/catalog/138695_MAIN._AC_SL600_V1662671535_.jpg"
  },
  {
    name: "dog house 2",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 99.99,
    quantity: 8,
    petType: "dog",
    productType: "house",
    inStock: true,
    isPopular: false,
    imgUrl: "https://image.chewy.com/is/image/catalog/734502_MAIN._AC_SS108_V1670536608_.jpg"
  },
  {
    name: "dog house 3",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 49.99,
    quantity: 4,
    petType: "dog",
    productType: "house",
    inStock: true,
    isPopular: false,
    imgUrl: "https://image.chewy.com/is/image/catalog/235496_MAIN._AC_SL600_V1591025563_.jpg"
  },
  {
    name: "dog house 4",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 59.99,
    quantity: 8,
    petType: "dog",
    productType: "house",
    inStock: true,
    isPopular: true,
    imgUrl: "https://s7d2.scene7.com/is/image/PetSmart/5180848?$CLEARjpg$"
  },
  {
    name: "dog house 5",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 129.99,
    quantity: 10,
    petType: "dog",
    productType: "house",
    inStock: true,
    isPopular: false,
    imgUrl: "https://images.thdstatic.com/productImages/5e29a04a-92c1-4219-8e6d-c1bd0c139d8b/svn/brown-dog-houses-air80-64_600.jpg"
  },
  {
    name: "cat bed 2",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 14.99,
    quantity: 13,
    petType: "cat",
    productType: "bed",
    inStock: true,
    isPopular: false,
    imgUrl: "https://s7d2.scene7.com/is/image/PetSmart/5338566?$CLEARjpg$"
  },
  {
    name: "cat bed 3",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 19.99,
    quantity: 13,
    petType: "cat",
    productType: "bed",
    inStock: true,
    isPopular: true,
    imgUrl: "https://catit.us/cdn/shop/products/121fa5a8445fb7c03743c010863b341ed2ef1e61.jpg?v=1687983928&width=823"
  },
  {
    name: "cat bed 4",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 14.99,
    quantity: 13,
    petType: "cat",
    productType: "bed",
    inStock: true,
    isPopular: false,
    imgUrl: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/8d9fe868d16649fb623404f89195fd4c.jpg?imageView2/2/w/800/q/70"
  },
  {
    name: "cat bed 5",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 24.99,
    quantity: 13,
    petType: "cat",
    productType: "bed",
    inStock: true,
    isPopular: false,
    imgUrl: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/eafa9f626065ab686cca9ceb3f5b33bd.jpg?imageView2/2/w/800/q/70"
  },

  {
    name: "cat food 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 6.99,
    quantity: 12,
    petType: "cat",
    productType: "food",
    inStock: true,
    isPopular: true,
    imgUrl: "https://image.chewy.com/is/image/catalog/76091_MAIN._AC_SL1500_V1683817870_.jpg"
  },
  {
    name: "dog food 1",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 29.99,
    quantity: 7,
    petType: "dog",
    productType: "food",
    inStock: true,
    isPopular: false,
    imgUrl: "https://m.media-amazon.com/images/I/81xyE8OZBqL.jpg"
  },
  {
    name: "dog toy 2",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 16.99,
    quantity: 10,
    petType: "dog",
    productType: "toy",
    inStock: true,
    isPopular: true,
    imgUrl: "https://www.dailypaws.com/thmb/QFu1znLVvV5myz7_29sa1mI6lvI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Chew-King-Fetch-Balls-56a65d4ac8c442e78bf45992a3007336.jpg"
  },
  {
    name: "bird food 2",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 14.99,
    quantity: 0,
    petType: "bird",
    productType: "food",
    inStock: false,
    isPopular: false,
    imgUrl: "https://assets.petco.com/petco/image/upload/f_auto,q_auto/3541953-center-1"
  },
  {
    name: "bird food 3",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 9.99,
    quantity: 0,
    petType: "bird",
    productType: "food",
    inStock: false,
    isPopular: false,
    imgUrl: "https://i5.walmartimages.com/seo/Kaytee-Forti-Diet-Parrot-Food-Feather-Health-8-lb_2eeb8494-2461-48ca-a2aa-b0cdb3fdff71.e83fe1c0dec97071c8f2b9d212198883.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF"
  },
  {
    name: "bird food 4",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 12.99,
    quantity: 0,
    petType: "bird",
    productType: "food",
    inStock: false,
    isPopular: true,
    imgUrl: "https://target.scene7.com/is/image/Target/GUEST_010dc9ec-f86a-46b8-b226-1a203184054e?wid=488&hei=488&fmt=pjpeg"
  },
  {
    name: "bird food 5",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 19.99,
    quantity: 0,
    petType: "bird",
    productType: "food",
    inStock: false,
    isPopular: false,
    imgUrl: "https://www.fmbrown.com/wp-content/uploads/2017/10/40780.jpg"
  },
  {
    name: "dog accessory 2",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 17.99,
    quantity: 4,
    petType: "dog",
    productType: "accessory",
    inStock: true,
    isPopular: false,
    imgUrl: "https://s7d2.scene7.com/is/image/PetSmart/5336630?$CLEARjpg$"
  },
  {
    name: "dog accessory 3",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 14.99,
    quantity: 4,
    petType: "dog",
    productType: "accessory",
    inStock: true,
    isPopular: false,
    imgUrl: "https://img.fruugo.com/product/5/68/618152685_max.jpg"
  },
  {
    name: "dog accessory 4",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 24.99,
    quantity: 4,
    petType: "dog",
    productType: "accessory",
    inStock: true,
    isPopular: false,
    imgUrl: "https://www.sparkpaws.com/cdn/shop/products/DSC_1393.jpg?v=1626362098"
  },
  {
    name: "dog accessory 5",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 19.99,
    quantity: 4,
    petType: "dog",
    productType: "accessory",
    inStock: true,
    isPopular: true,
    imgUrl: "https://img.fruugo.com/product/4/00/611158004_max.jpg"
  },
  {
    name: "dog bed 2",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 14.99,
    quantity: 23,
    petType: "dog",
    productType: "bed",
    inStock: true,
    isPopular: false,
    imgUrl: "https://s7d2.scene7.com/is/image/PetSmart/5214094?$CLEARjpg$"
  },
  {
    name: "dog bed 3",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 19.99,
    quantity: 13,
    petType: "dog",
    productType: "bed",
    inStock: true,
    isPopular: false,
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ40qByw_xCPgXF_hQqwOIxDKl6hIvJJw5alw&usqp=CAU"
  },
  {
    name: "dog bed 4",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 23.99,
    quantity: 18,
    petType: "dog",
    productType: "bed",
    inStock: true,
    isPopular: false,
    imgUrl: "https://assets.petco.com/petco/image/upload/f_auto%2Cq_auto/3323825-center-1?$Zoom$"
  },
  {
    name: "dog bed 5",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    price: 27.99,
    quantity: 14,
    petType: "dog",
    productType: "bed",
    inStock: true,
    isPopular: true,
    imgUrl: "https://assets.wfcdn.com/im/17894169/resize-h445%5Ecompr-r85/6184/61843397/Serta+Quilted+Couch+Pet+Bed.jpg"
  },

]

const cartProducts = [
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
    products: [
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
    ],
    userId: 2
  }
]

const reviews = [
  {
    title: 'Great Item!',
    content: 'My pet loved it',
    date: '2023-09-21',
    productId: 1,
    userId: 1,
  },
  {
    title: 'Needs more colors!',
    content: 'I really like the product... Hopefully, there are more color selections!',
    date: '2023-09-22',
    productId: 1,
    userId: 2,
  },
  {
    title: 'Awesome purchase',
    content: 'Coolest thing ever.',
    date: '2023-09-23',
    productId: 2,
    userId: 3,
  },
  {
    title: 'My Pet loved it!',
    content: 'Great item. Thank you!',
    date: '2023-09-24',
    productId: 2,
    userId: 4,
  },
  {
    title: 'Coolest thing ever',
    content: 'My pet loved it. Awesome purchase!',
    date: '2023-09-25',
    productId: 4,
    userId: 5,
  },

  {
    title: 'Fantastic Product',
    content: 'My pet can\'t get enough of it!',
    date: '2023-09-26',
    productId: 5,
    userId: 1,
  },
  {
    title: 'Very satisfied',
    content: 'This product exceeded my expectations.',
    date: '2023-09-27',
    productId: 3,
    userId: 2,
  },
  {
    title: 'Impressive quality',
    content: 'The quality of this product is impressive.',
    date: '2023-09-28',
    productId: 6,
    userId: 3,
  },
  {
    title: 'Highly recommend',
    content: 'I would highly recommend this product to others.',
    date: '2023-09-29',
    productId: 7,
    userId: 4,
  },
  {
    title: 'Great value',
    content: 'This product is a great value for the price.',
    date: '2023-09-30',
    productId: 8,
    userId: 5,
  },
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
  catch (err) {
    throw err;
  }
}

const createTables = async () => {
  try {
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
            "products" JSONB[],
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
  catch (err) {
    throw err;
  }
}

const insertUsers = async () => {
  try {
    for (let user of users) {
      const _user = await createUser({ 
                        firstName: user.firstName, 
                        lastName: user.lastName, 
                        email: user.email, 
                        password: user.password, 
                        isAdministrator: user.isAdministrator
                      });
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
  console.log("addCartToUser", cartProducts);
  await createCart({ products:cartProducts , userId });
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
      await createProduct({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        petType: product.petType,
        productType: product.productType,
        inStock: product.inStock,
        isPopular: product.isPopular,
        imgUrl: product.imgUrl
      });
    }
    console.log('Seed products data inserted successfully.');
  } catch (error) {
    console.error('Error seeding products data:', error);
  }
};

const insertOrders = async () => {
  try {
    for (const order of orders) {
      await createOrder({
        date: order.date,
        createdAt: order.createdAt,
        productId: order.productId,
        userId: order.userId,
        trackingNumber: order.trackingNumber
      });
    }
    console.log('Seed orders data inserted successfully.');
  } catch (error) {
    console.error('Error seeding orders data:', error);
  }
};

const insertCart = async () => {
  try {
    for (const cart of carts) {
      await createCart(cart);
    }
    console.log('Seed cart data inserted successfully.');
  } catch (error) {
    console.error('Error seeding cart data:', error);
  }
};

const insertReviews = async () => {
  try {
    for (const review of reviews) {
      await createReview({
        title: review.title,
        content: review.content,
        date: review.date,
        productId: review.productId,
        userId: review.userId
      });
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

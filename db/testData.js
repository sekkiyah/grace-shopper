const { faker, FakerError } = require('@faker-js/faker');

const createFakeUser = async () => {
  const fakeUser = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    isAdmin: faker.datatype.boolean(),
    isBanned: faker.datatype.boolean(),
    passwordResetRequired: faker.datatype.boolean(),
  };

  return fakeUser;
};
const createFakeProduct = async () => {
  const fakeProduct = {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(25, 1000, 2),
    inventory: faker.datatype.number({ max: 100 }),
  };

  return fakeProduct;
};
const createFakeProductReview = async () => {
  const fakeProductReview = {
    rating: faker.datatype.number({ min: 1, max: 5 }),
    title: faker.random.words(3),
    content: faker.random.words(30),
  };

  return fakeProductReview;
};
const createFakeCartItem = async () => {
  const fakeCartItem = {
    quantity: faker.datatype.number({ max: 10 }),
  };

  return fakeCartItem;
};

const createFakeProductImage = async () => {
  return faker.image.imageUrl(640, 480, 'toy');
};

const createFakeCategory = async () => {
  fakeCategory = {
    name: faker.commerce.department(),
  };

  return fakeCategory;
};

const createFakeOrderHistory = async () => {
  fakeOrderHistory = {
    status: faker.helpers.fake('Status: Complete'),
    total: faker.commerce.price(25, 1000, 2),
  };

  return fakeOrderHistory;
};

const createFakeOrderDetail = async () => {
  fakeOrderDetail = {
    quantity: faker.datatype.number({ max: 10 }),
    price: faker.commerce.price(25, 1000, 2),
  };

  return fakeOrderDetail;
};

const createFakePromoCodes = async () => {
  fakePromoCode = {
    code: faker.datatype.uuid(),
    flatDiscount: faker.commerce.price(5, 25, 2),
    percentDiscount: faker.datatype.float({ max: 100 }),
  };

  return fakePromoCode;
};

const generateUsers = async (numberOfUsers = 1) => {
  const users = [];
  for (let i = 0; i < numberOfUsers; i++) {
    users.push(await createFakeUser());
  }
  return users;
};

const generateProducts = async (numberOfProducts = 1) => {
  const products = [];
  for (let i = 0; i < numberOfProducts; i++) {
    products.push(await createFakeProduct());
  }
  return products;
};

const generateFakeProductReviews = async (numberOfReviews = 1) => {
  const reviews = [];
  for (let i = 0; i < numberOfReviews; i++) {
    let review = await createFakeProductReview();
    reviews.push(review);
  }
  return reviews;
};

const generateFakeCartItems = async (numberOfItems = 1) => {
  const items = [];
  for (let i = 0; i < numberOfItems; i++) {
    items.push(await createFakeCartItem());
  }
  return items;
};

const generateProductImages = async (numberOfImages = 1, productId) => {
  if (productId) {
    const images = [];
    for (let i = 0; i < numberOfImages; i++) {
      let imageURL = await createFakeProductImage();
      images.push({ imageURL, productId });
    }
    return images;
  } else {
    console.error('Product ID missing for generateProductImages');
  }
};

const generateFakeCategories = async (numberOfCategories = 1) => {
  const categories = [];
  for (let i = 0; i < numberOfCategories; i++) {
    categories.push(await createFakeCategory());
  }
  return categories;
};

const generateFakeOrderHistories = async (numberOfOrderHistories = 1) => {
  const orderHistories = [];
  for (let i = 0; i < numberOfOrderHistories; i++) {
    orderHistories.push(await createFakeOrderHistory());
  }
  return orderHistories;
};

const generateFakeOrderDetails = async (numberOfOrderDetails = 1) => {
  const orderDetails = [];
  for (let i = 0; i < numberOfOrderDetails; i++) {
    orderDetails.push(await createFakeOrderDetail());
  }
  return orderDetails;
};

const generateFakePromoCodes = async (numberOfPromoCodes = 1) => {
  const promoCodes = [];
  for (let i = 0; i < numberOfPromoCodes; i++) {
    promoCodes.push(await createFakePromoCodes());
  }
  return promoCodes;
};

module.exports = {
  generateUsers,
  generateProducts,
  generateFakeCartItems,
  generateFakeCategories,
  generateFakeOrderDetails,
  generateFakeProductReviews,
  generateProductImages,
  generateFakeOrderHistories,
  generateFakePromoCodes,
};

const { faker, FakerError } = require('@faker-js/faker');
const { user } = require('pg/lib/defaults');

function createFakeUser(){
    const fakeUser = {
        userId: faker.datatype.uuid(), //will remove before pushing through database
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        isAdmin: faker.datatype.boolean(),
        isBanned: faker.datatype.boolean(),
        passwordResetRequired: faker.datatype.boolean()
    };
    return fakeUser;
}
function createFakeProduct(){
    const fakeProduct = {
        productId: faker.datatype.uuid(), //will remove before pushing through database
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(25, 1000, 2, '$'),
        inventory: faker.datatype.number({ max: 100 })
    };
    return fakeProduct;
}
function createFakeProductReview (userId, productId) {
    const fakeProductReview = {
        reviewId: faker.datatype.uuid(), //will remove before pushing through database
        userId: userId,
        productId: productId,
        rating: faker.datatype.number({ max: 5 }),
        title: faker.random.words(3),
        content: faker.random.words(30)
    };
    return fakeProductReview;
}
function createFakeCartItem(userId, productId){
    const fakeCartItem = {
        userId: userId,
        productId: productId,
        quantity: faker.datatype.number({ max: 10 })
    };
    return fakeCartItem;
}

function createFakeProductImage(productId){
    fakeImage = {
        productId: productId,
        imageURL: faker.image.imageUrl('cat', true)
    };
    return fakeImage;
}

function createFakeProductCategory(categoryId, productId){
    fakeProductCategory = {
        categoryId: categoryId,
        productId: productId
    };
    return fakeProductCategory;
}

function createFakeCategory(){
    fakeCategory = {
        name: faker.commerce.department()
    };
    return fakeCategory;
}

function createFakeOrderHistory(userId, orderId){
    fakeOrderHistory = {
        userId: userId,
        orderId: orderId,
        status: faker.helpers.fake('Status: Complete'),
        total: faker.commerce.price(25, 1000, 2, '$')
    };
    return fakeOrderHistory;
}

function createFakeOrderDetail(productId){
    fakeOrderDetail = {
        productId: productId,
        quantity: faker.datatype.number({ max: 10 }),
        price: faker.commerce.price(25, 1000, 2, '$')
    }
}

function createFakeUserWishlist(userId, productId){
    fakeWishlist = {
        userId: userId,
        productId: productId
    };
    return fakeWishlist;
}

function createFakePromoCodes(productId){
    fakePromoCode = {
        productId: productId,
        code: faker.datatype.uuid(),
        flatDiscount: faker.commerce.price(5, 25, 2, '$'),
        percentDiscount: faker.datatype.float({ max: 100 })
    }
}

function  populateFakeUserArray(){
    let userArray = [];
    for(let i = 0; i < 10; i++){
        let newFakeUser = createFakeUser();
        userArray.push(newFakeUser)
    }
    return userArray;
}
function populateFakeProductsArray(){
    let productsArray = [];
    for(let i = 0; i < 10; i++){
        let newFakeProduct = createFakeProduct();
        productsArray.push(newFakeProduct)
    }
    return productsArray;
}
let fakeUsers =  populateFakeUserArray()
let fakeProducts = populateFakeProductsArray()

function populateFakeReviewsArray(fakeUsers, fakeProducts){
    let reviewsArray = [];
    let counter = 0;
    while(counter < 3){
        let userId = fakeUsers[counter].userId;
        let productId = fakeProducts[counter].productId;
        let newFakeReview = createFakeProductReview(userId, productId);
        reviewsArray.push(newFakeReview);
        counter++
    }
    return reviewsArray
}
console.log(populateFakeReviewsArray(fakeUsers, fakeProducts))


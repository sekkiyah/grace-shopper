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
        passwordResetRequired: faker.datatype.boolean()
    }
    return fakeUser;
}
const createFakeProduct = async () => {
    const fakeProduct = {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(25, 1000, 2, '$'),
        inventory: faker.datatype.number({ max: 100 })
    }
    return fakeProduct
}

function populateFakeUserArray(){
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
    return productsArray
}
let fakeUsers = populateFakeUserArray()
let fakeProducts = populateFakeProductsArray()
console.log(fakeUsers)
console.log(fakeProducts)


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
		price: faker.commerce.price(25, 1000, 2, '$'),
		inventory: faker.datatype.number({ max: 100 }),
	};

	return fakeProduct;
};
const createFakeProductReview = async (userId, productId) => {
	if (!userId) {
		const user = await createFakeUser();
		userId = user.id;
	}

	if (!productId) {
		const product = await createFakeProduct();
		productId = product.id;
	}

	const fakeProductReview = {
		userId: userId,
		productId: productId,
		rating: faker.datatype.number({ max: 5 }),
		title: faker.random.words(3),
		content: faker.random.words(30),
	};

	return fakeProductReview;
};
const createFakeCartItem = async (userId, productId) => {
	if (!userId) {
		const user = await createFakeUser();
		userId = user.id;
	}

	if (!productId) {
		const product = await createFakeProduct();
		productId = product.id;
	}

	const fakeCartItem = {
		userId: userId,
		productId: productId,
		quantity: faker.datatype.number({ max: 10 }),
	};

	return fakeCartItem;
};

const createFakeProductImage = async productId => {
	if (!productId) {
		const product = await createFakeProduct();
		productId = product.id;
	}

	fakeImage = {
		productId: productId,
		imageURL: faker.image.imageUrl('cat', true),
	};

	return fakeImage;
};

const createFakeProductCategory = async (categoryId, productId) => {
	if (!categoryId) {
		const category = await createFakeCategory();
		categoryId = category.id;
	}

	if (!productId) {
		const product = await createFakeProduct();
		productId = product.id;
	}

	fakeProductCategory = {
		categoryId: categoryId,
		productId: productId,
	};

	return fakeProductCategory;
};

const createFakeCategory = async () => {
	fakeCategory = {
		name: faker.commerce.department(),
	};

	return fakeCategory;
};

const createFakeOrderHistory = async (userId, orderId) => {
	if (!userId) {
		const user = await createFakeUser();
		userId = user.id;
	}

	if (!orderId) {
		const order = await createFakeOrderDetail();
		orderId = order.id;
	}

	fakeOrderHistory = {
		userId: userId,
		orderId: orderId,
		status: faker.helpers.fake('Status: Complete'),
		total: faker.commerce.price(25, 1000, 2, '$'),
	};

	return fakeOrderHistory;
};

const createFakeOrderDetail = async productId => {
	if (!productId) {
		const product = await createFakeProduct();
		productId = product.id;
	}

	fakeOrderDetail = {
		productId: productId,
		quantity: faker.datatype.number({ max: 10 }),
		price: faker.commerce.price(25, 1000, 2, '$'),
	};

	return fakeOrderDetail;
};

const createFakeUserWishlist = async (userId, productId) => {
	if (!userId) {
		const user = await createFakeUser();
		userId = user.id;
	}

	if (!productId) {
		const product = await createFakeProduct();
		productId = product.id;
	}

	fakeWishlist = {
		userId: userId,
		productId: productId,
	};

	return fakeWishlist;
};

const createFakePromoCodes = async productId => {
	if (!productId) {
		const product = await createFakeProduct();
		productId = product.id;
	}

	fakePromoCode = {
		productId: productId,
		code: faker.datatype.uuid(),
		flatDiscount: faker.commerce.price(5, 25, 2, '$'),
		percentDiscount: faker.datatype.float({ max: 100 }),
	};

	return fakePromoCode;
};

function populateFakeUserArray() {
	let userArray = [];
	for (let i = 0; i < 10; i++) {
		let newFakeUser = createFakeUser();
		userArray.push(newFakeUser);
	}
	return userArray;
}
function populateFakeProductsArray() {
	let productsArray = [];
	for (let i = 0; i < 10; i++) {
		let newFakeProduct = createFakeProduct();
		productsArray.push(newFakeProduct);
	}
	return productsArray;
}
function populateFakeReviewsArray(fakeUsers, fakeProducts) {
	let reviewsArray = [];
	let counter = 0;
	while (counter < 3) {
		let userId = fakeUsers[counter].userId;
		let productId = fakeProducts[counter].productId;
		let newFakeReview = createFakeProductReview(userId, productId);
		reviewsArray.push(newFakeReview);
		counter++;
	}
	return reviewsArray;
}

const generateUsers = async numberOfUsers => {
	const users = [];
	for (let i = 0; i < numberOfUsers; i++) {
		users.push(await createFakeUser());
	}
	return users;
};

module.exports = {
	generateUsers,
};

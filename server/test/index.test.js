const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const User = require('../models/user');
const server = require('../app');

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);
let userToken;
let userID;
let userPassword;
const makepwd = async () => {
	userPassword = await bcrypt.hash('qwerty', 10);
};
makepwd();

describe('User Routes', () => {
	before((done) => {
		db.db()
			.then(() => {
				const user = new User({
					name: 'Aditya',
					password: userPassword,
					username: 'aditya@gmail.com',
					phoneNo: '911',
				});
				return user.save();
			})
			.then(() => done());
	});
	after(async () => {
		await User.remove({});
		await db.close();
	});
	it('Loggin in user', (done) => {
		const user = {
			email: 'aditya@gmail.com',
			password: 'qwerty',
		};
		chai
			.request(server)
			.post('/login')
			.send(user)
			.end((err, res) => {
				userID = res.body.user._id;
				userToken = res.body.token;
				userToken.should.be.a('string');
				done();
			});
	});
	it('Update', (done) => {
		const updatedUser = {
			name: 'Aadityaa',
			phoneNo: '99',
		};
		chai
			.request(server)
			.put(`/user/${userID}`)
			.set('x-auth-token', `${userToken}`)
			.send(updatedUser)
			.end((err, res) => {
				console.log(res.body);
				expect(res.statusCode).to.equal(200);
				done();
			});
	});
});

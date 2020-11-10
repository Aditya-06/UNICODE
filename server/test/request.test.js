/* eslint-disable no-underscore-dangle */
const chai = require('chai');
const chaiHttp = require('chai-http');

const bcrypt = require('bcryptjs');
const db = require('../config/db');
const User = require('../models/user');
const Request = require('../models/request');
const server = require('../app');

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);
let userPassword;
let userJWT;
let driverPassword;
let userID;
let driverID;
let driverJWT;
let requestId;
const makepwd = async () => {
	userPassword = await bcrypt.hash('qwerty', 10);
	driverPassword = userPassword;
};
makepwd();

describe('Request Routes', () => {
	before((done) => {
		db.db()
			.then(() => {
				const user = new User({
					username: 'aditya@gmail.com',
					password: userPassword,
					name: 'Aditya',
					phoneNo: '911',
					role: 'user',
				});
				return user.save();
			})
			.then(() => {
				const driver = new User({
					username: 'ajmera@email.com',
					password: driverPassword,
					name: 'ajmera',
					phoneNo: '999',
					role: 'driver',
				});
				return User.save();
			})
			.then(() => done());
	});
	after(async () => {
		await User.remove({});
		await Request.deleteMany({});
		await db.close();
	});
	it('Loggin in User', (done) => {
		const user = {
			email: 'aditya@email.com',
			password: 'qwerty',
		};
		chai
			.request(server)
			.post('/login')
			.send(user)
			.end((err, res) => {
				userID = res.body.user._id;
				userJWT = res.body.token;
				userJWT.should.be.a('string');
				done();
			});
	});
	it('Creating a request', (done) => {
		const req = {
			dropOffAddress: 'Here',
			pickUpAddress: 'there',
		};
		chai
			.request(server)
			.post(`/user/${userID}/request/new`)
			.set('x-auth-token', `${userJWT}`)
			.send(req)
			.end((err, res) => {
				requestId = res.body._id;
				expect(res.body.request.dropOffAddress).to.equal('there');
				expect(res.body.success).to.equal(true);
				done();
			});
	});
	it('Editting a Request', (done) => {
		const req = {
			dropOffAddress: 'There2',
			pickUpAddress: 'Here2',
		};
		chai
			.request(server)
			.put(`/user/${userID}/request/${requestId}`)
			.set('x-auth-token', `${userJWT}`)
			.send(req)
			.end((err, res) => {
				console.log(res.body);
				expect(res.body.request.dropAddress).to.equal('There2');
				done();
			});
	});
	it('Loggin in Driver', (done) => {
		const user = {
			email: 'ajmera@gmail.com',
			password: 'qwerty',
		};
		chai
			.request(server)
			.post('/login')
			.send(user)
			.end((err, res) => {
				driverID = res.body.user._id;
				driverJWT = res.body.token;
				driverJWT.should.be.a('string');
				done();
			});
	});
	it('Driver Accepts a Request', (done) => {
		chai
			.request(server)
			.get(`/driver/${driverID}/request//${reqId}`)
			.set('x-auth-token', `${driverJWT}`)
			.end((err, res) => {
				done();
			});
	});
	it('All Pending requests', (done) => {
		chai
			.request(server)
			.get(`/driver/${driverID}/request`)
			.set('x-auth-token', `${driverJWT}`)
			.end((err, res) => {
				done();
			});
	});
});

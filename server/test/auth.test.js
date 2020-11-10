/* eslint-disable no-unused-vars */
// Require the dev-dependencies
const chai = require('chai');
const assert = require('assert');

const chaiHttp = require('chai-http');

const mongoose = require('mongoose');
const User = require('../models/user');
const server = require('../app');
const db = require('../config/db');

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

const userCredentials = {
	name: 'Aditya',
	username: 'aditya@gmail.com',
	password: 'qwerty',
	conatct: '911',
	role: 'user',
};

const driverCredentials = {
	name: 'Ajmera',
	username: 'ajmera@gmail.com',
	password: 'qwerty',
	conatct: '999',
	role: 'driver',
};
// Our parent block
describe('Auth Routes API Testing', () => {
	before((done) => {
		db.db().then(() => done());
	});
	after(async () => {
		await User.remove({});
		await db.close();
	});
	it('Register a user', (done) => {
		const user = {
			name: 'Aditya',
			username: 'aditya@gmail.com',
			password: 'qwerty',
			conatct: '911',
			role: 'user',
			password2: 'qwerty',
		};
		chai
			.request(server)
			.post('/register')
			.send(user)
			.then((res) => {
				expect(res.body.succes).to.equal(true);
			})
			.catch(done);
	});
	/*
	it('Loggin in a user', (done) => {
		const user = {
			username: 'aditya@gmail.com',
			password: 'qwerty',
		};
		chai
			.request(server)
			.post('/register')
			.send(user)
			.end((err, res) => {
				res.should.be.a('object');
				expect(res.body.success).to.equal(true);
				done();
			})
			.catch(done);
	});
	*/

	// testing register
});

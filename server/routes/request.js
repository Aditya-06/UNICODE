/* eslint-disable no-underscore-dangle */
const express = require('express');

const User = require('../models/user');
const Request = require('../models/requests');
const auth = require('../middleware/jwt');

const router = express();

// ========================== CREATING REQUEST ==========================================
router.post('/user/:id/request/new', auth, async (req, res) => {
	const { pickUpAddress, dropOffAddress, date } = req.body;
	const id = req.user;
	User.findOne({ _id: id })
		.then((foundUser) => {
			console.log(foundUser.name);
			const createdBy = {
				id: foundUser._id,
				name: foundUser.name,
			};
			console.log(createdBy);
			Request.create({
				createdBy: createdBy,
				pickUpAddress: pickUpAddress,
				dropOffAddress: dropOffAddress,
				date: date,
			})
				.then((request) => {
					request.save();
					User.findOneAndUpdate(
						{ _id: id },
						{ $push: { request: request._id } },
						{ new: true }
					)
						.then(() => res.json(request))
						.catch((err) => res.json(err));
				})
				.catch((err) => {
					console.log(err);
					res.json({ msg: err });
				});
		})
		.catch((err) => {
			console.log(err);
			res.json({ msg: 'Error finding User' });
		});
});

// =============================== SHOW REQUESTS ROUTE =========================================
router.get('/user/:id/request', auth, (req, res) => {
	User.findOne({ _id: req.user })
		.populate('request')
		.exec()
		.then((foundUser) => {
			console.log('Requets Have Been Sent!');
			res.json({
				name: foundUser.name,
				requests: foundUser.request,
			});
		})
		.catch((err) => {
			console.log(err);
			res.json({ msg: err });
		});
});

// ========================= EDIT REQUESTS =================================
router.put('/user/:id/request/:request_id', auth, (req, res) => {
	Request.findById(req.params.request_id, (err, foundRequest) => {
		if (err || !foundRequest) {
			console.log(err);
			res.json('Request Not Found.');
		}
		// does the user own the comment
		// console.log(`Created By id: ${foundRequest.createdBy.id}`);
		// console.log(`Logged in User ID: ${req.user}`);
		if (foundRequest.createdBy.id.equals(req.user)) {
			console.log('ID have Matched');
			console.log(req.body.pickUpAddress);
			Request.findByIdAndUpdate(
				req.params.request_id,
				{
					pickUpAddress: req.body.pickUpAddress,
					dropOffAddress: req.body.dropOffAddress,
					date: req.body.date,
				},
				{ new: true }
			)
				.then((updatedReq) => {
					console.log(updatedReq);
					res.json({ updated_request: updatedReq });
				})
				.catch((error) => res.json(error));
		} else {
			res.json({ msg: 'You Do Not Have Permission To Do That!' });
		}
	});
});

// ================================= DELETE REQUEST ============================
router.delete('/user/:id/request/:request_id', auth, (req, res) => {
	Request.findById(req.params.request_id, (err, foundRequest) => {
		if (err || !foundRequest) {
			console.log(err);
			res.json('Request Not Found.');
		}
		// does the user own the comment
		// console.log(`Created By id: ${foundRequest.createdBy.id}`);
		// console.log(`Logged in User ID: ${req.user}`);
		if (foundRequest.createdBy.id.equals(req.user)) {
			console.log('ID have Matched');
			console.log(req.body.pickUpAddress);
			Request.findByIdAndRemove(req.params.request_id)
				.then(() => {
					res.json({ mag: 'Request has Been Successfully Deleted' });
				})
				.catch((error) => res.json(error));
		} else {
			res.json({ msg: 'You Do Not Have Permission To Do That!' });
		}
	});
});

module.exports = router;

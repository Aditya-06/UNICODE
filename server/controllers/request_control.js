/* eslint-disable no-underscore-dangle */

const User = require('../models/user');
const Request = require('../models/request');
// const Customer = require('../models/customer');
// const Driver = require('../models/driver');
const auth = require('../middleware/jwt');

const requestControl = {};

// ========================== CREATING REQUEST ==========================================
requestControl.createReq = (req, res) => {
	const { pickUpAddress, dropOffAddress, date } = req.body;
	const id = req.user;
	User.findOne({ _id: id })
		.then((foundUser) => {
			console.log(foundUser.name);
			console.log(foundUser.role);
			if (foundUser.role.toLowerCase() === 'customer') {
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
							.then(() => res.json({ success: true, request: request }))
							.catch((err) => res.json(err));
					})
					.catch((err) => {
						console.log(err);
						res.json({ msg: err });
					});
			} else {
				res
					.status(400)
					.json({ msg: 'You must a customer to create a request' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.json({ msg: 'Error finding User' });
		});
};

// =============================== SHOW REQUESTS ROUTE =========================================
requestControl.show = (req, res) => {
	User.findOne({ _id: req.user })
		.populate('request')
		.exec()
		.then((foundUser) => {
			console.log('Customer Has been Found!');
			res.json({
				name: foundUser.username,
				requests: foundUser.request,
			});
		})
		.catch((error) => {
			console.log(error);
			res.json(error);
		});
};

// =========================== USER ROUTER ROUTES ============================
requestControl.getInfo = (req, res) => {
	Request.findById(req.params.request_id)
		.then((foundRequest) => {
			console.log(foundRequest);
			if (foundRequest.createdBy.id.equals(req.user._id)) {
				console.log(req.user);
				console.log('IDs Have Matched!');
				return res.json({ success: true, request: foundRequest });
			}
			return res.json({ sucess: false, msg: 'Unauthorized' });
		})
		.catch((err) => {
			console.log(err);
			return res.json({ success: false, error: err });
		});
};
// ========================= EDIT REQUESTS =================================
requestControl.update = (req, res) => {
	Request.findById(req.params.request_id, (err, foundRequest) => {
		if (err || !foundRequest) {
			console.log(err);
			res.json('Request Not Found.');
		}
		// does the user own the request
		// console.log(`Created By id: ${foundRequest.createdBy.id}`);
		// console.log(`Logged in User ID: ${req.user}`);
		if (foundRequest.createdBy.id.equals(req.user._id)) {
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
};
// ================================= DELETE REQUEST ============================
requestControl.delete = (req, res) => {
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
};

// ================================= DRIVER REQUEST ROUTE ========================
requestControl.DriverGet = (req, res) => {
	let returnRequest;
	Request.find({ accepted: false })
		.then((foundRequests) => {
			if (foundRequests.length > 0) {
				// only want to show pickup and dropoff if request has beena accepteded
				returnRequest = foundRequests.map((requests) => {
					return {
						id: requests._id,
						time: requests.time,
						createdBy: requests.createdBy.name,
						pickUpAddress: requests.pickUpAddress,
						dropOffAddress: requests.dropOffAddress,
					};
				});
				return res.json({ sucess: true, requests: returnRequest });
			}
			return res.json({ success: true, msg: 'No Pending Requests' });
		})
		.catch((err) => {
			console.log(err);
			return res.json({ succes: false });
		});
};

requestControl.driverSelect = (req, res) => {
	console.log(req.params.id);
	User.findOne({ _id: req.user })
		.then((foundDriver) => {
			console.log(foundDriver);
			const acceptedBy = {
				id: foundDriver._id,
				name: foundDriver.name,
			};
			Request.findByIdAndUpdate(
				req.params.request_id,
				{ accepted: true, reqStatus: 'onTheWay', acceptedBy: acceptedBy },
				{ new: true }
			)
				.then((UpdatedRequest) => {
					User.findByIdAndUpdate(
						req.params.id,
						{ request: req.params.request_id },
						{ new: true }
					)
						.populate('request')
						.exec()
						.then((updatedDriver) => {
							console.log('Driver Was Found!');
							console.log(updatedDriver);
							res.json({
								success: true,
								createdByName: UpdatedRequest.createdBy.name,
								time: UpdatedRequest.time,
								pickUpAddress: UpdatedRequest.pickUpAddress,
								dropOffAddress: UpdatedRequest.dropOffAddress,
							});
						})
						.catch((err) => {
							console.log(err);
							res.status(400).json(err);
						});
				})
				.catch((errr) => {
					console.log(errr);
					res.status(400).json({ success: false, error: errr });
				});
		})
		.catch((error) => {
			console.log(error);
			return res.status(400).json({ success: false, error: error });
		});
};

module.exports = requestControl;

const fileUpload = require('express-fileupload');
const express = require('express');

const router = express();
router.use(fileUpload());

const auth = require('../middleware/jwt');

router.post('/upload', auth, (req, res) => {
	if (req.files == null) {
		return res
			.status(400)
			.json({ success: false, msg: 'No File was Uploaded' });
	}
	const { file } = req.files;
	file.mv(`${__dirname}/../../client/public/uploads/${file.name}`, (err) => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}
		return res.json({
			success: true,
			fileName: file.name,
			filePath: `uploads/${file.name}`,
		});
	});
	return res.status(500).json({ success: false, msg: 'Server Error' });
});

module.exports = router;

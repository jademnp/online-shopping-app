const express = require("express");
const router = express.Router();
const { Product } = require("../models/Product");
const multer = require("multer");
const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${file.originalname}`);
	},
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		if (ext !== ".jpg" || ext !== ".png") {
			return cb(res.status(400).end("only jpg, png are allowed"), false);
		}
		cb(null, true);
	},
});

var upload = multer({ storage: storage }).single("file");

//=================================
//             User
//=================================

router.post("/uploadImage", auth, (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			return res.json({ success: false, err });
		}
		return res.json({
			success: true,
			image: res.req.file.path,
			fileName: res.req.file.filename,
		});
	});
});

router.post("/uploadProduct", auth, (req, res) => {
	const product = new Product(req.body);

	product.save((err) => {
		if (err) return res.status(400).json({ success: false, err });
		return res.status(200).json({ success: true });
	});
});

router.post("/getProducts", (req, res) => {
	let order = req.body.order ? req.body.order : "desc";
	let sortBy = req.body.sortBy ? req.body.order : "_id";
	let limit = req.body.limit ? req.body.limit : 100;
	let skip = parseInt(req.body.skip);
	let term = req.body.searchTerm;
	let findArgs = {};
	for (const key in req.body.filter) {
		if (req.body.filter[key].length > 0) {
			if (key === "price") {
				findArgs[key] = {
					$gte: req.body.filter[key][0],
					$lte: req.body.filter[key][1],
				};
			} else {
				findArgs[key] = req.body.filter[key];
			}
		}
	}
	console.log("term", term);
	if (term) {
		Product.find(findArgs)
			.find({ $text: { $search: term } })
			.populate("writer")
			.sort([[sortBy, order]])
			.skip(skip)
			.limit(limit)
			.exec((err, products) => {
				if (err) return res.status(400).json({ success: false, err });
				return res
					.status(200)
					.json({ success: true, products, postSize: products.length });
			});
	} else {
		Product.find(findArgs)
			.populate("writer")
			.sort([[sortBy, order]])
			.skip(skip)
			.limit(limit)
			.exec((err, products) => {
				if (err) return res.status(400).json({ success: false, err });
				return res
					.status(200)
					.json({ success: true, products, postSize: products.length });
			});
	}
});

router.get("/product_by_id", (req, res) => {
	let type = req.query.type;
	let productId = req.query.id;
	if (type === "array") {
		let ids = req.query.id.split(",");
		productId = [];
		productId = ids.map((item) => item);
	}
	Product.find({ _id: { $in: productId } })
		.populate("writter")
		.exec((err, products) => {
			if (err) return res.status(400).json({ success: false, err });
			return res.status(200).json({ success: true, products });
		});
});

module.exports = router;

const express = require("express");
const { getHome } = require("../controllers/home.controller");
const { getAbout } = require("../controllers/about.controller");
const { getBlog } = require("../controllers/blog.controller");
const { getFeatures } = require("../controllers/features.controller");
const { getContactInfo, submitContactMessage } = require("../controllers/contact.controller");

const router = express.Router();

router.get("/health", (req, res) => res.json({ status: "ok" }));

router.get("/home", getHome);
router.get("/about", getAbout);
router.get("/blog", getBlog);
router.get("/features", getFeatures);
router.get("/contact", getContactInfo);
router.post("/contact", submitContactMessage);

module.exports = router;

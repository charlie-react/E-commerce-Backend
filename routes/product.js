const express = require("express")
const router = express.Router()
const {createProduct, getAllProducts}= require("../controllers/product")

router.route("/newproduct").post(createProduct)
router.route("/products").get(getAllProducts)

module.exports = router

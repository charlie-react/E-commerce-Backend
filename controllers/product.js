const Product = require("../Model/product");
const { StatusCodes } = require("http-status-codes");

const BadRequest = require("../ErrFolder/badrequest");

const createProduct = async (req, res) => {
  const { name, image, category, price, description } = req.body;
  if (!name || !image || !category || !price   ) {
    throw new BadRequest("please input required fields");
  }

  const product = await Product.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ product, msg: "Product succesfully uploaded" });
};
const getAllProducts = async (req,res)=>{
  const products = await Product.find({})
 

  res.status(StatusCodes.ACCEPTED).send(products)
}

module.exports = {
  createProduct,getAllProducts
};

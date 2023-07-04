const BadRequest = require("../ErrFolder/badrequest");
const Unauthenticated = require("../ErrFolder/unauthenticated");
const SignUp = require("../Model/test");
const { StatusCodes } = require("http-status-codes");

const get = async (req, res) => {
  res.send("yello friend");
};
const createUser = async (req, res) => {
  const { email, password } = req.body;
  let userFind = await SignUp.findOne({ email });
  // console.log(userFind);
  if (userFind) {
    throw new BadRequest("Email address already registered", { alert: false });
  }
  if (password.length < 6) {
    throw new BadRequest("Password must be longer than 5");
  }

  let user = await SignUp.create({ ...req.body });
  const token = user.createToken();

  res
    .status(StatusCodes.CREATED)
    .json({ user, token, msg: "Sign Up Succesful!", alert: true });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please enter an email and password", {
      alert: false,
    });
  }
  const userFind = await SignUp.findOne({ email });

  if (!userFind) {
    throw new Unauthenticated("Email address is not registered", {
      alert: false,
    });
  } else {
    const isPassWordCorrect = await userFind.passCompare(password);
    if (!isPassWordCorrect) {
      throw new Unauthenticated(
        "Invalid password,please provide a valid password",
        { alert: false }
      );
    }
    const returnedKeys = {
      _id: userFind._id,
      firstname: userFind.firstname,
      lastname: userFind.lastname,
      email: userFind.email,
      profilepic: userFind.profilepic,
    };
    console.log(returnedKeys);

    res
      .status(StatusCodes.OK)
      .json({ returnedKeys, msg: "Welcome", alert: true });
  }
};

module.exports = { get, createUser, login };

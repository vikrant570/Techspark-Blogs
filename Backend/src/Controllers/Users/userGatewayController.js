const Users = require("../../Models/userData");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { welcomeMail, verificationMail } = require("../../services/mailer");

// LOGIN FUNCTION
const loginUser = async (req, res) => {
  try {
    const { username, email, pass } = req.body;
    const user = await Users.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Login Failed! User doesn't exist." });
    }

    const auth = await bcrypt.compare(pass.trim(), user.password);
    if (!auth) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Login Failed! Your credentials or password is incorrect.",
        });
    }
    const {password, ...userWithoutPassword} = user.toObject();

    const token = jwt.sign(userWithoutPassword, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000
    });

    res.status(200).json({ success: true, message: "Login Successfull ..." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login Failed! Something Went Wrong." });
  }
};

//REQUEST FOR REGISTRATION
const registerRequest = async (req, res) => {
  const { email } = req.body;

  try {
    const alreadyExists = await Users.findOne({ email: email });

    if (alreadyExists) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Registrastion Failed ! Email already in use.",
        });
    }

    await verificationMail(email);
    res.status(200).json({
      success: true
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Registration Failed ! Internal Server Error.",
      });
  }
};

// REGISTRATION AFTER VERIFICATION
const registerUser = async (req, res) => {
  const { fullname, username, password, email } = req.body;

  try {
    const newUser = await Users({
      name: fullname,
      username,
      password,
      email,
    });
    await newUser.save()
    await welcomeMail(fullname, email);

    const {password, ...userWithoutPassword} = newUser.toObject();

    const token = jwt.sign(userWithoutPassword, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000
    });

    res
      .status(201)
      .json({ success: true, message: "Registration Successfull ! Welcome." });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Registration Failed ! Something Went Wrong.",
      });
  }
};

// UPDATE DETAILS FUNCTION
const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await Users.findById(userId);
    const { newUsername, newPassword, newName, password } = req.body;
    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      user.name = newName || user.name;
      user.password = newPassword || user.password;
      user.username = newUsername || user.username;

      await user.save();
      res
        .status(201)
        .json({ success: true, message: "Details Updated Successfully." });
    } else {
      return res
        .status(401)
        .json({
          success: false,
          message: "Enter your old password correctly !",
        });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id);
    const { password, usertoBeDeleted } = req.body;
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization Revoked ..." });
    }

    if (usertoBeDeleted) {
      console.log(req.user);
      if (req.user.role == "admin") {
        await Users.findByIdAndDelete(usertoBeDeleted);
        return res
          .status(200)
          .json({ success: true, message: "User deleted Successfully..." });
      } else {
        return res
          .status(401)
          .json({
            success: false,
            message: "Only admin can delete other accounts !",
          });
      }
    }

    await Users.findByIdAndDelete(req.user._id);
    res
      .status(200)
      .json({
        success: true,
        message: "Your account was deleted successfully ...",
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getMyInfo = async (req, res) =>{
  res.status(200).json({user : req.user})
}

module.exports = {
  loginUser,
  registerRequest,
  updateUser,
  deleteUser,
  registerUser,
  getMyInfo
};
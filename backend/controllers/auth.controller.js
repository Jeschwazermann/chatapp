import bcrypt from "bcrypt";
// Import the User model to interact with the users collection in MongoDB
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
// Signup controller handles user registration
export const signup = async (req, res) => {
  try {
    console.log("1. Request received:", req.body);

    // Destructure data sent from the client (e.g., from a form or frontend)
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      console.log("2. Passwords don't match");
      return res.status(400).json({ error: "passwords don't match" });
    }

    // Check if the username already exists in the database
    const user = await User.findOne({ username });
    console.log("3. User lookup:", user);

    if (user) {
      console.log("4. Username exists");
      return res.status(400).json({ error: "Username already exists" });
    }
    console.log("5. Preparing new user");
    // You should hash the password here before saving (security best practice)
    // e.g., using bcrypt: password = await bcrypt.hash(password, 10)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Generate profile picture URL based on gender and username
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create a new user instance with the provided data
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      //Generate JWT toekn here
      generateTokenAndSetCookie(newUser._id, res);

      // Save the new user to the database
      await newUser.save();
      console.log("6. Saving new user");

      // Send a success response back to the client
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    // Catch any error and send a server error response
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Placeholder for login controller (to be implemented later)
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Placeholder for logout controller (to be implemented later)
export const logout = (req, res) => {
  try {
    res.cookie("JWT", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

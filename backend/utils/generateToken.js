// Import the jsonwebtoken library to create and verify JWT tokens
import jwt from "jsonwebtoken";

// Define a function that generates a token and sets it as a cookie in the response
const generateTokenAndSetCookie = (userId, res) => {
  // Create a signed JWT token containing the user's ID
  const token = jwt.sign(
    { userId }, // The data you want to include in the token payload
    process.env.JWT_SECRET, // Secret key to sign the token (must be kept safe!)
    {
      expiresIn: "15d", // Token validity period (15 days)
    }
  );

  // Set the token as an HTTP-only cookie on the client's browser
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (15 days)
    httpOnly: true, // Makes the cookie inaccessible to JavaScript in the browser
    sameSite: "strict", //Restricts the cookie to same-site requests for CSRF protection
    secure: process.env.NODE_ENV !== "developemnt",
  });
};

// Export the function so you can import and use it in other files
export default generateTokenAndSetCookie;

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Check if the authorization header is present
  if (!authHeader) {
    return res.status(500).json({
      message:"No authorization header present in request"})
  }

  // Extract the token from the authorization header
  const token = authHeader.split(' ')[1];

  // Get the secret key from the environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  try {
    // Verify the JWT token
    const user = jwt.verify(token, secretKey);

      // Attach the user information to the request object
    console.log("authenticateToken: user ", user)
    req.user = user as JwtPayload;
    return next(); // Call the next middleware function
  } catch (err) {
    console.log("authenticateToken: verify error", err)
    return res.sendStatus(403); // Send forbidden status if the token is invalid
  }

};

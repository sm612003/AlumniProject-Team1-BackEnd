import { verifyToken } from "../utils/jwt.js";


const isAuthenticated = (req, res, next) => {
    try {
      const token = req.cookies.accessToken;
      if (!token) throw new Error('Token not provided');
  
      const decoded = verifyToken(token);
      req.userData = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Authentication failed',
      });
    }
  };

 const isAuthorizedUser = (roles) => {
    return (req, res, next) => {
      const userRole = req.userData.role;
      console.log(userRole)
      if (!roles.includes(userRole)) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      next();
    };
  };
  
  export {isAuthenticated, isAuthorizedUser};
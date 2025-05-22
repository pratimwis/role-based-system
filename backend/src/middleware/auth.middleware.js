import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
//  const token = authHeader.split('.')[1];

  jwt.verify(authHeader, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = {
      id:decoded._id,
      role:decoded.role,
      username:decoded.username,
    };
    next();
  });
};
export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
export const verifyEmployee = (req, res, next) => {
  if (req.user.role !== 'employee') {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

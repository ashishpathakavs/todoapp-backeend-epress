import jwt from 'jsonwebtoken';

function authMiddleware (req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        req.userId = decoded.id;
        next();
    });
}

export default authMiddleware;
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';

export const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
return res.status(401).json({ message: 'No hay token, autorización denegada' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No hay token, autorización denegada' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'El token no es válido' });
    }
};

export const authorize = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const user = await UserModel.findById(req.user.id);
            console.log('Tipo de usuario:', user.type);
            console.log('Roles permitidos:', allowedRoles);            

            if (!allowedRoles.includes(user.type)) {
                console.log('Access denied for user with type:', user.type);
                return res.status(403).json({ message: 'Acceso denegado' });
            }
            console.log('Acceso concedido para el usuario con tipo:', user.type);
            next();
        } catch (error) {
            console.error('Error en el middleware de autorización:', error);
            res.status(500).json({ message: 'Error del servidor' });
            
        }
    };
};

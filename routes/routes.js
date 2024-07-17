import express from 'express';
import { getParkingLot, getParkingLots, createParkingLot, updateParkingLot, deleteParkingLot } from '../controllers/parkingLotController.js';
import { register, login, profile } from '../controllers/userController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';
import { getMessages, createMessage } from '../controllers/messageController.js';
const router = express.Router();

// Rutas de ParkingLots
router.get("/parkinglots", getParkingLots);
router.get("/parkinglots/:id", getParkingLot);
router.post("/parkinglots", authenticate, authorize(['reservador','administrador']), createParkingLot);
router.patch("/parkinglots/:id", authenticate, authorize(['reservador','administrador']), updateParkingLot);
router.delete("/parkinglots/:id", authenticate, authorize(['administrador']), deleteParkingLot);

// Rutas de Usuarios
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate, profile);

// Rutas de Mensajes
router.post("/messages", createMessage);
router.get("/messages", getMessages);

export default router;
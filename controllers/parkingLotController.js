import ParkingLotModel from "../models/ParkingLotModel.js";

export const getParkingLots = async (req, res) => {
    try {
        const parkinglots = await ParkingLotModel.find()
        res.status(200).json(parkinglots)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getParkingLot = async (req, res) => {
    try {
        const { id } = req.params
        const parkinglot = await ParkingLotModel.findById(id)
        if (!parkinglot) {
            return res.status(404).json({ message: `Estacionamiento con id ${id} no encontrado` });
        }
        res.status(200).json(parkinglot)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const createParkingLot = async (req, res) => {
    try {
        const parkingLot = await ParkingLotModel.create(req.body)
        res.status(201).json(parkingLot)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const updateParkingLot = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (!req.body.hasOwnProperty('email')) {
            updateData.$unset = { email: "" };
        }

        const parkinglot = await ParkingLotModel.findOneAndUpdate(
            { _id: id },
            updateData,
            { new: true }
        );
        res.status(200).json(parkinglot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteParkingLot = async (req, res) => {
    try {
        const { id } = req.params
        const parkinglot = await ParkingLotModel.findByIdAndDelete(id)
        if (!parkinglot) {
            return res.status(404).json({ message: `Estacionamiento con id ${id} no encontrado` });
        }
        res.status(200).json({ message: `El estacionamiento con id ${id} ha sido eliminado exitosamente` });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
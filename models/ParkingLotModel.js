import mongoose from 'mongoose';

const parkinglotSchema = new mongoose.Schema({
    state: {
        type: String,
        required: [true, "Please complete the field"],
        enum: {
            values: ["disponible", "ocupado", "reservado","asignado"],
            message: "El tipo debe ser uno de los siguientes: disponible, ocupado, reservado o asignado"
        }
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        default: undefined,
    },
    parkingNumber: {
        type: Number,
        required: [true, "Please complete the field"],
        unique: true,
        min: [1, "Parking number must be at least 1"],
        max: [1000, "Parking number must be at most 1000"],
        trim: true
    },
    type: {
        type: String,
        required: [true, "Please complete the field"],
        enum: {
            values: ["estudiante", "profesor", "administrativo","preferencial"],
            message: "El tipo debe ser uno de los siguientes: estudiantes, profesor, administrativo o preferencial"
        }
    },
}, {
    timestamps: true,
    versionKey: false
});

const ParkingLotModel = mongoose.model('ParkingLot', parkinglotSchema);

export default ParkingLotModel;
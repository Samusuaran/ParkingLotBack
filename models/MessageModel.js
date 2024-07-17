import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    reason: {
        type: String,
        required: [true, "Please complete the field"],
        enum:{
            values: ["solicitud", "queja", "reclamo"],
            message: "El tipo debe ser uno de los siguientes: solicitud, queja, reclamo"
        },
    },
    message: {
        type: String,
        required: [true, "Please complete the field"],
        min: [10, "El mensaje debe tener al menos 1 carácter."],
        max: [250, "El mensaje no debe tener mas de 250 carácteres."],
    },
    state: {
        type: Boolean,
        required: [true, "Please complete the field"],
W    },
    sender: {
        type: String,
        required: [true, "Please complete the field"],
    },
}, {
    timestamps: true,
    versionKey: false

});

const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  _idParkingLot: {
    type: String,
    unique: true,
    sparse: true,
  },
  fullName: {
    type: String,
    required: [true, "El nombre completo es obligatorio"],
    minlength: [2, "El nombre completo debe tener al menos 2 caracteres"],
    maxlength: [50, "El nombre completo debe tener como máximo 50 caracteres"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Por favor, usa una dirección de correo electrónico válida"],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [8, "La contraseña debe tener al menos 8 caracteres"]
  },
  phoneNumber: {
    type: String,
    required: [true, "El número de teléfono es obligatorio"],
    match: [/^\d{9}$/, "El número de teléfono debe tener exactamente 9 dígitos"],
    trim: true
  },
  type: {
    type: String,
    required: [true, "Por favor, completa el campo"],
    enum: {
      values: ["estudiante", "profesor", "administrativo","guardia","preferencial","administrador"],
      message: "El tipo debe ser uno de los siguientes: estudiante, profesor, administrativo, guardia, preferencial o administrador"
    },
    default: "estudiante"
  },
  qrCode: {
    type: String,
    unique: true
  }
},
  {
    timestamps: true,
    versionKey: false
  });

// Campo virtual para la confirmación de contraseña
userSchema.virtual('passwordConfirmation')
  .get(function () {
    return this._passwordConfirmation;
  })
  .set(function (value) {
    this._passwordConfirmation = value;
  });

// Middleware de pre-guardado para validar la confirmación de contraseña
userSchema.pre('save', function (next) {
  if (this.password !== this._passwordConfirmation) {
    this.invalidate('passwordConfirmation', 'La confirmación de contraseña no coincide con la contraseña');
  }

  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;

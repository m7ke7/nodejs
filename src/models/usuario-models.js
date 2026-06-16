import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UsuarioSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    status: {
        type: Boolean,
        default: true
    }
},{
    versionKey: false,
    timestamps: true
});

UsuarioSchema.pre('save', async function () {
  // Solo hashear si la contraseña fue modificada
  if (!this.isModified('password')) {
    return;
  }
  // Generar el salt y hashear
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// MÉTODO: comparar contraseña en el login
UsuarioSchema.methods.compararPassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

const Usuariomodel = model('Usuario', UsuarioSchema);
export default Usuariomodel;




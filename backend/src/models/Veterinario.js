import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarID from "../helpers/generarID.js";

const veterinarioSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        telefono: {
            type: String,
            default: null,
            trim: true,
        },
        web: {
            type: String,
            default: null,
            trim: true,
        },
        token: {
            type: String,
            default: generarID,
        },
        confirmado: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

// Hashea el password antes de guardar el veterinario
//pre es un middleware que se ejecuta antes de guardar el documento
veterinarioSchema.pre("save", async function (next) {
    // Si el password ya está hasheado, no hacer nada
    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comprobar el password
veterinarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    //bcrypt.compare compara el password
    return await bcrypt.compare(passwordFormulario, this.password);
};

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);
export default Veterinario;
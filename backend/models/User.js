const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "Email nie jest prawidłowy",
        }
    },
    password: { 
        type: String, 
        required: true,
        validate: {
            validator: (value) => validator.isStrongPassword(value),
            message: "Hasło nie jest wystarczająco silne",
        }
    },
    sex: { 
        type: String, 
        required: true,
        enum: ["female", "male"],
        message: "Wybierz poprawną płeć"
    },
    activity: { 
        type: String, 
        required: true,
        enum: ["high", "moderate", "low"],
        message: "Wybierz poprawny poziom aktywności"
    },
    height: { 
        type: Number, 
        required: true,
        min: [0, "Wzrost musi być większy niż 0"]
    },
    weight: { 
        type: Number, 
        required: true,
        min: [0, "Waga musi być większa niż 0"],
    },
});

userSchema.statics.register = async function(email, password, sex, activity, height, weight){
    if(!email || !password || !sex || !activity || !height || !weight){
        throw Error("Wszystkie pola muszą być uzupełnione")
    }
    // if(!validator.isEmail(email)){
    //     throw Error("Email nie jest prawidłowy")
    // }
    // if(!validator.isStrongPassword(password)){
    //     throw Error("Hasło nie jest wystarczająco silne")
    // }

    const exists = await this.findOne({ email });
    if (exists){
        throw Error("Email jest już używany");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash, sex, activity, height, weight})
    return user
}

userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error("Wszystkie pola muszą być uzupełnione")
    }

    const user = await this.findOne({ email });
    if (!user){
        throw Error("Email nie jest używany");
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw Error("Hasło nie jest prawidłowe");
    }
    return user;
}

module.exports = mongoose.model("User", userSchema);

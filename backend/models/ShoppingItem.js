const mongoose = require("mongoose");

const ShoppingItemSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: String,
      required: true,
      trim: true,
      minlength: [1, "Nazwa produktu musi mieć co najmniej 1 znak"],
      maxlength: [100, "Nazwa produktu jest za długa"],
    },
    quantity: {
      type: String,
      required: true,
      trim: true,
      minlength: [1, "Ilość nie może być pusta"],
      maxlength: [50, "Ilość jest za długa"],
    },
    purchased: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ShoppingItem", ShoppingItemSchema);

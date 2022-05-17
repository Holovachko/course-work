const { Schema, model } = require("mongoose");

const Item = new Schema({
  itemName: { type: String, default: "" },
  itemURL: { type: String, unique: true },
  itemPrice: { type: String, default: "" },
  itemCategory: { type: String, default: "" },
  itemSubCategory: {type: String, default:""},
  itemImg : {type: String, default:""}
});

export default model("Item", Item);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    CIN: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    // Add other client details as needed
  },
  { timestamps: true }
);

// Reference to projects
clientSchema.virtual("projects", {
  ref: "Project",
  localField: "_id",
  foreignField: "client",
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;

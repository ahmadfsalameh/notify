import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  apiKey: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const App = new mongoose.model("apps", schema);

export default App;

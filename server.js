import "./env.js";
import { connectToMongoDB } from "./src/config/mongodb.js";
import app from "./src/index.js";

const PORT = 3200;

const startServer = async () => {
  try {
    await connectToMongoDB();
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};

startServer();
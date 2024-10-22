import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI);
    console.log(`MongoDB conectado :)`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Detener la aplicación si la conexión falla
  }
};

export default connectDB;

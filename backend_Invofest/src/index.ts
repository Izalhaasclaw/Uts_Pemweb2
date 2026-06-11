import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import eventRoutes from "./routes/eventRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import pembicaraRoutes from "./routes/pembicaraRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hai Ambajal, ini api untuk invofest");
});

app.use("/events", eventRoutes);
app.use("/categories", categoryRoutes);
app.use("/pembicara", pembicaraRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

export default app;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
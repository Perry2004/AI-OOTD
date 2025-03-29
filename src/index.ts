import express from "express";
import router from "./Router";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("frontend/dist"));
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

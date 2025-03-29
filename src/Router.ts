import express from "express";
import "./controller/DbController";
const router = express.Router();

router.post("/journal", (req, res) => {
  // [TODO]: generate journal
  res.send("Generating journal...");
});
router.put("/journal", (req, res) => {
  // [TODO]: save journal to db
  res.send("Saving to db...");
});
router.get("/journal", (req, res) => {
  // [TODO]: get all journals
  res.send("Getting all journals...");
});

export default router;

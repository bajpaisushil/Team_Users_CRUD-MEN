import express from "express";
const route = express.Router();
import User from "../models/userModel.js";


route.get("/", async (req, res) => {
  const {
    page = 1,
    limit = 5,
    domain,
    gender,
    availability,
    search,
  } = req.query;
  const query = {};

  if (domain) query.domain = domain;
  if (gender) query.gender = gender;
  if (availability !== undefined) query.availability = availability;
  if (search) query.name = { $regex: new RegExp(search, "i") };

  try {
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.post("/", async (req, res) => {
  const { name, domain, gender, availability } = req.body;
  try {
    const newUser = new User({ name, domain, gender, availability });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, domain, gender, availability } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, domain, gender, availability },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.delete("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default route;

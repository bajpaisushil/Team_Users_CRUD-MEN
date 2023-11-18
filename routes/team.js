import express from "express";
import Team from "../models/teamModel.js";

const route = express.Router();

route.post("/", async (req, res) => {
  const { name, users } = req.body;

  try {
    const team = new Team({ name, users });
    await team.save();

    res.status(201).json(team);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.get("/:id", async (req, res) => {
  const teamId = req.params.id;

  try {
    const team = await Team.findById(teamId).populate("users");

    if (!team) {
      res.status(404).json({ error: "Team not found" });
    } else {
      res.json(team);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default route;

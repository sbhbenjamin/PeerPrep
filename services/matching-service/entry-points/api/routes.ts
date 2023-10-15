import express from "express";
import { easy_queue, medium_queue, hard_queue } from "../../start";

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();
  router.post("/", async (req, res) => {
    // if no other user in the queue, add to queue
    // if there is a user in the queue, SUCCESS} 
    const {id, difficulty} = req.body;
    let this_queue;

    if (difficulty.toLowerCase() == "easy") {
        this_queue = easy_queue;
    } else if (difficulty.toLowerCase() == "medium") {
        this_queue = medium_queue;
    } else if (difficulty.toLowerCase() == "hard") {
        this_queue = hard_queue;
    } else {
        res.send("Invalid difficulty");
    }

    // Check for duplicates in each queue
    if (easy_queue.find((match) => match.id === id) 
        || medium_queue.find((match) => match.id === id) 
        || hard_queue.find((match) => match.id === id)) {
        res.send("You are already in the queue!");
    }

    if (easy_queue.length >= 1) {
        res.send(easy_queue.shift());
    } else {
        easy_queue.push({id, difficulty});
        res.send("Pushed to queue");
    }
  })

  expressApp.use("/", router);
}

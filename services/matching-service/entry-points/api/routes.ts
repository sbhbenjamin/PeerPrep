import express from "express";

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();
  
  router.post("/", async (req, res) => {
    
  })

  expressApp.use("/user", router);
}

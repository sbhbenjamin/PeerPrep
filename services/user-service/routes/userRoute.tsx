import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Route to get user details by ID
router.get("/:userId", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error retrieving user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

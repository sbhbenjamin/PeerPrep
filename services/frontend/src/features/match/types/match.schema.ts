import { z } from "zod";

// For resetting Select inputs, see: https://github.com/shadcn-ui/ui/issues/549#issuecomment-1703396297
const Difficulty = z
  .enum(["", "Easy", "Medium", "Hard"])
  .refine((value) => value !== "", {
    message: "Difficulty selection is required",
  });

const Match = z.object({
  language: z.string().refine((value) => value !== "", {
    message: "Language selection is required",
  }),
  category: z.string().nonempty({ message: "Category selection is required" }),
  difficulty: Difficulty,
});

export { Match };

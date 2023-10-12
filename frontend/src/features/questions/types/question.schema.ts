import { z } from "zod";

const Difficulty = z
  .enum(["Easy", "Medium", "Hard"])
  .refine((value) => value !== undefined, {
    message: "Difficulty selection is required",
  });

const Question = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  categories: z
    .array(z.string())
    .nonempty({ message: "At least one category should be selected" }),
  difficulty: Difficulty,
  description: z.string().nonempty({ message: "Description is required" }),
  link: z.string().nonempty({ message: "Link is required" }),
});

export { Question };

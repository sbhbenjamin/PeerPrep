"use client";

import { CheckIcon, ChevronsUpDown } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

import { categoriesStub } from "@/features/questions/stubs/categories.stub";
import type {
  Category,
  Difficulty,
} from "@/features/questions/types/question.type";

import { Match } from "../types/match.schema";
import { Language, type MatchRequest } from "../types/matching.type";

interface MatchFormProps {
  onSubmit: (values: MatchRequest) => void;
  matchPending: boolean;
}

export const MatchingForm: React.FC<MatchFormProps> = ({
  onSubmit,
  matchPending,
}) => {
  const form = useForm<z.infer<typeof Match>>({
    resolver: zodResolver(Match),
    defaultValues: {
      difficulty: "",
      language: "",
      categories: [],
    },
    mode: "all",
  });

  const handleSubmit = (values: z.infer<typeof Match>) => {
    onSubmit({
      language: values.language as Language,
      difficulty: values.difficulty as Difficulty,
      categories: values.categories.map(
        (category: string) => category as Category,
      ),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Categories</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value && field.value.length > 0
                        ? field.value
                            .map(
                              (val) =>
                                categoriesStub.find(
                                  (category) => category.value === val,
                                )?.label,
                            )
                            .filter(Boolean)
                            .join(", ")
                        : "Select categories"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search categories..."
                      className="h-9"
                    />
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categoriesStub.map((category) => (
                        <CommandItem
                          value={category.label}
                          key={category.value}
                          onSelect={() => {
                            const currentValues = form.getValues("categories");
                            const valueSet = new Set(currentValues);

                            if (valueSet.has(category.value)) {
                              valueSet.delete(category.value);
                            } else {
                              valueSet.add(category.value);
                            }
                            form.setValue(
                              "categories",
                              // required to suppress zod compatibility issues with array objects
                              Array.from(valueSet) as [string, ...string[]],
                            );
                          }}
                        >
                          {category.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              field.value.includes(category.value)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    {field.value ? (
                      <SelectValue placeholder="Select a difficulty" />
                    ) : (
                      "Select a difficulty"
                    )}
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    {field.value ? (
                      <SelectValue placeholder="Select a language" />
                    ) : (
                      "Select a language"
                    )}
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(Language).map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            !(form.getValues("difficulty") && form.getValues("language"))
          }
          isLoading={matchPending}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

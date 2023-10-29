import { rootApi } from "@/app/RootApi.ts";

import type { QuestionType } from "@/features/questions";

rootApi.enhanceEndpoints({ addTagTypes: ["Question"] });

const buildServiceUrl = (queryUrl: string) =>
  `${process.env.NEXT_PUBLIC_QUESTION_SERVICE_ADDRESS}${queryUrl}`;

const questionApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<QuestionType[], Partial<QuestionType> | void>({
      query: (questionQuery) => ({
        url: buildServiceUrl("/question"),
        method: "GET",
        params: { ...questionQuery },
      }),
      // @ts-expect-error
      providesTags: ["Question"],
    }),
    addQuestion: builder.mutation<QuestionType, Omit<QuestionType, "id">>({
      query: (newQuestion) => ({
        url: buildServiceUrl("/question"),
        method: "POST",
        body: newQuestion,
      }),
      // @ts-expect-error
      invalidatesTags: ["Question"],
    }),
    deleteQuestion: builder.mutation<void, string>({
      query: (questionId) => ({
        url: buildServiceUrl(`/question/${questionId}`),
        method: "DELETE",
      }),
      // @ts-expect-error
      invalidatesTags: ["Question"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetQuestionsQuery,
  useAddQuestionMutation,
  useDeleteQuestionMutation,
} = questionApi;
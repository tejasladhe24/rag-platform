import { openai } from "@ai-sdk/openai";
import { wrapLanguageModel } from "ai";
import { OPENAI_LLM_MODEL } from "./model";
import { ragMiddleware } from "./rag-middleware";

export const customModel = wrapLanguageModel({
  model: openai(OPENAI_LLM_MODEL),
  middleware: ragMiddleware,
});

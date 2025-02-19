import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "./constants";

export type Language = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;

export interface State {
  fromLanguaje: string;
  toLanguaje: string;
  fromText: string;
  result: string;
  loading: boolean;
}

export type Action =
  | { type: "SET_FROM_LANGUAGE"; payload: string }
  | { type: "INTERGANGE_LANGUAGES" }
  | { type: "SET_TO_LANGUAGE"; payload: string }
  | { type: "SET_FROM_TEXT"; payload: string }
  | { type: "SET_RESULT"; payload: string };

import { useReducer } from "react";
import { Action, FromLanguage, Language, State } from "../types";
import { AUTO_LANGUAGE } from "../constants";

// 1.create a initialState
const inicialState: State = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  result: "",
  loading: false,
};

//2.create a reducer
export function reducer(state: State, action: Action) {
  const { type } = action;

  if (type === "INTERGANGE_LANGUAGES") {
    if (state.fromLanguage === AUTO_LANGUAGE) return state;
    // Intercambia los idiomas de origen y destino
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }
  if (type === "SET_FROM_LANGUAGE") {
    // Establece el idioma de origen
    return {
      ...state,
      fromLanguage: action.payload,
    };
  }
  if (type === "SET_TO_LANGUAGE") {
    // Establece el idioma de destino
    return {
      ...state,
      toLanguage: action.payload,
    };
  }
  if (type === "SET_FROM_TEXT") {
    // Establece el texto de origen y activa el estado de carga
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: "",
    };
  }
  if (type === "SET_RESULT") {
    // Establece el resultado de la traducción y desactiva el estado de carga
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  return state;
}

export function useStore() {
  // 3.usar el hook useReduce
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, inicialState);

  const interchageLanguages = () => {
    dispatch({ type: "INTERGANGE_LANGUAGES" });
  };

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  };

  const setToLanguage = (payload: Language) => {
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  };

  const setFromText = (payload: string) => {
    dispatch({ type: "SET_FROM_TEXT", payload });
  };

  const setResult = (payload: string) => {
    dispatch({ type: "SET_RESULT", payload });
  };

  // 4. devolver el estado y el dispatch
  return {
    fromLanguage, // Corregido: fromLanguaje a fromLanguage
    toLanguage, // Corregido: toLanguaje a toLanguage
    fromText,
    result,
    loading,
    interchageLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}

import { useReducer } from "react";
import { Action, State } from "../types";

// 1.create a initialState
const inicialState: State = {
  fromLanguaje: "auto",
  toLanguaje: "en",
  fromText: "",
  result: "",
  loading: false,
};

//2.create a reducer
export function reducer(state: State, action: Action) {
  const { type } = action;

  if (type === "INTERGANGE_LANGUAGES") {
    // Intercambia los idiomas de origen y destino
    return {
      ...state,
      fromLanguaje: state.toLanguaje,
      toLanguaje: state.fromLanguaje,
    };
  }
  if (type === "SET_FROM_LANGUAGE") {
    // Establece el idioma de origen
    return {
      ...state,
      fromLanguaje: action.payload,
    };
  }
  if (type === "SET_TO_LANGUAGE") {
    // Establece el idioma de destino
    return {
      ...state,
      toLanguaje: action.payload,
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
  const [{ fromLanguaje, toLanguaje, fromText, result, loading }, dispatch] =
    useReducer(reducer, inicialState);

  const interchageLanguages = () => {
    dispatch({ type: "INTERGANGE_LANGUAGES" });
  };

  const setFromLanguage = (payload: string) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  };

  const setToLanguage = (payload: string) => {
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
    fromLanguaje,
    toLanguaje,
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

import axios from "axios";
import { URLS } from "./params";


export type PredictionStatus = "no_hand_detected" | "success";
export interface LetterPrediction {
  predictionStatus: PredictionStatus;
  prediction: string;
}

export const ping = async (): Promise<boolean> => {
  try {
    await axios.get(URLS.ping)
  } catch {
    return false;
  }
  return true;
}

// TODO error handling
export const predict_letter = async (
  img: string
): Promise<LetterPrediction> => {
  return axios
    .post<LetterPrediction>(URLS.letterPrediction, { frames: [img] })
    .then((response) => response.data);
};

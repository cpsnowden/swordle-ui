import axios from "axios";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const URLS = {
  ping: `${BACKEND_API}/`,
  letterPrediction: `${BACKEND_API}/letter-prediction/frame-sequence`
}

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

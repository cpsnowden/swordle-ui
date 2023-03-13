import axios from "axios";

const LETTER_PREDICTION_URL = `${process.env.REACT_APP_BACKEND_API}/letter-prediction/frame-sequence`;

export type PredictionStatus = 'no_hand_detected' | 'success'
export interface LetterPrediction {
  predictionStatus: PredictionStatus
  prediction: string;
}

// TODO error handling
export const predict_letter = async (
  img: string): Promise<LetterPrediction> => {
  return axios
    .post<LetterPrediction>(LETTER_PREDICTION_URL, { frames: [img], })
    .then((response) => response.data)
};

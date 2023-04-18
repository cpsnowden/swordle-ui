import { axiosClient } from "lib/axios";

export type PredictionStatus = "no_hand_detected" | "success";
export interface LetterPrediction {
  predictionStatus: PredictionStatus;
  prediction: string;
}

// TODO error handling
export const predict_letter = async (
  img: string
): Promise<LetterPrediction> => {
  return axiosClient
    .post<LetterPrediction>("letter-prediction/b64-frame", {
      b64_frame: img,
    })
    .then((response) => response.data);
};

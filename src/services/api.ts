import axios from "axios"

const LETTER_PREDICTION_URL = `${process.env.REACT_APP_BACKEND_API}/letter-prediction/frame-sequence`;

export interface LetterPrediction {
  prediction: string
}

// TODO error handling
export const predict_letter = (frames: string[],
                              onSuccess: (prediction: LetterPrediction) => void): void => {
  axios.post<LetterPrediction>(LETTER_PREDICTION_URL, {'frames': frames})
       .then(response => onSuccess(response.data))
}

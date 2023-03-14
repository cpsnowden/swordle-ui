export const videoConstraints: MediaStreamConstraints["video"] = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export const API_POLL_INTERVAL_MS = 5000;

const BACKEND_API = process.env.REACT_APP_BACKEND_API;
export const URLS = {
  ping: `${BACKEND_API}/`,
  letterPrediction: `${BACKEND_API}/letter-prediction/frame-sequence`
}

export const CELL_REVEAL_MS = 350;

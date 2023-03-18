import { useContext } from "react";
import { AlertContext } from "./alert.context";

export const useAlert = () => useContext(AlertContext);

import { hideAlert, showAlert } from "../../reducers/alertSlice";
import store from "../store";

export const showSystemAlert = (message, severity) => {
  store.dispatch(
    showAlert({
      isVisible: true,
      message,
      severity,
    })
  );
};
export const hideSystemAlert = () => {
  store.dispatch(hideAlert());
};

import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../../reducers/alertSlice";

const SystemAlerts = () => {
  const alertState = useSelector((state) => state.alertHMS);
  const [open, setOpen] = useState(false);

  const [transition] = useState(undefined);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (alertState.isVisible) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [alertState]);

  useEffect(() => {
    let timeout = null;
    if (!open) {
      timeout = setTimeout(() => {
        dispatch(hideAlert());
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={transition}
      autoHideDuration={4000}
      sx={{
        "& .MuiSnackbarContent-root": {
          backgroundColor: "transparent",
          boxShadow: 0,
        },
      }}
      message={
        <Alert
          {...(alertState.severity.length > 1 && {
            severity: alertState.severity,
          })}
        >
          {alertState.message}
        </Alert>
      }
      key={transition ? transition.name : ""}
    />
  );
};

export default SystemAlerts;

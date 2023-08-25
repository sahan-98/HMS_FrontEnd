import Header from "../Header";
import Layout from "../Layout";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
} from "@mui/material";
import BlueAcentCard from "../../../components/BlueAcentCard/BlueAcentCard";
import HeadingText from "../../../components/HeadingText/HeadingText";
import Progress from "./Progress";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHeartDiseasePrediction } from "../../../reducers/heartDiseasePredictionSlice";
import Actions from "../../../components/Actions/Actions";

const StyledButton = styled(Button)(`
border-radius: 7px;
border: 1px solid #DEDEDE;
background: #59C169; 
color: #fff;
:hover {
  background: #68E87D;
}
`);

const Step03 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const heartDiseasePredictionState = useSelector(
    (state) => state.heartDiseasePrediction
  );
  const [restingBloodPressure, setRestingBloodPressure] = useState("");
  const [restingEcg, setRestingEcg] = useState("");
  const [maxHeartRate, setMaxHeartRate] = useState("");

  const handleNextClick = useCallback(() => {
    dispatch(
      setHeartDiseasePrediction({
        ...heartDiseasePredictionState,
        restingBloodPressure: restingBloodPressure,
        restingEcg: restingEcg,
        maxHeartRate: maxHeartRate,
      })
    );
    navigate("/patient-portal/heart-disease-prediction/step-04");
  }, [
    navigate,
    dispatch,
    heartDiseasePredictionState,
    restingBloodPressure,
    restingEcg,
    maxHeartRate,
  ]);
  const handleBackClick = useCallback(() => {
    navigate("/patient-portal/heart-disease-prediction/step-02");
  }, [navigate]);

  const onChangeRestingEcg = useCallback((event) => {
    setRestingEcg(event.target.value);
  }, []);

  const onChangeMaxHeartRate = useCallback((event) => {
    setMaxHeartRate(event.target.value);
  }, []);

  const onChangeRestingBloodPressure = useCallback((event) => {
    setRestingBloodPressure(event.target.value);
  }, []);

  return (
    <Layout>
      <Header />
      <Actions />
      <div
        style={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          gap: "8rem",
        }}
      >
        <BlueAcentCard>
          <HeadingText text="Heart disease prediction" />
          <TextField
            label="Resting bp"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">mm Hg</InputAdornment>
              ),
            }}
            value={restingBloodPressure}
            onChange={onChangeRestingBloodPressure}
          />
          <FormControl fullWidth sx={{ textAlign: "start", mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Resting ECG</InputLabel>
            <Select
              value={restingEcg}
              label="Resting ECG"
              onChange={onChangeRestingEcg}
            >
              <MenuItem value={"NO_SELECTION"}>Please select</MenuItem>
              <MenuItem value={"Normal"}>
                Having ST-T wave abnormality (T wave inversions and/or ST
                elevation or depression of &gt; 0.05 mV)
              </MenuItem>
              <MenuItem value={"LVH"}>
                showing probable or definite left ventricular hypertrophy by
                Estes&apos; criteria
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Max Heart Rate"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            value={maxHeartRate}
            onChange={onChangeMaxHeartRate}
          />

          <Progress currentStep={2} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "3rem",
            }}
          >
            <Button
              fullWidth
              sx={{ my: 4 }}
              onClick={handleBackClick}
              variant="outlined"
              color="warning"
            >
              Back
            </Button>
            <StyledButton fullWidth sx={{ my: 4 }} onClick={handleNextClick}>
              Next
            </StyledButton>
          </Box>
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default Step03;

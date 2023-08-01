import Header from "../Header";
import Layout from "../Layout";
import { Box, Button, TextField, styled } from "@mui/material";
import BlueAcentCard from "../../../components/BlueAcentCard/BlueAcentCard";
import HeadingText from "../../../components/HeadingText/HeadingText";
import Progress from "./Progress";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHeartDiseasePrediction } from "../../../reducers/heartDiseasePredictionSlice";

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
            value={restingBloodPressure}
            onChange={onChangeRestingBloodPressure}
          />
          <TextField
            label="Resting ECG"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onChange={onChangeRestingEcg}
            value={restingEcg}
          />
          <TextField
            label="Max HR"
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

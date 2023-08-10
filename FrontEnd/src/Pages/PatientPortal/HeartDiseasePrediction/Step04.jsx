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

const Step04 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const heartDiseasePredictionState = useSelector(
    (state) => state.heartDiseasePrediction
  );
  const [stSlope, setStlope] = useState("");
  const [oldPeak, setOldPeak] = useState("");
  const [exerciseAngina, setExerciseAngina] = useState("");

  const handleNextClick = useCallback(() => {
    dispatch(
      setHeartDiseasePrediction({
        ...heartDiseasePredictionState,
        stSlope: stSlope,
        oldPeak: oldPeak,
        exerciseAngina: exerciseAngina,
      })
    );
    navigate("/patient-portal/heart-disease-prediction/result");
  }, [
    navigate,
    dispatch,
    heartDiseasePredictionState,
    stSlope,
    oldPeak,
    exerciseAngina,
  ]);

  const handleBackClick = useCallback(() => {
    navigate("/patient-portal/heart-disease-prediction/step-03");
  }, [navigate]);

  const handleStSlopeChange = useCallback((e) => {
    setStlope(e.target.value);
  }, []);

  const handleOldPeakChange = useCallback((e) => {
    setOldPeak(e.target.value);
  }, []);

  const handleExerciseAnginaChange = useCallback((e) => {
    setExerciseAngina(e.target.value);
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
            label="St slope"
            variant="outlined"
            fullWidth
            onChange={handleStSlopeChange}
          />
          <TextField
            label="Old peak"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onChange={handleOldPeakChange}
          />
          <TextField
            label="Exercise angina"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onChange={handleExerciseAnginaChange}
          />

          <Progress currentStep={3} />
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
              Predict
            </StyledButton>
          </Box>
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default Step04;

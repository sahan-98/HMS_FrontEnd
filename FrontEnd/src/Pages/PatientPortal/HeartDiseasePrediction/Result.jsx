import BlueAcentCard from "../../../components/BlueAcentCard/BlueAcentCard";
import HeadingText from "../../../components/HeadingText/HeadingText";
import Header from "../Header";
import Layout from "../Layout";
import done from "../../../assets/images/done.png";
import warning from "../../../assets/images/warning.png";
import { Box, Button, styled } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import HeartDiseasePredictionService from "../../../app/services/heart-disease-prediction-service";
import { useSelector } from "react-redux";
import processingData from "../../../assets/images/processing-data.png";
import PositiveResult from "./PositiveResult";
import { useNavigate } from "react-router-dom";

const StyledText = styled("span")(
  `
  color: #636363;
text-align: center;
font-family: Hina Mincho;
font-style: normal;
font-weight: 400;
`,
  (props) => ({
    fontSize: props.fontSize,
  })
);

const Result = () => {
  const [result, setResult] = useState({
    prediction: true,
    urgentStatus: false,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const heartDiseasePredictionState = useSelector(
    (state) => state.heartDiseasePrediction
  );

  const getHeartDiseasePrediction = useCallback(async () => {
    try {
      setLoading(true);
      const response = await HeartDiseasePredictionService.predictHeartDisease({
        patientId: 1,
        age: heartDiseasePredictionState.age,
        sex: heartDiseasePredictionState.gender,
        chest_pain_type: heartDiseasePredictionState.chestPainType,
        resting_bp: heartDiseasePredictionState.restingBloodPressure,
        cholesterol: heartDiseasePredictionState.cholestrol,
        fasting_bs: heartDiseasePredictionState.fastingBloodSugar,
        resting_ecg: heartDiseasePredictionState.restingEcg,
        max_hr: heartDiseasePredictionState.maxHeartRate,
        exercise_angina: heartDiseasePredictionState.exerciseAngina,
        oldpeak: heartDiseasePredictionState.oldPeak,
        st_slope: heartDiseasePredictionState.stSlope,
      });
      setResult(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [heartDiseasePredictionState, setResult]);

  useEffect(() => {
    getHeartDiseasePrediction();
  }, [getHeartDiseasePrediction]);

  const Negative = (
    <>
      <HeadingText text="Heart disease prediction" />
      <img src={done} alt="" width={"150px"} />
      <div>
        <StyledText fontSize="24px">Your results are negative.</StyledText>
      </div>
      <Box my={1}>
        <StyledText fontSize="16px">
          We are happy to see you healthy. You can channel doctor anytime
        </StyledText>
      </Box>
      <Button
        variant="text"
        sx={{
          mb: 2,
          fontWeight: "bold",
        }}
        onClick={() => navigate("/patient-portal/channel-doctor/step-01")}
      >
        Channel Doctor
      </Button>
    </>
  );

  const Loading = (
    <>
      <HeadingText text="Heart disease prediction" />
      <img src={processingData} alt="" width={"185px"} />
      <div>
        <StyledText fontSize="24px">Loading results</StyledText>
      </div>
      <Box my={1}>
        <StyledText fontSize="16px">
          Please wait, we are processing your results.
        </StyledText>
      </Box>
      <Button
        variant="text"
        sx={{
          mb: 2,
          fontWeight: "bold",
        }}
        disabled
      >
        Channel Doctor
      </Button>
    </>
  );
  return (
    <Layout>
      <Header />
      <div
        style={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <BlueAcentCard>
          {loading ? (
            Loading
          ) : result?.prediction ? (
            <PositiveResult urgentStatus={result?.urgentStatus} />
          ) : (
            Negative
          )}
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default Result;

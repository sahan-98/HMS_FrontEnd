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

  // const heartDiseasePredictionState = useSelector(
  //   (state) => state.heartDiseasePrediction
  // );
  const heartDiseasePredictionState = useMemo(
    () => ({
      patientId: 54,
      age: 54,
      sex: "M",
      chest_pain_type: "TA",
      resting_bp: 180,
      cholesterol: 250,
      fasting_bs: 1,
      resting_ecg: "LVH",
      max_hr: 300,
      exercise_angina: "N",
      oldpeak: 1,
      st_slope: "Down",
    }),
    []
  );

  const getHeartDiseasePrediction = useCallback(async () => {
    try {
      setLoading(true);
      const response = await HeartDiseasePredictionService.predictHeartDisease({
        ...heartDiseasePredictionState,
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
      >
        Channel Doctor
      </Button>
    </>
  );
  const Positive = (
    <>
      <HeadingText text="Heart disease prediction" />
      <img src={warning} alt="" width={"185px"} />
      <div>
        <StyledText fontSize="24px">You are in a risky zone.</StyledText>
      </div>
      <Box my={1}>
        <StyledText fontSize="16px">
          Channel a doctor to make sure everything is going well.
        </StyledText>
      </Box>
      <Button
        variant="text"
        sx={{
          mb: 2,
          fontWeight: "bold",
        }}
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
          {loading ? Loading : result?.prediction ? Positive : Negative}
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default Result;

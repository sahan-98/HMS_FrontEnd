import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
} from "@mui/material";
import BlueAcentCard from "../../../components/BlueAcentCard/BlueAcentCard";
import HeadingText from "../../../components/HeadingText/HeadingText";
import Header from "../Header";
import Layout from "../Layout";
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

const Step02 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const heartDiseasePredictionState = useSelector(
    (state) => state.heartDiseasePrediction
  );

  const [chestPainType, setChestPainType] = useState("NO_SELECTION");
  const [cholestrol, setCholestrol] = useState("");
  const [fastingBloodSugar, setFastingBloodSugar] = useState("");

  const handleNextClick = useCallback(() => {
    dispatch(
      setHeartDiseasePrediction({
        ...heartDiseasePredictionState,
        chestPainType: chestPainType,
        cholestrol: cholestrol,
        fastingBloodSugar: fastingBloodSugar,
      })
    );
    navigate("/patient-portal/heart-disease-prediction/step-03");
  }, [
    navigate,
    chestPainType,
    cholestrol,
    fastingBloodSugar,
    dispatch,
    heartDiseasePredictionState,
  ]);

  const handleChestPainTypeChange = useCallback((event) => {
    setChestPainType(event.target.value);
  }, []);
  const handleBackClick = useCallback(() => {
    navigate("/patient-portal/heart-disease-prediction/step-01");
  }, [navigate]);

  const onChangeCholestrol = useCallback(
    (event) => {
      setCholestrol(event.target.value);
    },
    [setCholestrol]
  );

  const onChangeFastingBloodSugar = useCallback(
    (event) => {
      setFastingBloodSugar(event.target.value);
    },
    [setFastingBloodSugar]
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
          gap: "8rem",
        }}
      >
        <BlueAcentCard>
          <HeadingText text="Heart disease prediction" />
          <FormControl fullWidth sx={{ textAlign: "start" }}>
            <InputLabel id="demo-simple-select-label">
              Chest Pain Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={chestPainType}
              label="Chest Pain Type"
              onChange={handleChestPainTypeChange}
            >
              <MenuItem value={"NO_SELECTION"}>Please select</MenuItem>
              <MenuItem value={"Angina"}>Angina</MenuItem>
              <MenuItem value={"Heart attack"}>Heart attack</MenuItem>
              <MenuItem value={"Aortic dissection"}>Aortic dissection</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Cholesterol"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onChange={onChangeCholestrol}
          />
          <TextField
            label="Fasting Blood Sugar"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onChange={onChangeFastingBloodSugar}
          />

          <Progress currentStep={1} />
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

export default Step02;

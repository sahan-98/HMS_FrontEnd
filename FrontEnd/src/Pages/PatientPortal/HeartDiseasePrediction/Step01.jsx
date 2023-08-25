import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled
} from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Actions from "../../../components/Actions/Actions";
import BlueAcentCard from "../../../components/BlueAcentCard/BlueAcentCard";
import HeadingText from "../../../components/HeadingText/HeadingText";
import { setHeartDiseasePrediction } from "../../../reducers/heartDiseasePredictionSlice";
import calculateAge from "../../../utils/calculate-age";
import Header from "../Header";
import Layout from "../Layout";
import Progress from "./Progress";

const StyledButton = styled(Button)(`
border-radius: 7px;
border: 1px solid #DEDEDE;
background: #59C169; 
color: #fff;
:hover {
  background: #68E87D;
}
`);

const Step01 = () => {
  const dispatch = useDispatch();
  const heartDiseasePredictionState = useSelector(
    (state) => state.heartDiseasePrediction
  );
  const navigate = useNavigate();
  const patient = useSelector((state) => state.patient);
  const [gender, setGender] = useState(patient.gender.substring(0, 1));
  const [name, setName] = useState(patient.firstname);
  const [age, setAge] = useState(calculateAge(new Date(patient.dateOfBirth)));

  const handleNextClick = useCallback(() => {
    dispatch(
      setHeartDiseasePrediction({
        ...heartDiseasePredictionState,
        name: name,
        age: age,
        gender: gender,
      })
    );
    navigate("/patient-portal/heart-disease-prediction/step-02");
  }, [navigate, dispatch, heartDiseasePredictionState, name, age, gender]);

  const handleGenderChange = useCallback((event) => {
    setGender(event.target.value);
  }, []);

  const onChangeName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const onChangeAge = useCallback(
    (event) => {
      setAge(event.target.value);
    },
    [setAge]
  );




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
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={onChangeName}
          />
          <TextField
            label="Age"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            value={age}
            onChange={onChangeAge}
          />
          <FormControl fullWidth sx={{ mt: 2, textAlign: "start" }}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={gender}
              label="Gender"
              onChange={handleGenderChange}
            >
              <MenuItem value={"NO_SELECTION"}>Please select</MenuItem>
              <MenuItem value={"M"}>Male</MenuItem>
              <MenuItem value={"F"}>Female</MenuItem>
            </Select>
          </FormControl>
          <Progress currentStep={0} />
          <StyledButton fullWidth sx={{ my: 4 }} onClick={handleNextClick}>
            Next
          </StyledButton>
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default Step01;

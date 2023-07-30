import Header from "../Header";
import Layout from "../Layout";
import {
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
import Progress from "./Progress";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [gender, setGender] = useState("NO_SELECTION");
  const handleNextClick = useCallback(() => {
    navigate("/patient-portal/heart-disease-prediction/result");
  }, [navigate]);

  const handleGenderChange = useCallback((event) => {
    setGender(event.target.value);
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
          <FormControl fullWidth sx={{ textAlign: "start" }}>
            <InputLabel id="demo-simple-select-label">
              Chest Pain Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={gender}
              label="Chest Pain Type"
              onChange={handleGenderChange}
            >
              <MenuItem value={"NO_SELECTION"}>Please select</MenuItem>
              <MenuItem value={"MALE"}>Male</MenuItem>
              <MenuItem value={"FEMALE"}>Female</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Cholesterol"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Fasting Bs"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />

          <Progress currentStep={4} />
          <StyledButton fullWidth sx={{ my: 4 }} onClick={handleNextClick}>
            Predict
          </StyledButton>
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default Step04;

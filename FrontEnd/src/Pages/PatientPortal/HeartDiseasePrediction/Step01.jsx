import BlueAcentCard from "../../../components/BlueAcentCard/BlueAcentCard";
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
import Progress from "./Progress";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadingText from "../../../components/HeadingText/HeadingText";

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
  const navigate = useNavigate();
  const [gender, setGender] = useState("NO_SELECTION");

  const handleNextClick = useCallback(() => {
    navigate("/patient-portal/heart-disease-prediction/step-02");
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
          <TextField label="Name" variant="outlined" fullWidth />
          <TextField label="Age" variant="outlined" fullWidth sx={{ mt: 2 }} />
          <FormControl fullWidth sx={{ mt: 2, textAlign: "start" }}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={gender}
              label="Gender"
              onChange={handleGenderChange}
            >
              <MenuItem value={"NO_SELECTION"}>Please select</MenuItem>
              <MenuItem value={"MALE"}>Male</MenuItem>
              <MenuItem value={"FEMALE"}>Female</MenuItem>
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

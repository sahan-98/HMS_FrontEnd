import BlueAcentCard from "../../components/BlueAcentCard/BlueAcentCardLogin";

import Layout from "../PatientPortal/Layout";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
} from "@mui/material";
import Header from "../PatientPortal/Header";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadingText from "../../components/HeadingText/HeadingText";
import DoctorService from "../../app/services/doctor-service";
import PatientService from "../../app/services/patient-service";

const StyledButton = styled(Button)(`
border-radius: 7px;
border: 1px solid #DEDEDE;
background: #59C169; 
color: #fff;
:hover {
  background: #68E87D;
}
`);

const GeneralLogin = () => {
  const navigate = useNavigate();
  const [iamUser, setIAmUser] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleIAmUserChange = useCallback((event) => {
    setIAmUser(event.target.value);
  }, []);

  const handleUsernameChange = useCallback((event) => {
    setUserName(event.target.value);
  }, []);

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const handleLoginClick = useCallback(async () => {
    if (iamUser === "DOCTOR") {
      const doctorLogin = await DoctorService.login({
        userName: userName,
        password: password,
      });
      console.log(doctorLogin);
    } else if (iamUser === "PATIENT") {
      const patientLogin = await PatientService.login({
        userName: userName,
        password: password,
      });
      console.log(patientLogin);
    }
  }, [navigate, iamUser]);

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
          <HeadingText text="Login to your account" />
          <TextField
            label="User Name"
            variant="outlined"
            fullWidth
            value={userName}
            onChange={handleUsernameChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={handlePasswordChange}
            sx={{ mt: 2 }}
          />

          <FormControl fullWidth sx={{ mt: 2, textAlign: "start" }}>
            <InputLabel id="demo-simple-select-label">I am a</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={iamUser}
              label="I am a"
              onChange={handleIAmUserChange}
            >
              <MenuItem value={"DOCTOR"}>Doctor</MenuItem>
              <MenuItem value={"PATIENT"}>Patient</MenuItem>
            </Select>
          </FormControl>

          <StyledButton fullWidth sx={{ my: 4 }} onClick={handleLoginClick}>
            Login
          </StyledButton>
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default GeneralLogin;

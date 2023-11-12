import { Button, TextField, styled } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showSystemAlert } from "../../app/services/alertServices";
import MedOfficerService from "../../app/services/med-officer-service";
import BlueAcentCard from "../../components/BlueAcentCard/BlueAcentCardLogin";
import Header from "../../components/Header/Header";
import HeadingText from "../../components/HeadingText/HeadingText";
import { login } from "../../reducers/loginSlice";
import { setMedicalOfficer } from "../../reducers/medicalOfficerSlice";
import Layout from "../PatientPortal/Layout";

const StyledButton = styled(Button)(`
border-radius: 7px;
border: 1px solid #DEDEDE;
background: #59C169; 
color: #fff;
:hover {
  background: #68E87D;
}
`);

const MedOfficerLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleUsernameChange = useCallback((event) => {
    setUserName(event.target.value);
  }, []);

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const handleLoginClick = useCallback(async () => {
    if (userName === "") {
      setUsernameError("Please enter username");
      return;
    } else {
      setUsernameError(null);
    }
    if (password === "") {
      setPasswordError("Please enter password");
      return;
    } else {
      setPasswordError(null);
    }

    try {
      const medicalOfficerLogin = await MedOfficerService.login({
        userName: userName,
        password: password,
      });
      console.log(medicalOfficerLogin);
      const labAssistantId = medicalOfficerLogin?.medOfficer?._id;
      if (labAssistantId) {
        showSystemAlert("You have successfully logged in", "success");
        dispatch(login({ userId: labAssistantId }));
        dispatch(setMedicalOfficer({ ...medicalOfficerLogin.labAssistant }));
        navigate("/lab-assistant-portal/view-assignments");
      }
    } catch (error) {
      console.log(error);
    }
  }, [navigate, userName, password, dispatch]);

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
          <HeadingText text="Medical Officer Login" />
          <TextField
            label="User Name"
            variant="outlined"
            fullWidth
            value={userName}
            onChange={handleUsernameChange}
            error={usernameError !== null}
            {...(usernameError && { helperText: usernameError })}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={handlePasswordChange}
            sx={{ mt: 2 }}
            error={passwordError !== null}
            {...(passwordError && { helperText: passwordError })}
          />
          <StyledButton fullWidth sx={{ my: 4 }} onClick={handleLoginClick}>
            Login
          </StyledButton>
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default MedOfficerLogin;

import BlueAcentCard from "../../components/BlueAcentCard/BlueAcentCardLogin";
import { Button, TextField, styled } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showSystemAlert } from "../../app/services/alertServices";
import DoctorService from "../../app/services/doctor-service";
import HeadingText from "../../components/HeadingText/HeadingText";
import { login } from "../../reducers/loginSlice";
import Header from "../PatientPortal/Header";
import Layout from "../PatientPortal/Layout";
import UserService from "../../app/services/user-service";

const StyledButton = styled(Button)(`
border-radius: 7px;
border: 1px solid #DEDEDE;
background: #59C169; 
color: #fff;
:hover {
  background: #68E87D;
}
`);

const AdminLogin = () => {
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
      const userLogin = await UserService.login({
        userName: userName,
        password: password,
      });
      console.log(userLogin);
      const { _id } = userLogin.userObj;
      if (_id) {
        showSystemAlert("You have successfully logged in", "success");
        dispatch(login({ userId: _id }));
        navigate("/");
      }
    } catch (error) {
      showSystemAlert("Login failed", "error");
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
          <HeadingText text="Admin Login" />
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

export default AdminLogin;

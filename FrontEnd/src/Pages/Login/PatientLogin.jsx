import BlueAcentCard from "../../components/BlueAcentCard/BlueAcentCardLogin";

import Layout from "../PatientPortal/Layout";
import { Button, TextField, styled } from "@mui/material";
import Header from "../PatientPortal/Header";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import HeadingText from "../../components/HeadingText/HeadingText";

const StyledButton = styled(Button)(`
border-radius: 7px;
border: 1px solid #DEDEDE;
background: #59C169; 
color: #fff;
:hover {
  background: #68E87D;
}
`);

const PatientLogin = () => {
  const navigate = useNavigate();

  const handleNextClick = useCallback(() => {
    navigate("/patient-portal/landing");
  }, [navigate]);

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
          <TextField label="User Name" variant="outlined" fullWidth />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />

          <StyledButton fullWidth sx={{ my: 4 }} onClick={handleNextClick}>
            Login
          </StyledButton>
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default PatientLogin;

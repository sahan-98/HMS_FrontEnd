import { Box, Button, TextField, styled } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BlueAcentCard from "../../../components/BlueAcentCard/BlueAcentCard";
import HeadingText from "../../../components/HeadingText/HeadingText";
import Header from "../Header";
import Layout from "../Layout";
import { useSelector } from "react-redux";
import Actions from "../../../components/Actions/Actions";

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
  const patient = useSelector((state) => state.patient);

  const handleNextClick = useCallback(() => {
    navigate("/patient-portal/channel-doctor/payment");
  }, [navigate]);

  const handleBackClick = useCallback(() => {
    navigate("/patient-portal/channel-doctor/step-01");
  }, [navigate]);

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
        <BlueAcentCard width="450px">
          <HeadingText text="Channel Doctor" />
          <TextField
            label="Your name"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            value={patient?.firstname}
          />
          <TextField
            label="Mobile no"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            value={patient?.mobile}
          />
          <TextField
            label="Email address"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            value={patient?.email}
          />

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

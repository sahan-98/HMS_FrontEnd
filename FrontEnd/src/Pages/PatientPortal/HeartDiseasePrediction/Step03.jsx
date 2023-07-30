import Header from "../Header";
import Layout from "../Layout";
import { Box, Button, TextField, styled } from "@mui/material";
import BlueAcentCard from "../../../components/BlueAcentCard/BlueAcentCard";
import HeadingText from "../../../components/HeadingText/HeadingText";
import Progress from "./Progress";
import { useCallback } from "react";
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

const Step03 = () => {
  const navigate = useNavigate();
  const handleNextClick = useCallback(() => {
    navigate("/patient-portal/heart-disease-prediction/step-04");
  }, [navigate]);
  const handleBackClick = useCallback(() => {
    navigate("/patient-portal/heart-disease-prediction/step-02");
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
          <HeadingText text="Heart disease prediction" />
          <TextField label="Resting bp" variant="outlined" fullWidth />
          <TextField
            label="Resting ECG"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Max HR"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />

          <Progress currentStep={2} />
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

export default Step03;

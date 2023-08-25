import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BlueAcentCard from "../../../components/BlueAcentCard/BlueAcentCard";
import HeadingText from "../../../components/HeadingText/HeadingText";
import Header from "../Header";
import Layout from "../Layout";
import paymentOptions from "../../../assets/images/payment-options.png";
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

const Payment = () => {
  const navigate = useNavigate();
  const appointmentDetails = useSelector((state) => state.placeAppointment);

  const handleNextClick = useCallback(() => {
    navigate("/patient-portal/channel-doctor/completed");
  }, [navigate]);

  const handleBackClick = useCallback(() => {
    navigate("/patient-portal/channel-doctor/step-02");
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

          <Typography
            sx={{
              fontSize: "1.5rem",
              color: "#636363",
            }}
          >
            Channeling Fee : € {appointmentDetails.fee}
          </Typography>

          <TextField
            label="Card number"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            InputProps={{
              endAdornment: (
                <img src={paymentOptions} alt="visa" width="120px" />
              ),
            }}
          />
          <TextField
            label="Expiry date"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField label="CVV" variant="outlined" fullWidth sx={{ mt: 2 }} />

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
              Proceed
            </StyledButton>
          </Box>
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default Payment;

import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { showSystemAlert } from "../../app/services/alertServices";
import BedService from "../../app/services/bed-service";
import LabReportService from "../../app/services/lab-report-service";
import paymentOptions from "../../assets/images/payment-options.png";
import BlueAcentCard from "../../components/BlueAcentCard/BlueAcentCard";
import HeadingText from "../../components/HeadingText/HeadingText";
import Header from "./Header";
import Layout from "./Layout";

const StyledButton = styled(Button)(`
border-radius: 7px;
border: 1px solid #DEDEDE;
background: #59C169; 
color: #fff;
:hover {
  background: #68E87D;
}
`);

const PayBill = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const billType = searchParams.get("billtype");
  const amount = searchParams.get("amount");
  const billId = searchParams.get("billid");

  const handleNextClick = useCallback(async () => {
    try {
      if (billType === "labReportBill") {
        await LabReportService.payLabReportBill({
          labBillId: billId,
        });
        showSystemAlert("Payment Successful", "success");
        navigate("/patient-portal/view-bills");
      }
      if (billType === "bedBill") {
        await BedService.payBedBill({
          bedBillId: billId,
        });
        showSystemAlert("Payment Successful", "success");
        navigate("/patient-portal/view-bills");
      }
    } catch (error) {
      showSystemAlert("Failed to make the payment", "error");
    }
  }, [navigate, billId, billType]);

  const handleBackClick = useCallback(() => {
    navigate("/patient-portal/view-bills");
  }, [navigate]);

  let billHeadingName = "";

  if (billType === "labReportBill") {
    billHeadingName = "Lab Report Bill";
  }
  if (billType === "bedBill") {
    billHeadingName = "Bed Bill";
  }

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
        <BlueAcentCard width="450px">
          <HeadingText text={billHeadingName} />

          <Typography
            sx={{
              fontSize: "1.5rem",
              color: "#636363",
            }}
          >
            Amount Payable : € {amount}
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
              Pay Bill
            </StyledButton>
          </Box>
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default PayBill;

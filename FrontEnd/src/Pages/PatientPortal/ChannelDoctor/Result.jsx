import BlueAcentCard from "../../../components/BlueAcentCard/BlueAcentCard";
import HeadingText from "../../../components/HeadingText/HeadingText";
import Header from "../Header";
import Layout from "../Layout";
import done from "../../../assets/images/done.png";
import warning from "../../../assets/images/warning.png";
import { Box, Button, styled } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppointmentService from "../../../app/services/appointment-service";
import processingData from "../../../assets/images/processing-data.png";

const StyledText = styled("span")(
  `
  color: #636363;
text-align: center;
font-family: Hina Mincho;
font-style: normal;
font-weight: 400;
padding-bottom: 3rem;
`,
  (props) => ({
    fontSize: props.fontSize,
  })
);

const Result = () => {
  const [appointmentPlaced, setAppointmentPlaced] = useState(true);
  const appointmentDetails = useSelector((state) => state.placeAppointment);
  const [loading, setLoading] = useState(true);

  const placeAppointment = useCallback(async () => {
    try {
      const newAppointment = await AppointmentService.placeNewAppointment({
        data: {
          ...appointmentDetails,
        },
      });
      console.log(newAppointment);
      const { message } = newAppointment;
      if (message === "Successfull") {
        setAppointmentPlaced(true);
      } else {
        setAppointmentPlaced(false);
      }
    } catch (error) {
      setAppointmentPlaced(false);
    } finally {
      setLoading(false);
    }
  }, [appointmentDetails]);

  useEffect(() => {
    placeAppointment();
  }, [placeAppointment]);

  const Success = (
    <>
      <HeadingText text="Channel Doctor" />
      <img src={done} alt="" width={"150px"} />
      <div>
        <StyledText fontSize="24px">Appointment Placed</StyledText>
      </div>
      <Box my={3}>
        <StyledText fontSize="16px">
          We have sent you an email with the appointment details. Please keep
          the session time available.
        </StyledText>
      </Box>
    </>
  );

  const Loading = (
    <>
      <HeadingText text="Heart disease prediction" />
      <img src={processingData} alt="" width={"185px"} />
      <div>
        <StyledText fontSize="24px">Loading results</StyledText>
      </div>
      <Box my={1}>
        <StyledText fontSize="16px">
          Please wait, we are processing your results.
        </StyledText>
      </Box>
      <Button
        variant="text"
        sx={{
          mb: 2,
          fontWeight: "bold",
        }}
        disabled
      >
        Channel Doctor
      </Button>
    </>
  );

  const Failed = (
    <>
      <HeadingText text="Channel Doctor" />
      <img src={warning} alt="" width={"185px"} />
      <div>
        <StyledText fontSize="24px">An error occured!</StyledText>
      </div>
      <Box my={3}>
        <StyledText fontSize="16px">
          Couldn't place the appointment. Please try again.
        </StyledText>
      </Box>
    </>
  );
  return (
    <Layout>
      <Header />
      <div
        style={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <BlueAcentCard>
          <Button
            sx={{
              position: "absolute",
              top: "10px",
            }}
            onClick={() => setAppointmentPlaced(!appointmentPlaced)}
          >
            sw
          </Button>
          {loading ? Loading : appointmentPlaced ? Success : Failed}
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default Result;

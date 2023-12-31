import BlueAcentCard from "../../../components/BlueAcentCard/BlueAcentCard";
import HeadingText from "../../../components/HeadingText/HeadingText";
import Header from "../Header";
import Layout from "../Layout";
import done from "../../../assets/images/done.png";
import warning from "../../../assets/images/warning.png";
import { Box, Button, styled } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppointmentService from "../../../app/services/appointment-service";
import processingData from "../../../assets/images/processing-data.png";
import { useNavigate } from "react-router";
import Actions from "../../../components/Actions/Actions";
import {
  clearDetails,
  placeAppointment,
} from "../../../reducers/placeAppointmentSlice";

const StyledText = styled("span")(
  `
color: #636363;
text-align: center;
font-family: Hina Mincho;
font-style: normal;
font-weight: 400;
padding-top: 3rem;
padding-bottom: 3rem;
`,
  (props) => ({
    fontSize: props.fontSize,
  })
);

const Result = () => {
  const navigate = useNavigate();
  const [appointmentPlaced, setAppointmentPlaced] = useState(false);
  const appointmentDetails = useSelector((state) => state.placeAppointment);
  const [loading, setLoading] = useState(true);
  const userType = useSelector((state) => state.login.userType);
  const dispatch = useDispatch();



  const makeAppointment = useCallback(async () => {
    if (appointmentDetails.patientid !== "") {
      try {
        if (appointmentDetails.appointmentId) {
          const updatedAppointment = await AppointmentService.updateAppointment(
            {
              data: {
                ...appointmentDetails,
              },
            }
          );
          if (updatedAppointment?.message === "Successfull") {
            setAppointmentPlaced(true);
          } else {
            setAppointmentPlaced(false);
          }
        } else {
          if (appointmentDetails.type === "Urgent") {
            const newAppointment =
              await AppointmentService.placeNewUrgentAppointment({
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
          } else {
            const newAppointment = await AppointmentService.placeNewAppointment(
              {
                data: {
                  ...appointmentDetails,
                  type: "Normal",
                },
              }
            );
            console.log(newAppointment);
            const { message } = newAppointment;
            if (message === "Successfull") {
              setAppointmentPlaced(true);
            } else {
              setAppointmentPlaced(false);
            }
          }
        }
      } catch (error) {
        setAppointmentPlaced(false);
      } finally {
        setLoading(false);
      }
    }
  }, [appointmentDetails]);

  useEffect(() => {
    makeAppointment();
  }, [makeAppointment]);

  useEffect(() => {
    if (appointmentPlaced) {
      dispatch(
        placeAppointment({
          type: appointmentDetails.type,
          appointmentId: undefined,
          detectionId: "",
          doctorid: "",
          patientid: "",
          bookingDate: "",
          appointmentType: "",
          fee: "",
          doctorAvailability: "",
        })
      );
    }
  }, [appointmentPlaced, dispatch, makeAppointment,appointmentDetails]);

  const Success = (
    <>
      <HeadingText
        text={
          appointmentDetails.type === "Urgent" && userType === "patient"
            ? "Emergency Request"
            : "Channel Doctor"
        }
      />
      <img src={done} alt="" width={"150px"} />
      <div>
        <StyledText fontSize="24px">
          {appointmentDetails.type === "Urgent" && userType === "patient"
            ? "Request Completed!"
            : "Appointment Placed"}{" "}
        </StyledText>
      </div>
      <Box my={3}>
        <StyledText fontSize="16px">
          We have sent you an email with the appointment details. Please keep
          the session time available.
        </StyledText>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{
          mb: 2,
          fontWeight: "bold",
          boxShadow: 0,
        }}
        onClick={() => {
          if (userType === "patient") {
            navigate("/patient-portal/landing");
          } else {
            navigate("/medical-officer-portal/view-appointments");
          }
        }}
      >
        Back to Home
      </Button>
    </>
  );

  const Loading = (
    <>
      <HeadingText text="Please wait..." />
      <img src={processingData} alt="" width={"185px"} />
      <div>
        <StyledText fontSize="24px">Loading results</StyledText>
      </div>
      <Box my={3}>
        <StyledText fontSize="16px">
          Please wait, we are placing an appointment for you.
        </StyledText>
      </Box>
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
          Couldn&apos;t place the appointment. Please try again.
        </StyledText>
      </Box>
    </>
  );
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
        }}
      >
        <BlueAcentCard>
          {loading ? Loading : appointmentPlaced ? Success : Failed}
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default Result;

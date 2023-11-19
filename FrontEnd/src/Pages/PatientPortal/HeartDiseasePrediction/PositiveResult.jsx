import HeadingText from "../../../components/HeadingText/HeadingText";
import { Box, Button, CircularProgress, styled } from "@mui/material";
import warning from "../../../assets/images/warning.png";
import { Call } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import BedService from "../../../app/services/bed-service";
import DoctorService from "../../../app/services/doctor-service";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { placeAppointment } from "../../../reducers/placeAppointmentSlice";

const StyledText = styled("span")(
  `
color: #636363;
text-align: center;
font-family: Hina Mincho;
font-style: normal;
font-weight: 400;
`,
  (props) => ({
    fontSize: props.fontSize,
  })
);

const doctorDays = [
  "sunAvailbleTime",
  "monAvailbleTime",
  "tueAvailbleTime",
  "wensAvailbleTime",
  "thusAvailbleTime",
  "friAvailbleTime",
  "satAvailbleTime",
];

const PositiveResult = ({ urgentStatus }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState(null);
  const [bed, setBed] = useState(null);
  const patient = useSelector((state) => state.patient);
  const appointmentId = useSelector(
    (state) => state.heartDiseasePrediction.appointmentId
  );
  const detectionId = useSelector(
    (state) => state.placeAppointment.detectionId
  );
  const userType = useSelector(
    (state) => state.login.userType
  );

  const allocateDoctor = useCallback(async () => {
    setDoctor(null);
    try {
      let responseBody = {};
      if (appointmentId) {
        responseBody =
          await DoctorService.autoAllocateDoctorForExistingAppointment({
            patientid: patient._id,
            bookingDate: new Date().toISOString().split("T")[0],
          });
      } else {
        responseBody = await DoctorService.autoAllocateDoctor({
          patientid: patient._id,
          bookingDate: new Date().toISOString().split("T")[0],
        });
      }

      const { allocated_doc } = responseBody;
      if (!allocated_doc) {
        throw new Error("No doctors available");
      }
      setDoctor(allocated_doc);
      return allocated_doc;
    } catch (error) {
      setDoctor({ name: "No doctors available" });
      Swal.fire({
        title: "Sorry!",
        text: "No doctors available",
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(function () {
        if(userType === "patient"){
          navigate("/patient-portal/landing");
        }else{
          navigate("/medical-officer-portal/view-appointments");
        }
      });
      return;
    }
  }, [patient]);

  const allocateBed = useCallback(async () => {
    try {
      setBed(null);
      const responseBody = await BedService.autoAllocateBed({
        patientid: patient._id,
        allocatedDate: new Date().toISOString().split("T")[0],
      });
      const { allocated_bed } = responseBody;
      setBed(allocated_bed);
    } catch (error) {
      setBed({ bedNo: "No bed available" });
      Swal.fire({
        title: "Sorry!",
        text: "No beds available",
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(function () {
        navigate("/patient-portal/landing");
      });
      return;
    }
  }, [patient]);

  const makeAllocation = useCallback(async () => {
    const allocatedDoctor = await allocateDoctor();
    if (allocatedDoctor?.doctorid) {
      const allocatedBed = await allocateBed();
      if (allocatedBed) {
        return true;
      }
    }
  }, [allocateBed, allocateDoctor]);

  useEffect(() => {
    if (urgentStatus) {
      makeAllocation();
    }
  }, [urgentStatus, makeAllocation]);

  const onClickContinue = useCallback(() => {
    //find first date of doctor availability
    const firstAvailableDay = doctorDays.find((day) => {
      console.log(doctor);
      return doctor[day]?.length > 0;
    });

    console.log(firstAvailableDay);

    dispatch(
      placeAppointment({
        detectionId: detectionId,
        appointmentId: appointmentId,
        doctorid: doctor?.doctorid,
        patientid: patient._id,
        bookingDate: new Date().toISOString().split("T")[0],
        type: "Urgent",
        fee: doctor?.fee,
        doctorAvailability: firstAvailableDay,
      })
    );
    navigate("/patient-portal/heart-disease-prediction/payment");
  }, [dispatch, appointmentId, doctor, patient._id, navigate]);

  if (urgentStatus) {
    return (
      <>
        <HeadingText text="Heart disease prediction" />
        <img src={warning} alt="" width={"105px"} />
        <div>
          <StyledText fontSize="24px">You are in a risky zone.</StyledText>
        </div>
        <Box my={1}>
          <StyledText fontSize="16px">
            Please hang on, we will assign a doctor and bed for you.
          </StyledText>
        </Box>
        <Box my={1}>
          <StyledText fontSize="16px">
            Doctor :
            {doctor === null ? (
              <CircularProgress size={10} sx={{ ml: 2 }} />
            ) : (
              doctor?.name
            )}
          </StyledText>
        </Box>
        <Box my={1}>
          <StyledText fontSize="16px">
            Assigned Bed :
            {bed === null ? (
              <CircularProgress size={10} sx={{ ml: 2 }} />
            ) : (
              bed?.bedNo
            )}
          </StyledText>
        </Box>
        {bed?.bedNo === "No bed available" ||
        doctor?.name === "No doctors available" ? (
          <Box mt={4}></Box>
        ) : (
          <Box display={"flex"} justifyContent={"space-between"} mt={2}>
            <Button
              variant="outlined"
              sx={{
                mb: 2,
                fontWeight: "bold",
              }}
            >
              <Call sx={{ fontSize: "16px", mr: 2 }} />
              Call ambulance
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                mb: 2,
                fontWeight: "bold",
                boxShadow: 0,
              }}
              disabled={
                bed?.bedNo === "No bed available" ||
                doctor?.name === "No doctors available"
              }
              onClick={onClickContinue}
            >
              Cotinue
            </Button>
          </Box>
        )}
      </>
    );
  } else {
    return (
      <>
        <HeadingText text="Heart disease prediction" />
        <img src={warning} alt="" width={"185px"} />
        <div>
          <StyledText fontSize="24px">You are in a risky zone.</StyledText>
        </div>
        <Box my={1}>
          <StyledText fontSize="16px">
            Channel a doctor to make sure everything is going well.
          </StyledText>
        </Box>
        <Button
          variant="text"
          sx={{
            mb: 2,
            fontWeight: "bold",
          }}
          onClick={() =>
            navigate(
              "/patient-portal/channel-doctor/step-01?speciality=Cardiologist"
            )
          }
        >
          Channel Doctor
        </Button>
      </>
    );
  }
};

export default PositiveResult;

PositiveResult.propTypes = {
  urgentStatus: PropTypes.bool,
};

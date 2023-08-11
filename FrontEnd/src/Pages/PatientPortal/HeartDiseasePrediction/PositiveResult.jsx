import HeadingText from "../../../components/HeadingText/HeadingText";
import { Box, Button, CircularProgress, styled } from "@mui/material";
import warning from "../../../assets/images/warning.png";
import { Call } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import BedService from "../../../app/services/bed-service";
import DoctorService from "../../../app/services/doctor-service";
import { showSystemAlert } from "../../../app/services/alertServices";

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

const PositiveResult = ({ urgentStatus }) => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [bed, setBed] = useState(null);

  const allocateDoctor = useCallback(async () => {
    setDoctor(null);
    try {
      const responseBody = await DoctorService.autoAllocateDoctor({
        patientid: "64d48fb5abfd5cf9d50fafe1",
        bookingDate: new Date().toISOString().split("T")[0],
      });
      const { allocated_doc } = responseBody;
      setDoctor(allocated_doc);
    } catch (error) {
      setBed({ bedNo: "No doctors available" });
      showSystemAlert("No doctors available", "error");
      return;
    }
  }, []);

  const allocateBed = useCallback(async () => {
    try {
      setBed(null);
      const responseBody = await BedService.autoAllocateBed({
        patientid: "64d48fb5abfd5cf9d50fafe1",
        allocatedDate: new Date().toISOString().split("T")[0],
      });
      const { allocated_bed } = responseBody;
      setBed(allocated_bed);
    } catch (error) {
      setBed({ bedNo: "No bed available" });
      showSystemAlert("No bed available", "error");
      return;
    }
  }, []);

  useEffect(() => {
    if (urgentStatus) {
      allocateBed();
      allocateDoctor();
    }
  }, [urgentStatus, allocateBed, allocateDoctor]);

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
        {bed?.bedNo !== "No bed available" ||
        doctor?.name !== "No doctors available" ? null : (
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
            >
              Coninue
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
          onClick={() => navigate("/patient-portal/channel-doctor/step-01")}
        >
          Channel Doctor
        </Button>
      </>
    );
  }
};

export default PositiveResult;

import HeadingText from "../../../components/HeadingText/HeadingText";
import { Box, Button, CircularProgress, styled } from "@mui/material";
import warning from "../../../assets/images/warning.png";
import { Call } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import BedService from "../../../app/services/bed-service";

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
  const [doctorLoading, setDoctorLoading] = useState(null);
  const [bed, setBed] = useState(null);

  const allocateDoctor = useCallback(() => {}, []);
  const allocateBed = useCallback(async () => {
    setBed(null);
    const responseBody = await BedService.autoAllocateBed({
      patientId: "64d48fb5abfd5cf9d50fafe1",
      allocatedDate: new Date().toISOString().split("T")[0],
    });
    const { allocated_bed } = responseBody;
    setBed(allocated_bed);
  }, []);

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
            {doctorLoading === null ? (
              <CircularProgress size={10} sx={{ ml: 2 }} />
            ) : (
              ""
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
            <CircularProgress size={10} sx={{ ml: 2 }} />
          </StyledText>
        </Box>
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

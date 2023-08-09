import BlueAcentCard from "../../../components/BlueAcentCard/BlueAcentCard";
import HeadingText from "../../../components/HeadingText/HeadingText";
import Header from "../Header";
import Layout from "../Layout";
import done from "../../../assets/images/done.png";
import warning from "../../../assets/images/warning.png";
import { Box, Button, styled } from "@mui/material";
import { useState } from "react";

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
  const [result, setResult] = useState(true);

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
            onClick={() => setResult(!result)}
          >
            sw
          </Button>

          {result ? Success : Failed}
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default Result;

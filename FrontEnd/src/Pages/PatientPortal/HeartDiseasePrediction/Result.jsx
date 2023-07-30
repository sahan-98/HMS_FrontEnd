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
`,
  (props) => ({
    fontSize: props.fontSize,
  })
);

const Result = () => {
  const [result, setResult] = useState(true);

  const Negative = (
    <>
      <HeadingText text="Heart disease prediction" />
      <img src={done} alt="" width={"150px"} />
      <div>
        <StyledText fontSize="24px">Your results are negative.</StyledText>
      </div>
      <Box my={1}>
        <StyledText fontSize="16px">
          We are happy to see you healthy. You can channel doctor anytime
        </StyledText>
      </Box>
      <Button
        variant="text"
        sx={{
          mb: 2,
          fontWeight: "bold",
        }}
      >
        Channel Doctor
      </Button>
    </>
  );
  const Positive = (
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
      >
        Channel Doctor
      </Button>
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

          {result ? Negative : Positive}
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default Result;

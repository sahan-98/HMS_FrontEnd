import styled from "styled-components";
import BlueAcentCard from "../../../components/BlueAcentCard/BlueAcentCard";
import Header from "../Header";
import Layout from "../Layout";
import { Button, TextField } from "@mui/material";
import Progress from "./Progress";

const StyledParagraph = styled.p`
  font-size: 1.5rem;
  font-family: Hina Mincho;
  color: #636363;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Step01 = () => {
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
          <StyledParagraph>Heart disease prediction</StyledParagraph>

          <TextField label="Name" variant="outlined" fullWidth />
          <TextField label="Age" variant="outlined" fullWidth sx={{ mt: 2 }} />
          <TextField
            label="Gender"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />
          <Progress currentStep={1} />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 4,
            }}
          >
            Next
          </Button>
        </BlueAcentCard>
      </div>
    </Layout>
  );
};

export default Step01;

import { Box, IconButton, Typography } from "@mui/material";
import CustomModal from "../../components/CustomModal/CustomModal";
import proptypes from "prop-types";
import { Close } from "@mui/icons-material";

const DetailItem = ({ title, content }) => {
  return (
    <Box display={"flex"}>
      <Box width={190}>{title}</Box>
      <Typography>: </Typography>
      <Box pl={1}>{content}</Box>
    </Box>
  );
};

DetailItem.propTypes = {
  title: proptypes.string,
  content: proptypes.string,
};

const DetailsModal = ({ isOpen, setIsOpen, predictionData }) => {
  let predictionAccuracy = parseFloat(predictionData?.accuracy ?? 0)
    .toFixed(4)
    .toString();
  if (predictionAccuracy.length > 4) {
    predictionAccuracy = predictionAccuracy.substring(0, 4);
  }

  return (
    <CustomModal open={isOpen} sx={{ width: { xs: "90%", sm: 450, md: 800 } }}>
      <Box
        sx={{
          height: 450,
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          width={"100%"}
          alignItems={"center"}
        >
          <Box>
            <h3> Prediction Details </h3>
          </Box>

          <Box
            onClick={() => {
              setIsOpen(false);
            }}
            p={2}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Close />
          </Box>
        </Box>

        <Box>
          <DetailItem
            title="Report Date"
            content={predictionData?.createdAt?.split("T")[0]}
          />
          <DetailItem
            title="Prediction Result :"
            content={
              <span
                style={{
                  color:
                    predictionData.label === "true" ? "#E93232" : "#59C169",
                }}
              >
                {predictionData.label === "true"
                  ? `Positive ( accuracy: ${(
                      parseFloat(predictionData?.accuracy ?? 0) * 100
                    ).toFixed(2)} %)`
                  : `Negative( accuracy: ${(
                      parseFloat(predictionData?.accuracy ?? 0) * 100
                    ).toFixed(2)} %)`}
              </span>
            }
          />
          <DetailItem
            title="Age"
            content={predictionData?.detect_age + " yrs"}
          />
          <DetailItem title="Gender" content={predictionData?.detect_sex} />
          <DetailItem
            title="Chest Pain Type"
            content={predictionData?.detect_ChestPainType}
          />
          <DetailItem
            title="Cholestrol"
            content={predictionData?.detect_cholesterol + " mm/dl"}
          />
          <DetailItem
            title="Fasting Blood Sugar"
            content={predictionData?.detect_fastingBS}
          />
          <DetailItem
            title="Resting Blood Pressure"
            content={predictionData?.detect_resting_bp + " mm Hg"}
          />
          <DetailItem
            title="Resting ECG"
            content={predictionData?.detect_resting_ecg}
          />
          <DetailItem
            title="Max Heart Rate"
            content={predictionData?.detect_maxHR}
          />
          <DetailItem
            title="ST Slope"
            content={predictionData?.detect_sT_Slope}
          />
          <DetailItem
            title="Old Peak"
            content={predictionData?.detect_oldPeak}
          />
          <DetailItem
            title="Exercise Angina"
            content={predictionData?.detect_exerciseAngina}
          />
        </Box>
      </Box>
    </CustomModal>
  );
};

export default DetailsModal;

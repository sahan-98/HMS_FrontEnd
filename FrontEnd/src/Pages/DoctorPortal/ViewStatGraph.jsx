import { Box, IconButton } from "@mui/material";
import CustomModal from "../../components/CustomModal/CustomModal";
import proptypes from "prop-types";
import { Close } from "@mui/icons-material";

const ChartRow = ({ title, numericTitlePart, value, maxValue, minValue }) => {
  const BAR_HEIGHT = 15;

  if (value > maxValue) {
    value = maxValue;
  }
  if (value < minValue) {
    value = minValue;
  }

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: 150,
          height: BAR_HEIGHT,
          textAlign: "right",
          fontSize: 12,
          mr: 1,
        }}
      >
        {title} {numericTitlePart ?? ""}
      </Box>
      <Box
        sx={{
          width: 300,
          backgroundColor: "#E8F1F9",
          display: "flex",
          justifyContent: "end",
          p: 0.2,
        }}
      >
        {value < 0 && (
          <Box
            sx={{
              width: (value / minValue) * 300,
              backgroundColor: "#35729F",
              height: BAR_HEIGHT,
            }}
            title={`(${parseFloat(value).toFixed(4)}) ${title}`}
          ></Box>
        )}
      </Box>
      <Box
        sx={{
          width: 300,
          backgroundColor: "#E8F1F9",
          p: 0.2,
        }}
      >
        {value > 0 && (
          <Box
            sx={{
              width: (value / maxValue) * 300,
              backgroundColor: "#F7946B",
              height: BAR_HEIGHT,
            }}
            title={`(${parseFloat(value).toFixed(4)}) ${title}`}
          ></Box>
        )}
      </Box>
    </Box>
  );
};
ChartRow.proptypes = {
  title: proptypes.string,
};

const ViewStatGraph = ({ isOpen,setIsOpen, predictionData }) => {
  
  return (
    <CustomModal open={isOpen} sx={{ width: { xs: "90%", sm: 450, md: 800 } }}>
      <Box
        sx={{
          height: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        <Box display={"flex"} justifyContent={"space-between"} width={"100%"} alignItems={"center"}>
        <h1>Descriptive Explanation</h1>
        <Box onClick={()=>{setIsOpen(false)}} p={2} sx={{
            "&:hover":{
                cursor:"pointer"
            }
        }}>
            <Close />
        </Box>
        </Box>
       

        <Box>
          <ChartRow
            title={"ST_SLOPE"}
            value={predictionData.sT_Slope}
            minValue={-2}
            maxValue={2}
          />
          <ChartRow
            title={"ChestPainType "}
            value={predictionData.ChestPainType}
            minValue={-2}
            maxValue={2}
          />
          <ChartRow
            title={"Sex"}
            value={predictionData.sex}
            minValue={-2}
            maxValue={2}
          />
          <ChartRow
            title={"MaxHR"}
            value={predictionData.maxHR}
            minValue={-2}
            maxValue={2}
          />
          <ChartRow
            title={"Age & MaxHR"}
            value={predictionData.ageAndMaxHR}
            minValue={-2}
            maxValue={2}
          />
          <ChartRow
            title={"Excercise Angina"}
            value={predictionData.exerciseAngina}
            minValue={-2}
            maxValue={2}
          />
          <ChartRow
            title={"OldPeak"}
            value={predictionData.oldPeak}
            minValue={-2}
            maxValue={2}
          />
          <ChartRow
            title={"Cholesterol"}
            value={predictionData.cholesterol}
            minValue={-2}
            maxValue={2}
          />
          <ChartRow
            title={"Age"}
            value={predictionData.age}
            minValue={-2}
            maxValue={2}
          />
          <ChartRow
            title={"Oldpeak & ST_Slope"}
            value={predictionData.oldPeak}
            minValue={-2}
            maxValue={2}
          />
          <ChartRow
            title={"FastingBS"}
            numericTitlePart={"(0.00)"}
            value={predictionData.fastingBS}
            minValue={-2}
            maxValue={2}
          />
          <ChartRow
            title={"PastingECG & ST_Slope"}
            value={predictionData.restingECGAndSt_Slope}
            minValue={-2}
            maxValue={2}
          />
          <ChartRow
            title={"Age & Oldpeak"}
            value={predictionData.ageAndOldPeak}
            minValue={-2}
            maxValue={2}
          />
          <ChartRow
            title={"Age & ST_Slope"}
            value={predictionData.ageAndOldPeak}
            minValue={-2}
            maxValue={2}
          />
          <ChartRow
            title={"Cholesterol & OldPeak"}
            value={predictionData.cholesterolAndOldPeak}
            minValue={-2}
            maxValue={2}
          />
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                width: 150,
                textAlign: "right",
                fontSize: 12,
                mr: 1,
              }}
            ></Box>
            <Box
              sx={{
                width: 295,
                textAlign: "center",
              }}
            >
              -0.5
            </Box>
            0
            <Box
              sx={{
                width: 295,
                textAlign: "center",
              }}
            >
              0.5
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                width: 150,
                textAlign: "right",
                fontSize: 12,
                mr: 1,
              }}
            ></Box>
            <Box
              sx={{
                textAlign: "center",
                flexGrow: 1,
                mt: 1,
              }}
            >
              Contribution to Prediction
            </Box>
          </Box>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default ViewStatGraph;

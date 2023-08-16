import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import GenderPieChart from "./GenderPieChart/GenderPieChart";

const DetailsChart = ({
  doctors,
  patients,
  labReports,
  pendingLabReports,
  bedCount,
  setBedCount,
}) => {
  const data = [
    { name: "Doctor", Count: doctors, pv: 2400, amt: doctors },
    { name: "Patient", Count: patients, pv: 2400, amt: 2400 },
    { name: "Bed", Count: bedCount, pv: 2400, amt: 2400 },
    { name: "Lab reports", Count: labReports, pv: 2400, amt: 2400 },
  ];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        alignItems: "center",
        borderRadius: "0.5rem",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        marginTop: "2rem",
        paddingTop: "2rem",
        backgroundColor: "#fff",
      }}
    >
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
        <Legend
          width={100}
          wrapperStyle={{
            top: 40,
            right: 20,
            backgroundColor: "#f5f5f5",
            border: "1px solid #d5d5d5",
            borderRadius: 3,
            lineHeight: "40px",
          }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
        <Bar dataKey="Count" fill="#8884d8" barSize={30} />
      </BarChart>
      <GenderPieChart
        doctors={doctors}
        patients={patients}
        labReports={labReports}
        pendingLabReports={pendingLabReports}
        bedCount={bedCount}
      ></GenderPieChart>
    </div>
  );
};

export default DetailsChart;

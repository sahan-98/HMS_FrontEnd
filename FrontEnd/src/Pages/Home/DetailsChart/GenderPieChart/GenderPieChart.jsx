import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";

const GenderPieChart = ({
  doctors,
  patients,
  labReports,
  pendingLabReports,
  bedCount,
}) => {
  const genderData = [
    {
      name: "Doctors",
      value: doctors,
    },
    {
      name: "Patients",
      value: patients,
    },
    {
      name: "Beds",
      value: bedCount,
    },
    {
      name: "Lab reports",
      value: labReports,
    },
  ];
  return (
    <PieChart width={400} height={250}>
      <Tooltip />
      <Pie
        data={genderData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#003865"
        label
      />
    </PieChart>
  );
};

export default GenderPieChart;

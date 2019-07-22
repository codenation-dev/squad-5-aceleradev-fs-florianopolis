import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";
import { Grid } from "@material-ui/core";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const data2 = [
  {
    subject: "Math",
    A: 120,
    B: 110,
    fullMark: 150
  },
  {
    subject: "Chinese",
    A: 98,
    B: 130,
    fullMark: 150
  },
  {
    subject: "English",
    A: 86,
    B: 130,
    fullMark: 150
  },
  {
    subject: "Geography",
    A: 99,
    B: 100,
    fullMark: 150
  },
  {
    subject: "Physics",
    A: 85,
    B: 90,
    fullMark: 150
  },
  {
    subject: "History",
    A: 65,
    B: 85,
    fullMark: 150
  }
];

export default class Dashboard extends PureComponent {
  render() {
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item lg={3}>
            <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
              <PieChart>
                <Pie
                  data={data}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item lg={3}>
            <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
              <RadarChart data={data2}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar
                  name="Mike"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Lily"
                  dataKey="B"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </div>
    );
  }
}

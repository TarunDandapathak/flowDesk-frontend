import { useMemo } from "react";

import "./Barchart.css";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// //custom tooltips used for when hover the bar chart not display white background

// function CustomTooltip({active,payload,label}){
//   if (active && payload && payload.length){
//     return(
//       <div className="custom-tooltip">
//         <p> {label}</p>
//         <p> Completed :{payload[0].value}</p> 
//       </div>  

//     );
//   }
//   return null;
// }


function Barchart({ tasks = [] }) {

  const getCompletedTasks = (tasks) => {
    const now = new Date();

    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);

      last7Days.push({
        date: date.toDateString(),
        day:
          i === 0
            ? "Today"
            : date.toLocaleDateString("en-US", {
              weekday: "short"
            }),
        completed: 0
      });
    }

    tasks.forEach((task) => {
      const dueDate = new Date(task.dueDate);

      const isCompleted = task.status === "done";

      const isDue = now > dueDate;

      if (!isCompleted || !isDue) {
        return;
      }

      const taskDate = dueDate.toDateString();

      const day = last7Days.find(
        (item) => item.date === taskDate
      );

      if (day) {
        day.completed += 1;
      }
    });

    return last7Days.map(({ day, completed }) => ({
      day,
      completed
    }));
  };

  const completedTasks = getCompletedTasks(tasks);

  // console.log("getCompletedTasks", completedTasks);

  return (
    <div className="bar-chart">
      <h2 className="text-[#8080A0]!">Completed Tasks</h2>

      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart
          data={completedTasks}
          barCategoryGap="10px"
          margin={{
            top: 20,
            bottom: 0,
            left: -20,
            right: 10
          }}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
            domain={[0, "dataMax"]}
          />

          <Tooltip cursor={false} />

          <Bar
            dataKey="completed"
            fill="#6c4ce6"
            radius={[6, 6, 0, 0]}
            barSize={30}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Barchart;
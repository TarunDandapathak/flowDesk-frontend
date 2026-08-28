import "./DonutChart.css";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip
} from "recharts";

function DonutChart({ tasks }) {

    // const data = [
    //     { priority: "High", tasks: 10 },
    //     { priority: "Medium", tasks: 15 },
    //     { priority: "Low", tasks: 8 }
    // ];
    const getPriorityData = (tasks) => {
        const now = new Date();

        // 7 days ago
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 6);

        const priorityCount = {
            High: 0,
            Medium: 0,
            Low: 0
        };

        tasks.forEach(task => {
            const dueDate = new Date(task.dueDate);


            const isLast7Days =
                dueDate >= sevenDaysAgo && dueDate <= now;


            const isCompleted =
                task.status === "done";

            if (isLast7Days && isCompleted) {
                const priority = task.priority.toLowerCase();

                if (priority === "high") {
                    priorityCount.High++;
                }
                else if (priority === "medium") {
                    priorityCount.Medium++;
                }
                else if (priority === "low") {
                    priorityCount.Low++;
                }
            }
        });

        return [
            {
                priority: "High",
                tasks: priorityCount.High
            },
            {
                priority: "Medium",
                tasks: priorityCount.Medium
            },
            {
                priority: "Low",
                tasks: priorityCount.Low
            }
        ];
    };

    const data = getPriorityData(tasks);

    // console.log(data);
    const colors = [
        "#F87171",
        "#FBBF24",
        "#34D399"
    ];

    return (
        <div className="chart-donut">
            <h2 className="text-2xl! text-[#8080A0]!">Tasks by Priority</h2>

            <PieChart width={400} height={300}>

                <Pie
                    data={data}
                    dataKey="tasks"
                    nameKey="priority"
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={130}
                >

                    {data.map((item, index) => (
                        <Cell
                            key={item.priority}
                            fill={colors[index]}
                        />
                    ))}

                </Pie>

                <Tooltip />

            </PieChart>

            {/* Color Selection */}
            {/* <ul className="priority-list">
                <span className="">
                    <li className="li-tag">
                        <span className="high"></span>
                        High
                        <span className="m-auto">{data[0].tasks}</span>

                    </li>
                    <li >
                        {data[0].tasks}
                    </li>
                </span>
                <span className="">
                    <li className="li-tag">
                        <span className="medium"></span>
                        Medium
                    </li>
                    <li >
                        {data[1].tasks}
                    </li>
                </span>

                <span className="">
                    <li className="li-tag">
                        <span className="low"></span>
                        Low
                    </li>
                    <li >
                        {data[2].tasks}
                    </li>
                </span>
            </ul> */}
            <ul className="priority-list">
                {data.map((item, index) => (
                    <li key={item.priority} className="li-tag">
                        <div className="left-content">
                            <span
                                className="dot"
                                style={{ backgroundColor: colors[index] }}
                            ></span>
                            <span className="label">{item.priority}</span>
                        </div>
                        <span className="count">{item.tasks}</span>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default DonutChart;
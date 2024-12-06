import DashboardCard from "@/components/DashboardCard";
import QuickViewTable from "@/components/QuickViewTable";
import { Task } from "@/types/Task";
import React from "react";
const Dashboard: React.FC = () => {

  const [highPriorityTasks, setHighPriorityTasks] = React.useState([]);
  const [allTaskCount, setAllTaskCount] = React.useState(0);
  const [completedTasks, setCompletedTasks] = React.useState(0);

  React.useEffect(() => {

    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {

      let tasks = JSON.parse(storedTasks);

      // get tasks count
      setAllTaskCount(tasks.length)

      setHighPriorityTasks(tasks);

      const completedTasks = tasks.filter((task: Task) => task.status === 'completed');

      setCompletedTasks(completedTasks.length)
    }

  }, [])


  return (
    <>
      <div className="flex gap-5 flex-wrap">
        {/* Dashboard Cards */}
        <DashboardCard
          cardTitle={'Total Task(s)'}
          cardContentCount={allTaskCount}
          cardDetailsPath={'/tasks'}
          cardBg="from-gray-500 to-gray-600"
        />
        <DashboardCard
          cardTitle={'High Priority Task(s)'}
          cardContentCount={highPriorityTasks.length}
          cardDetailsPath={'/tasks'}
          cardBg="from-red-400 to-red-500"
        />
        <DashboardCard
          cardTitle={'Completed Task(s)'}
          cardContentCount={completedTasks}
          cardDetailsPath={'/tasks'}
          cardBg="from-green-400 to-green-500"
        />

      </div>
      <div className="mt-20 w-full">
        <QuickViewTable
          tasks={highPriorityTasks}
        />
      </div>
    </>
  )
}

export default Dashboard;
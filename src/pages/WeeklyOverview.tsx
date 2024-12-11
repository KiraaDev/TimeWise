import React, { useState, useEffect } from "react";
import { Task } from "@/types/Task";
import { formatTime } from "@/utils/formatTime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const WeeklyOverview: React.FC = () => {

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            const parsedTasks = JSON.parse(storedTasks);
            setTasks(parsedTasks);
        }
    }, []);

    const getStartOfWeek = (date: Date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        return startOfWeek;
    };

    function convertTimeToMilliseconds(time: number, unit: 'M' | 'H'): number {
        const msInMinute = 60000;
        const msInHour = 3600000;

        if (unit === 'M') {
            return time * msInMinute;
        } else if (unit === 'H') {

            return time * msInHour;
        }
        return 0;
    }

    const calculateWeeklyOverview = (tasks: Task[]) => {
        const currentDate = new Date();
        const startOfWeek = getStartOfWeek(currentDate);

        let totalEstimatedTime = 0;
        let totalTimeSpent = 0;

        tasks.forEach((task) => {
            if (task.date) {
                const taskDate = new Date(task.date);

                if (taskDate >= startOfWeek && taskDate <= currentDate) {

                    const convertedEstimatedTime = convertTimeToMilliseconds(parseInt(task.estimatedTime), task.timeUnit);

                    totalEstimatedTime += convertedEstimatedTime;
                    totalTimeSpent += task.timeSpent;
                }
            }
        });

        return { totalEstimatedTime, totalTimeSpent };
    };

    const { totalEstimatedTime, totalTimeSpent } = calculateWeeklyOverview(tasks);

    const currentDate = new Date();

    const formattedDate = currentDate.toDateString();

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full mb-10">
                <h1 className=" font-bold text-2xl">Weekly Overview</h1>
                <h2 className="font-semibold">Week of {formattedDate}</h2>
            </div>
            <div className="mt-4 flex gap-3 justify-center items-center w-full">
                <Card className=" w-96 flex justify-center items-center flex-col">
                    <CardHeader>
                        <CardTitle>Total Estimated Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{formatTime(totalEstimatedTime)}</p>
                    </CardContent>
                </Card>
                <Card className=" w-96 flex justify-center items-center flex-col">
                    <CardHeader>
                        <CardTitle>Total Actual Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{formatTime(totalTimeSpent)}</p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default WeeklyOverview;
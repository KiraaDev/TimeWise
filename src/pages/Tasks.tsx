import { Input } from '../components/ui/input'
import { Button } from "../components/ui/button";
import React from "react";
import AllTaskTable from '@/components/AllTasksTable';
import NewTaskCard from '@/components/NewTaskCard'
import { Task } from '@/types/Task';

const Tasks: React.FC = () => {

    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {

        const storedTasks = localStorage.getItem("tasks");

        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }

    }, [localStorage.getItem("tasks")])



    const addNewTask = (newTask: Task) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div className=' flex justify-between w-full'>
                <div>
                    <Button onClick={openModal} className='h-10 px-10'>Add new task</Button>
                    {
                        isOpen && <NewTaskCard closeModal={closeModal} addNewTask={addNewTask} />
                    }
                </div>
                <div>
                    <Input type='text' placeholder='Search here...' className='h-10 px-10' />
                </div>
            </div>
            {/* all tasks table */}
            < div className="mt-20 w-full" >
                <AllTaskTable
                    tasks={tasks}
                />
            </div >
        </>
    )
}

export default Tasks;
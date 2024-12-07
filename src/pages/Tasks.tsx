import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import AllTaskTable from '@/components/AllTasksTable';
import NewTaskCard from '@/components/NewTaskCard'
import { Task } from '@/types/Task';
import { Select } from "@/components/ui/select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

const Tasks: React.FC = () => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<(Task & { originalIndex: number })[]>([]);
    const [filterPriority, setFilterPriority] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const [searchInput, setSearchInput] = useState<string>('');

    const { toast } = useToast();

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            const parsedTasks = JSON.parse(storedTasks);
            setTasks(parsedTasks);
            setFilteredTasks(parsedTasks.map((task: Task, index: number) => ({ ...task, originalIndex: index })));
        }
    }, []);

    const saveTaskToLocalStorage = (tasks: Task[]) => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInput(value);

        if (value === '') {
            setFilteredTasks(
                tasks.map((task, index) => ({ ...task, originalIndex: index }))
            );
        } else {
            const filtered = tasks
                .map((task, index) => ({ ...task, originalIndex: index }))
                .filter((task) =>
                    task.title.toLowerCase().includes(value.toLowerCase())
                );
            setFilteredTasks(filtered);
        }
    };

    const handleFilterPriority = (value: string) => {
        setFilterPriority(value);

        if (value === 'all') {
            setFilteredTasks(tasks.map((task, index) => ({ ...task, originalIndex: index })));
        } else {
            const filteredPriority = tasks
                .map((task, index) => ({ ...task, originalIndex: index }))
                .filter((task) => task.priority === value);
            setFilteredTasks(filteredPriority);
        }
    };

    // (add, update, and delete) functions

    const addNewTask = (newTask: Task) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks.map((task, index) => ({ ...task, originalIndex: index })));
        saveTaskToLocalStorage(updatedTasks);

        toast({
            description: 'Successfully added a new task.',
            className: 'bg-green-300',
        });
    };

    // add task with conflict 
    const addNewTaskWithConflict = (newTask: Task) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks.map((task, index) => ({ ...task, originalIndex: index })));
        saveTaskToLocalStorage(updatedTasks);

        toast({
            description: 'Successfully added a new task but moved 1 hour for started time due to conflict.',
            className: 'bg-yellow-300',
        });
    };

    const deleteTask = (originalIndex: number) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(originalIndex, 1);

        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks.map((task, index) => ({ ...task, originalIndex: index })));
        saveTaskToLocalStorage(updatedTasks);

        toast({
            description: 'Successfully deleted a task.',
            variant: 'destructive',
        });
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
                        isOpen && <NewTaskCard closeModal={closeModal} addNewTask={addNewTask} addNewTaskWithConflict={addNewTaskWithConflict} />
                    }
                </div>
                <div>
                    <Input
                        value={searchInput}
                        onChange={handleSearch}
                        type='text' placeholder='Search here...' className='h-10 px-10' />
                </div>
            </div>
            < div className="mt-10 w-full" >
                <div className=" w-40 mb-2">
                    <Select
                        value={filterPriority}
                        onValueChange={handleFilterPriority}
                        defaultValue='all'
                    >
                        <SelectTrigger id="priority">
                            <SelectValue placeholder='Select Priority' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='all'>All</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* all tasks table */}
                <AllTaskTable
                    tasks={filteredTasks}
                    deleteTask={(originalIndex) => deleteTask(originalIndex)}
                />
            </div >

        </>
    )
}

export default Tasks;
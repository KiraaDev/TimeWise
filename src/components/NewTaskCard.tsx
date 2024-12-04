import React, { useEffect, useState } from "react";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { Task } from "@/types/Task";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";

interface NewTaskCardProps {
    closeModal: () => void;
    addNewTask: (task: Task) => void
}

const NewTaskCard: React.FC<NewTaskCardProps> = ({ closeModal, addNewTask }) => {

    const dateNow: Date = new Date()

    dateNow.setDate(dateNow.getDate() - 1);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
    const [estimatedTime, setEstimatedTime] = useState('');
    const [timeUnit, setTimeUnit] = useState<"M" | "H" | "D">("M");
    
    const [date, setDate] = useState<Date>()

    const [hour, setHour] = useState<string>('')
    const [anteMeridiem, setAnteMeridiem] = useState<string>('')


    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        // create new task by passing all states 
        const newTask = {
            title,
            body,
            priority,
            status: 'not-started',
            estimatedTime,
            timeUnit,
            date,
        };
        // calling the addNewTask function
        addNewTask(newTask)
        //closing modal
        closeModal()
    }
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-scroll">
            <Card className="w-[40rem] absolute z-20 ">
                <CardHeader className="flex justify-between flex-row">
                    <div>
                        <CardTitle>Create New Task</CardTitle>
                        <CardDescription>Fill in the details for your new task</CardDescription>
                    </div>
                    <div>
                        <Button onClick={closeModal} variant={"destructive"}>X</Button>
                    </div>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter task title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="body">Body</Label>
                            <Textarea
                                id="body"
                                placeholder="Enter task description"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select

                                value={priority}
                                onValueChange={(value) => setPriority(value as "low" | "medium" | "high")}
                                required>
                                <SelectTrigger id="priority">
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2 ">
                            <Label htmlFor="estimatedTime">Date</Label>
                            <div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={'outline'}>
                                            {!date ? "Pick a date" : date.toLocaleDateString()}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            disabled={(date) =>
                                                date < dateNow
                                            }
                                            required
                                        />
                                    </PopoverContent>
                                </Popover>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={'outline'}>
                                            { hour == '' && anteMeridiem == '' ? "Hour" :  `${hour} ${anteMeridiem}`}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className=" flex gap-5">
                                        <Select
                                        value={hour}
                                        onValueChange={(val) => setHour(val)}
                                        required
                                        >
                                            <SelectTrigger>
                                                {hour == "" ? 'Choose' : hour}
                                                </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="12">12</SelectItem>
                                                <SelectItem value="11">11</SelectItem>
                                                <SelectItem value="10">10</SelectItem>
                                                <SelectItem value="9">9</SelectItem>
                                                <SelectItem value="8">8</SelectItem>
                                                <SelectItem value="7">7</SelectItem>
                                                <SelectItem value="6">6</SelectItem>
                                                <SelectItem value="5">5</SelectItem>
                                                <SelectItem value="4">4</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="1">1</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Select
                                        value={anteMeridiem}
                                        onValueChange={(value) => setAnteMeridiem(value)}
                                        required
                                        >
                                            <SelectTrigger>
                                            {anteMeridiem == "" ? 'Ante Meridiem' : anteMeridiem}
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="AM">AM</SelectItem>
                                                <SelectItem value="PM">PM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </PopoverContent>
                                </Popover>

                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="estimatedTime">Estimated Time</Label>
                            <Select
                                value={timeUnit}
                                onValueChange={(value) => setTimeUnit(value as "M" | "H" | "D")}
                            >
                                <SelectTrigger id="time">
                                    <SelectValue placeholder="Select Time " />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="M">Minute(s)</SelectItem>
                                    <SelectItem value="H">Hour(s)</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                id="estimatedTime"
                                type="number"
                                placeholder="Enter estimated time"
                                value={estimatedTime}
                                onChange={(e) => setEstimatedTime(e.target.value)}
                                min="1"
                                step="1"
                                required
                            />
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Create Task</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default NewTaskCard;
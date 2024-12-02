import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table"
import { Task } from "@/types/Task"
import { getBadge } from "@/utils/getBadge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button";

interface AllTasksTableProps {
    tasks: Task[];
    deleteTask: (index: number) => void;
}

const AllTaskTable: React.FC<AllTasksTableProps> = ({ tasks, deleteTask }) => {

    return (
        <>
            <Table className="w-full">
                <TableCaption>All Tasks</TableCaption>
                <TableHeader className=" bg-slate-100">
                    <TableRow className="border-[1px]">
                        <TableHead className="border-[1px] text-gray-700">Title</TableHead>
                        <TableHead className="border-[1px] text-gray-700">Body</TableHead>
                        <TableHead className="border-[1px] text-gray-700  text-center">Priority</TableHead>
                        <TableHead className="border-[1px] text-gray-700 text-center">Status</TableHead>
                        <TableHead className="border-[1px] text-gray-700">Estimated Time</TableHead>
                        <TableHead className="border-[1px] text-gray-700">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.length === 0 ?
                        <TableRow>
                            <TableCell className="" colSpan={5}>No Tasks Found</TableCell>
                        </TableRow>
                        : tasks.map((task, index) => (
                            <TableRow key={index} className="h-20">
                                <TableCell className="font-semibold border-[1px]">{task.title}</TableCell>
                                <TableCell className="border-[1px]">{task.body}</TableCell>
                                <TableCell className="border-[1px] w-14">{getBadge(task.priority)}</TableCell>
                                <TableCell className="border-[1px] text-center">{task.status}</TableCell>
                                <TableCell className="border-[1px] font-semibold text-center">{task.estimatedTime}{task.timeUnit.toLocaleLowerCase()}</TableCell>
                                <TableCell className="border-[1px]">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className=' text-center w-full font-extrabold text-2xl'>⋮</DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>
                                                <Button variant={'default'} className="w-full">View Task</Button>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Button className=" w-full bg-yellow-500 hover:bg-yellow-700">EDIT</Button>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Button 
                                                onClick={() => deleteTask(index)}
                                                variant={'destructive'} className=" w-full">DELETE</Button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    )
}

export default AllTaskTable;
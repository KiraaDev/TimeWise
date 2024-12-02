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
import { Button } from "./ui/button";
    
const QuickViewTable: React.FC<{ tasks: Task[] }> = ({ tasks }) => {

    return (
        <>
            <Table className="w-full">
                <TableCaption>Task Quick View [High Priority]</TableCaption>
                <TableCaption>
                    <a href="/tasks" className="underline">Add new</a>
                </TableCaption>
                <TableHeader className=" bg-slate-100">
                    <TableRow className="border-[1px]">
                        <TableHead className="border-[1px] text-gray-700">Title</TableHead>
                        <TableHead className="border-[1px] text-gray-700">Body</TableHead>
                        <TableHead className="border-[1px] text-gray-700 text-center">Priority</TableHead>
                        <TableHead className="border-[1px] text-gray-700 text-center">Status</TableHead>
                        <TableHead className="border-[1px] text-gray-700">Estimated Time</TableHead>
                        <TableHead className="border-[1px] text-gray-700">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        tasks.length === 0 ? 
                        <TableRow>
                            <TableCell className="" colSpan={5}>No High Priority Tasks</TableCell>
                        </TableRow>
                        : 
                        tasks.map((task, index) => (
                        <TableRow key={index} className="h-20">
                            <TableCell className="font-semibold border-[1px]">{task.title}</TableCell>
                            <TableCell className="border-[1px]">{task.body}</TableCell>
                            <TableCell className="border-[1px] w-14">{getBadge(task.priority)}</TableCell>
                            <TableCell className="border-[1px] text-center">{task.status}</TableCell>
                            <TableCell className="border-[1px] font-semibold text-center">{task.estimatedTime}{task.timeUnit.toLocaleLowerCase()}</TableCell>
                            <TableCell className="border-[1px]">
                                <Button variant={'default'} className="w-full">View Task</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </>
    )
}

export default QuickViewTable;
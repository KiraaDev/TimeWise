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

    const filteredTasks = tasks
        .map((task, index) => ({ index, task }))
        .filter((taskObj) => taskObj.task.priority === 'high');

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
                        <TableHead className="border-[1px] text-gray-700 text-center w-32">Status</TableHead>
                        <TableHead className="border-[1px] text-gray-700 w-32">Estimated Time</TableHead>
                        <TableHead className="border-[1px] text-gray-700 w-40">Day | Date</TableHead>
                        <TableHead className="border-[1px] text-gray-700 w-20">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        tasks.length === 0 ? 
                        <TableRow>
                            <TableCell className="" colSpan={5}>No High Priority Tasks</TableCell>
                        </TableRow>
                        : 
                        filteredTasks.map((task) => (
                        <TableRow key={task.index} className="h-20">
                            <TableCell className="font-semibold border-[1px]">{task.task.title}</TableCell>
                            <TableCell className="border-[1px]">{task.task.body}</TableCell>
                            <TableCell className="border-[1px] w-14">{getBadge(task.task.priority)}</TableCell>
                            <TableCell className="border-[1px] text-center">{task.task.status}</TableCell>
                            <TableCell className="border-[1px] font-semibold text-center">{task.task.estimatedTime}{task.task.timeUnit.toLocaleLowerCase()}</TableCell>
                            <TableCell className="border-[1px] text-center">{task.task.date ? new Date(task.task.date).toDateString() : 'No Date'}</TableCell>       
                            <TableCell className="border-[1px]">
                                <Button variant={'default'} className="w-full">
                                <a href={`/task/${task.index}`}>View Task</a>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </>
    )
}

export default QuickViewTable;
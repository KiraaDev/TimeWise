import { Badge } from "../components/ui/badge"

export const getBadge = (priority: String) => {
    if (priority === 'high') {
        return (
            <Badge className=" flex justify-center items-center" variant='destructive'>
                {priority}
            </Badge>
        )
    } else if(priority === 'medium') {
        return (
            <Badge className=" flex justify-center items-center"  variant='secondary'>
                {priority}
            </Badge>
        )
    } else {
        return (
            <Badge className=" flex justify-center items-center"  variant='default'>
                {priority}
            </Badge>
        )
    }
}
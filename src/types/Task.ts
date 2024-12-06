export interface Task {
    title: string;
    body: string;
    priority: 'low' | 'medium' | 'high';
    status: string;
    estimatedTime: string; 
    timeUnit: 'M' | 'H' | 'D';
    timeSpent: number;
    date?: Date
}

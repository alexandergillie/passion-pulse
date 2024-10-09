type Passion = {
    id: number;
    title: string;
    color: string;
    tasks: Task[];
    expanded: boolean;
}

type Task = string;
export type Task = {
	text: string;
	done: boolean;
};

export type Todo = {
	heading: string;
	tasks: Task[];
};

export type Filters = 'all' | 'active' | 'completed';

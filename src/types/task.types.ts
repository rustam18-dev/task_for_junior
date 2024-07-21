import {CalendarDate} from "@internationalized/date";

export interface ITaskResponse {
	id: string
	name: string
	from: string | CalendarDate
	to: string | CalendarDate
	description?: string
	priority?: string
	status?: string
}

export interface TaskViewProps {
	onOpen: () => void;
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id'>>

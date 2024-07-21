import type { ITaskResponse, TypeTaskFormState } from '../types/task.types'

import { api } from '../api/interceptors'

class TaskService {
	private BASE_URL = '/tasks'

	async getTasks(start: number, limit: number = 20) {
		return await api.get<ITaskResponse[]>(`${this.BASE_URL}?_start=${start}&_limit=${limit}`)
	}

	async createTask(data: TypeTaskFormState) {
		return await api.post(this.BASE_URL, data)
	}
}

export const taskService = new TaskService()

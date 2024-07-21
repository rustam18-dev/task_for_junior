import {useEffect, useState} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import {taskService} from '../services/task.service.ts'
import {ITaskResponse} from '../types/task.types.ts'

export function useFetchTasks() {
  const queryClient = useQueryClient()
  const [tasks, setTasks] = useState<ITaskResponse[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [start, setStart] = useState<number>(0)
  const [moreTask, setMoreTask] = useState<boolean>(true)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true)
        const response = await queryClient.fetchQuery({
          queryKey: ['tasks', start],
          queryFn: () => taskService.getTasks(start),
        })

        if (response.data.length === 0) {
          setMoreTask(false)
        } else {
          setTasks((prevTasks) => {
            const newTasks = response.data || []
            const uniqueTasks = newTasks.filter(task => !prevTasks.some(existingTask => existingTask.id === task.id))
            return [...prevTasks, ...uniqueTasks]
          })
        }
      } catch (error) {
        console.error("Ошибка при загрузке задач", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (moreTask) {
      fetchTasks()
    }
  }, [queryClient, start, moreTask])


  return {
    tasks,
    isLoading,
    moreTask,
    setStart,
    setMoreTask,
  }
}

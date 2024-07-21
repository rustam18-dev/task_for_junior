import { ChangeEvent, FormEvent, useState } from 'react'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { priorities, statuses } from '../data.ts'
import { TypeTaskFormState } from '../types/task.types.ts'
import { taskService } from '../services/task.service.ts'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateTask(onOpenChange: () => void) {

  const [newTask, setNewTask] = useState<TypeTaskFormState>({
    name: '',
    from: today(getLocalTimeZone()),
    to: today(getLocalTimeZone()).add({ days: 1 }),
    description: '',
    priority: priorities[0]?.label,
    status: statuses[0]?.label,
  })

  const queryClient = useQueryClient()

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setNewTask(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDateChange = (name: 'from' | 'to' | 'priority' | 'status', value: string | CalendarDate) => {
    if (name === 'from' && value && newTask.to && value > newTask.to) {
      return toast('Дата "Начало" не может быть позже даты "Конец".')
    } else if (name === 'to' && value && newTask.from && value < newTask.from) {
      return toast('Дата "Конец" не может быть раньше даты "Начало".')
    } else {
      console.log(value)
      setNewTask(prev => ({ ...prev, [name]: value }))
    }
  }

  const validateForm = () => {
    const { name, from, to, priority, status } = newTask

    if (!name?.trim()) return toast("Название не может быть пустым.")
    if (priority?.length === 0) return toast("Приоритет не выбран.")
    if (status?.length === 0) return toast("Статус не выбран.")
    if (from?.day > to?.day && from?.month > to?.month) return toast('Дата "Начало" не может быть позже даты "Конец".')

    return null
  }

  const mutation = useMutation({
    mutationKey: ['createTask'],
    mutationFn: (data: TypeTaskFormState) => taskService.createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast('Успешно!')
      onOpenChange()
      setNewTask({
        name: '',
        from: today(getLocalTimeZone()),
        to: today(getLocalTimeZone()).add({ days: 1 }),
        description: '',
        priority: priorities[0]?.value,
        status: statuses[0]?.value,
      })
    },
    onError: (error) => {
      console.error('Ошибка при создании задачи', error)
      toast('Ошибка!')
    }
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formError = validateForm()

    if (formError === null) return

    const from = `${newTask.from?.day}.${newTask.from?.month}.${newTask.from?.year}`
    const to = `${newTask.to?.day}.${newTask.to?.month}.${newTask.to?.year}`

    const body: TypeTaskFormState = {
      ...newTask,
      from,
      to,
    }

    console.log(body)

    mutation.mutate(body)
  }

  return {
    newTask,
    isPending: mutation.isLoading,
    handleOnChange,
    handleDateChange,
    handleSubmit,
    setNewTask
  }
}

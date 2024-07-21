// @ts-nocheck

import {Autocomplete, AutocompleteItem, Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea} from "@nextui-org/react"
import {getLocalTimeZone, today} from "@internationalized/date"
import {priorities, statuses} from "../../data.ts"
import {useCreateTask} from "../../hooks/useCreateTask.ts"

interface CreateTaskModalProps {
  isOpen: boolean
  onOpenChange: () => void
}

export function CreateTaskModal({ isOpen, onOpenChange }: CreateTaskModalProps) {
  const {
    newTask,
    isPending,
    handleOnChange,
    handleDateChange,
    handleSubmit,
  } = useCreateTask(onOpenChange)

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">Новая задача</ModalHeader>
              <ModalBody className="flex flex-col gap-4">
                <Input
                  type="text"
                  label="Название"
                  size='sm'
                  name='name'
                  onChange={handleOnChange}
                  value={newTask.name}
                  required
                />
                <div className="w-full max-w-xl ">
                  <div className='flex flex-row gap-4'>
                    <div className="w-full flex flex-col gap-1">
                      <DatePicker
                        label="Начало"
                        size='sm'
                        name='from'
                        value={newTask?.from}
                        onChange={(value) => handleDateChange('from', value)}
                        minValue={today(getLocalTimeZone())}
                        defaultValue={today(getLocalTimeZone())}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                      <DatePicker
                        label="Конец"
                        size='sm'
                        name='to'
                        value={newTask?.to}
                        onChange={(value) => handleDateChange('to', value)}
                        minValue={today(getLocalTimeZone())}
                        defaultValue={today(getLocalTimeZone()).add({days: 1})}
                      />
                    </div>
                  </div>
                </div>
                <Autocomplete
                  size='sm'
                  defaultItems={priorities}
                  label="Приоритетность"
                  placeholder="Выберите приоритетность"
                  name='priority'
                  defaultInputValue={priorities[2]?.label}
                  required
                  onInputChange={(value) => handleDateChange('priority', value)}
                >
                  {(item) => <AutocompleteItem key={item.label}>{item.label}</AutocompleteItem>}
                </Autocomplete>
                <Autocomplete
                  size='sm'
                  defaultItems={statuses}
                  label="Статус"
                  placeholder="Выберите статус"
                  name='status'
                  defaultInputValue={statuses[2]?.label}
                  required
                  onInputChange={(value) => handleDateChange('status', value)}
                >
                  {(item) => <AutocompleteItem key={item.label}>{item.label}</AutocompleteItem>}
                </Autocomplete>
                <Textarea
                  label="Описание"
                  placeholder="Напишите описание к задаче..."
                  name='description'
                  value={newTask.description}
                  onChange={handleOnChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Закрыть
                </Button>
                <Button type="submit" color="primary" isLoading={isPending}>
                  Добавить
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

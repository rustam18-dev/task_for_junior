import { Badge, Button, Chip, Divider, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { ClipboardList } from 'lucide-react'
import { useRef } from 'react'
import { columns, priorityColorMap, statusColorMap } from '../../data'
import { ITaskResponse, TaskViewProps } from '../../types/task.types'
import { useFetchTasks } from '../../hooks/useFetchTasks.ts'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'

function renderCell(task: ITaskResponse, columnKey: string) {
  const cellValue: string | undefined  = task[columnKey as keyof ITaskResponse]
  
  switch (columnKey) {
    case 'priority':
      return (
        <Chip className="capitalize" color={priorityColorMap[task.priority]} size="sm" variant="flat">
          {cellValue}
        </Chip>
      )
    case 'status':
      return (
        <Chip className="capitalize" color={statusColorMap[task.status]} size="sm" variant="flat">
          {cellValue}
        </Chip>
      )
    default:
      return cellValue
  }
}

export function TaskView({ onOpen }: TaskViewProps) {
  const tableRef = useRef<HTMLDivElement>(null)
  const { tasks, isLoading, moreTask, setStart } = useFetchTasks()

  useInfiniteScroll(tableRef, isLoading, moreTask, setStart)

  return (
    <div className='flex flex-col gap-2 mt-2 px-2'>
      <div className='w-full flex justify-between items-center mb-2'>
        <div className='ms-4'>
          <Badge color="danger" content={tasks.length} size="lg" shape="circle">
            <ClipboardList size={30}/>
          </Badge>
        </div>
        <Button onPress={onOpen} color="primary">Создать</Button>
      </div>
      <Divider/>
      <div style={{ maxHeight: '480px', overflowY: 'auto' }} ref={tableRef}>
        <Table
          color='primary'
          selectionMode="single"
          isStriped
          aria-label='Example table with static content'
          isHeaderSticky
          classNames={{
            base: "min-w-full",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={tasks}
            isLoading={isLoading}
            loadingContent={<Spinner label="Loading..."/>}
          >
            {tasks.map((task, index) => (
              <TableRow key={task.id}>
                {columns.map((column) => (
                  <TableCell key={column.uid}>
                    {column.uid === 'id' ? index + 1 : renderCell(task, column.uid)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

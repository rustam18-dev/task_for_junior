type PriorityColor = "primary" | "warning" | "danger";
type StatusColor = "success" | "primary" | "warning";
type PriorityColorMap = Record<string, PriorityColor>;
type StatusColorMap = Record<string, StatusColor>;

export interface Column {
  name: string
  uid: string
}

const columns: Column[] = [
  {name: "№", uid: "id"},
  {name: "Название", uid: "name"},
  {name: "От", uid: "from"},
  {name: "До", uid: "to"},
  {name: "Приоритет", uid: "priority"},
  {name: "Статус", uid: "status"},
  {name: "Описание", uid: "description"},
];

const priorityColorMap: PriorityColorMap = {
  "Низкий": "primary",
  "Средний": "warning",
  "Высокий": "danger",
};

const statusColorMap: StatusColorMap = {
  "Выполнено": "success",
  "В процессе": "primary",
  "Ожидает": "warning",
};

const priorities = [
  {label: "Высокий", value: "high"},
  {label: "Средний", value: "medium"},
  {label: "Низкий", value: "low"},
];

const statuses = [
  {label: "Выполнено", value: "completed"},
  {label: "В процессе", value: "inProgress"},
  {label: "Ожидает", value: "pending"},
];



export {columns, priorities, statuses, priorityColorMap, statusColorMap};

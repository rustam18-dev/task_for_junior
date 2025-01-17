# Infinity Loader

> Описание проекта

Мини-проект на React напримере создание задач. Имеет таблицу, которая загружает данные из сервера используя infinity loader. Форма добавление реализован с помощью модального окна.

### Сначала запустите сервер разработки:

1. Команда для запуска приложении и сервера:
   ```sh
   npm run dev
   ```

## Структура проекта
<img src="https://github.com/rustam18-dev/task_for_junior/blob/main/src/assets/directories.png" alt="directories" height="500">

- **CreateTaskModal.tsx** - Этот компонент React предоставляет модальное окно для создания новой задачи, включая ввод названия, даты начала и окончания, приоритетности, статуса и описания задачи.
- **TaskView.tsx** - отображает список задач в виде таблицы с поддержкой бесконечной прокрутки, позволяя пользователю просматривать и фильтровать задачи по приоритету и статусу, а также добавлять новые задачи через модальное окно.
- **useCreateTask.ts** - Хук React для управления созданием задач с валидацией и отправкой данных.
- **useFetchTasks.ts** - Хук React для загрузки задач с поддержкой бесконечной прокрутки и управления состоянием.
- **useInfiniteScroll.ts** - Хук React для реализации прокрутки с динамической подгрузкой данных.
- **task.service.ts** - Сервис для работы с задачами, включающий методы для получения и создания задач.
- **task.types.ts** - Интерфейсы для описания задачи, свойств компонента представления задач и состояния формы задачи.

## Стейт-менеджер

Решил что использование стейт-менеджера в данном проекте быдет излишним, хотя в одном моменте оно бы пригодилось, а именно при обновлении таблицы после создании новой задачи, да, можно было бы и прокинуть колбэк-функциями между несколькими компонентами, а можно было и установить стейт-менеджер, но я сделал это с помощью tanstack-query, которая по ключу позволяет отправлять запросы в любой точке проекта, что позволяет обновить данные таблицу.

## Стек технологий
- **React**
- **TypeScript**
- **json-server**
- **NextUi** - красивые компоненты
- **tanstack**-query - для запросов
- **sonner** - для уведомлений (toast)
- **lucide** - для иконок
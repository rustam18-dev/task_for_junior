import {useDisclosure,} from "@nextui-org/react";
import {CreateTaskModal} from "./components/modal/CreateTaskModal.tsx";
import {TaskView} from "./components/task-view/TaskView.tsx";
import {Toaster} from "sonner";

export default function App() {
  const {isOpen, onOpenChange} = useDisclosure();

  const handleDataFromChild = () => {
    onOpenChange()
  };
  return (
    <>
      <TaskView onOpen={handleDataFromChild}/>
      <CreateTaskModal isOpen={isOpen} onOpenChange={onOpenChange}/>
      <Toaster
        theme='dark'
        position='bottom-right'
        duration={1500}
      />
    </>
  );
}

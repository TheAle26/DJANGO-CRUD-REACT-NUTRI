import { useEffect, useState } from "react";
import { getTasks } from "../api/task.api";
import { TaskCard} from "../components/TaskCard"

type Task = {
  id: number;
  title: string;
  description: string;
  done?: boolean;
};

export function TaskPages() {


  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    async function loadTasks() {
      const resp = await getTasks();
      console.log(resp)
      setTasks(resp.data);
    }

    loadTasks();
  }, []);

  return <div>
      {tasks.map(task => (

        <div>
          <TaskCard key={task.id} task={task}/>
        </div>
      ))}
    </div>
  
}
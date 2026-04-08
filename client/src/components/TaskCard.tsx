import { useNavigate} from 'react-router-dom'

type TaskCardProps = {
  task: {
    id: number;
    title: string;
    description: string;
    done?: boolean;
  };
};

export function TaskCard({ task }: TaskCardProps) {

  const navigate = useNavigate()

  return (
    <div style={{background: "black "}}
      onClick={() => { navigate(`/tasks/${task.id}`)} }
    >
      <h1> {task.title} </h1>
      <p>{task.description}</p>
      <hr / >
    </div>
    
  );
}

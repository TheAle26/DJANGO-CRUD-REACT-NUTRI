import { useForm } from 'react-hook-form'
import { createTasks , deleteTask, updateTask, getTask } from '../api/task.api';
import type { TaskPayload } from '../api/task.api';
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from 'react'
export function TaskFormPage() {
    const { register, handleSubmit ,setValue, formState: {errors}} = useForm<TaskPayload>();
    const navigate = useNavigate();
    const params = useParams()   ;
    const onSubmit = handleSubmit(async data => { 
    
        if (params.id){
            await updateTask(params.id, data)
        }
        else{
            await createTasks(data);

        }
        
        navigate('/tasks')
    })

    useEffect(() => {
        async function loadTasks() {
            if (params.id){
                const res = await getTask(params.id);
                setValue('title', res.data.title);
                setValue('description',res.data.description)
            } 
        }
        loadTasks();
    },[])
    return (
    <div>  
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="title" {...register("title", { required: true})} />

            {errors.title && <span> Este campo es requerido</span>}

            <textarea rows={3} placeholder="description" {...register("description", { required: true})} />
            
            {errors.description && <span> Este campo es requerido</span>}
            
            <button> Save </button>

        </form>
        

        {params.id && <button onClick={async () => {
            const accepted = window.confirm("are yousure?")
            if (accepted) {
                await deleteTask(params.id!);
                navigate("/tasks");
            }
        }}
            
            > deleteee </button>}
    </div>
    )
     
}
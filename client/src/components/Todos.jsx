import React from 'react';
import toast from 'react-hot-toast';
import { CircleUserRound, Plus } from 'lucide-react';
import useSWR from 'swr';
import { Input } from './ui/input';
import TickIcon from './icons/TickIcon';
import EditIcon from './icons/EditIcon';
import DeleteIcon from './icons/DeleteIcon';
import EditTodo from './EditTodo';
import Profile from './Profile';

const fetcher = (url, options = {}) =>
  fetch(url, {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: "cors",
    body: options.body ? JSON.stringify(options.body) : undefined,
  }).then((res) => res.json()); // Call res.json() to parse the response

  const Todos = () => {
    const { data, error, mutate, isLoading } = useSWR("http://localhost:3000/api/todos", fetcher);
  
    if (error) {
      return <h1 className='text-2xl py-2 text-center'>Something went wrong!</h1>;
    }
    if (isLoading) {
      return <h1 className='text-2xl py-2 text-center'>Loading...</h1>;
    }
  
    function handleError(error) {
      toast.error(error);
      throw new Error(error);
    }
  
    async function handleAddTodo(e) {
      e.preventDefault(); // Call preventDefault as a function
      const formData = new FormData(e.target);
      const title = formData.get("title");
  
      if (!title.trim().length) {
        toast.error("Todo can't be empty");
        return;
      }
  
      const newTodo = {
        title: `${title} adding....`,
        _id: Date.now().toString(), // Use Date.now().toString()
        isCompleted: false,
      };
  
      async function addTodo() {
        const response = await fetcher("http://localhost:3000/api/todos", {
          method: "POST",
          body: { title },
        });
  
        if (response.error) {
          handleError(response.error);
        }
        return response; // Return the response from the backend
      }
  
      await mutate(addTodo, {
        optimisticData: [...data, newTodo], // Optimistically update the UI
        revalidate: true, // Revalidate the data after the mutation
        rollbackOnError: true, // Rollback on error
      });
  
      e.target.reset(); // Reset the form after submission
    }
    async function deleteTodo(id) {
      toast.success("Todo deleted!")
      await mutate(async() => {
        const response = await fetcher(`http://localhost:3000/api/todos/${id}`,{
          method:'DELETE',
        })
        if(response.error){
          handleError(response.error)
        }
        return data.filter((todo)=>todo._id !== id)
      },
      {
        optimisticData:data.filter((todo)=>todo._id !== id),
        rollbackOnError:true,
        revalidate:false,

      }
    )
    }
    async function handleComplete(id,isCompleted) {
      await mutate(async() =>{
        const response = await fetcher(`http://localhost:3000/api/todos/${id}`,{
          method:"PUT",
          body:{isCompleted : !isCompleted}
        })
        if(response.error){
          handleError(response.error)
        }
        return data.map((todo) => {
          if(todo._id === id){
            return {...todo,isCompleted: !isCompleted}
          }
          return todo;
        });
      },
      {
        optimisticData : data.map((todo) => {
          if(todo._id === id){
            return {...todo,isCompleted: !isCompleted}
          }
          return todo;
        }),
        rollbackOnError:true,
        revalidate:false,
      })
    }
    async function handleUpdate(formData){
      const title=formData.get('title')
      const id=formData.get("id");
      console.log({title,id});
      await mutate(async() => {
        const response = await fetcher(`http://localhost:3000/api/todos/${id}`,{
          method:"PUT",
          body:{title}
        })
        if(response.error){
          handleError(response.error)
        }
        return data.map((todo) => {
          if(todo._id === id){
            return {...todo,title}
          }
          return todo;
        });
      },
      {
        optimisticData : data.map((todo) => {
          if(todo._id === id){
            return {...todo,title}
          }
          return todo;
        }),
        rollbackOnError:true,
        revalidate:false,
      }
    )
      
    }
  
    return (
      <div className='mx-auto mt-20 max-w-lg px-4 w-full flex flex-col gap-6'>
        <div className='flex justify-end'>
        <Profile/>
        </div>
        
        <h1 className='bg-gradient-to-r from-indigo-500 via-purple-500 to bg-pink-500 font-bold
        text-4xl text-center mb-4 text-transparent bg-clip-text'>SK Todo App</h1>
        <form onSubmit={handleAddTodo} className='flex gap-4 items-center'>
          <Input
            type="text"
            placeholder="Enter todo name"
            name="title"
            id="title"
            required
            className="shadow-md"
          />
          <button
            type="submit"
            className='h-9 rounded-md border border-input bg-transparent px-4 text-base shadow-md flex
            items-center hover:bg-primary transition ease-linear group'
          >
            <Plus size={20} className='transition ease-linear group-hover:stroke-white' />
          </button>
        </form>
        {
          data?.length ? (
            <div className='shadow-md border-2 border-input bg-transparent flex flex-col rounded'>
              {data.map((todo, index) => (
                <div
                  key={index}
                  className={`flex h-10 items-center w-full ${index === data.length - 1 ? "border-b-0" : "border-b-2"}`}
                >
                  <span className={`flex-1 px-3 ${todo.isCompleted && 'line-through text-[#63657b]'}`}>{todo.title}</span>
                  {/* Icons Container */}
                  <div className='flex gap-4 items-center ml-auto px-3'>
                    <TickIcon onClick={()=>handleComplete(todo._id, todo.isCompleted)}/>
                    <DeleteIcon  onClick={() => deleteTodo(todo._id)}/>
                    <EditTodo handleUpdate={handleUpdate} id={todo._id} title={todo.title} />
                  </div>
                </div>
              ))}
            </div>
          ) : <span>You don't have any todos</span>
        }
      </div>
    );
  };
  
  
  

export default Todos;
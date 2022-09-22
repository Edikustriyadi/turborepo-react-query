import { NextPage } from "next";
import { fetchBlogs, createBlogs, IBlog } from 'ui';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { ChangeEvent, FormEvent, useState } from "react";

const initialState:IBlog = {
  id:0,
  title:'',
  body:''
}
const Teachers:NextPage = () => {

  const queryClient = new QueryClient();

  const [formBlog, setFormBlog] = useState(initialState);

  const {data, isLoading, isError, isFetching}  = useQuery('blogs', fetchBlogs,{
    staleTime: 5000,
    refetchInterval: 5000,
  });

  

  const mutationBlog = useMutation('blogs', createBlogs, {
    onMutate: async (variables) => {
     // Cancel current queries for the todos list
     await queryClient.cancelQueries('blogs')
 
     // Create optimistic todo
     const optimisticBlog = queryClient.getQueryData<IBlog[]>('blogs')
    
     if(optimisticBlog){
      queryClient.setQueryData('todos', (old:any) => [...old, optimisticBlog])
     }
     return { optimisticBlog }
   },

   onSuccess: (result, variables, context:any) => {
     console.log(result)
   },
   onSettled:async() => {
    if (data) {
      await queryClient.invalidateQueries("blogs");
    }
   },
   onError: async (error: any, _variables, context: any) => {
      // mutation done with error response
      // console.log("onError");
     console.log(error)
      if (context?.previousMessages) {
        queryClient.setQueryData<IBlog[]>(
          "blogs",
          context.previousMessages
        );
      }
    },
  });
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setFormBlog({ 
        ...formBlog,
        id: Math.floor(Math.random() * 1000) + 1,
        [name]:value
    })
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutationBlog.mutate(formBlog);
    if(mutationBlog.isSuccess){
      mutationBlog.reset();
    }
  }

  if(isLoading){
    return <div>Loading....</div>
  }
  if(isError){
    return <div>Error</div>
  }
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border w-1/2 shadow-sm p-4">
        <h1 className=" text-2xl font-bold text-right">Page Teachers</h1>
        <h1 className=" text-2xl font-bold">Blogs</h1>
        <ul className="py-5">
          {
            data.map((blog:IBlog, idx:number) => {
              return (
                <li key={idx} className="text-blue-700 hover:text-blue-500 cursor-pointer"><span>{idx+1}</span>. {blog.title}</li>
              )
            })
          }
        </ul>
        <p>{isFetching ? 'Fetching blog....':null}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input name="title" onChange={(e => handleChange(e))} type="text" placeholder="Title" className="input input-bordered w-full max-w-xs" />
            
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Body</span>
            </label> 
            <textarea name="body" onChange={(e => handleChange(e))} className="textarea textarea-bordered h-24" placeholder="Body"></textarea>
           
          </div>
          <button type="submit" className="btn btn-active btn-primary mt-4">
            
            Submit
          </button>
        </form>
      </div>
    </div>
  ); 
}
export default Teachers;
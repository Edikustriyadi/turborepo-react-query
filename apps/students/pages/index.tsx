import { NextPage } from "next";
import { Button } from "ui";
import { fetchBlogs } from 'ui';
import { useQuery } from 'react-query';
interface Blogs {
  id: number,
  title: string,
  body:string
}
const Students:NextPage = () => {
  const {data, isLoading, isError, isFetching}  = useQuery('blogs', fetchBlogs,{
   staleTime: 5000,
  refetchInterval: 5000,
  })
  if(isLoading){
    return <div>Loading...</div>
  }
  if(isError){
    return <div>Error</div>
  }
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border w-1/2 shadow-sm p-4">
        <h1 className=" text-2xl font-bold text-right">Page Students</h1>
        <h1 className=" text-2xl font-bold">Blogs</h1>
        <ul className="py-5">
          {
            data.map((blog:Blogs, idx:number) => {
              return (
                <li key={idx} className="text-blue-700 hover:text-blue-500 cursor-pointer"><span>{idx+1}</span>. {blog.title}</li>
              )
            })
          }
        </ul>
      </div>
    </div>
  ); 
}
export default Students;
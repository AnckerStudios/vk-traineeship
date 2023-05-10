import { useEffect } from "react";
import { IPost } from "../model/Post";
import { IUser } from "../model/User";

interface PostProps{
  post: IPost

}
const Post = ({post}:PostProps) => {
  useEffect(() => {
    console.log(post);
    
  }, [])
  
  return (
    <div className=" w-full border rounded-2xl p-3 flex flex-col gap-3">
      <div className="h-12 flex gap-4 items-center">
        <img
          src={post.user?.photo || "no-avatar.png"}
          className="h-12 rounded-full object-cover w-12 border"
        />
        <div className="flex flex-col">
          <p className=" text-sm text-blue-800 font-bold">{post.user?.firstname} {post.user?.lastname}</p>
          <p className=" text-sm">15 ноя 2020</p>
        </div>
      </div>
      <div>
        <p className=" text-sm">
          {post.text}
        </p>
      </div>
      {post?.photo &&  <img
          src={'http://localhost:8080/api/image/'+post.photo}
          className=" rounded-xl"
        />}
      {/* <img src="https://sun9-1.userapi.com/impf/c854024/v854024169/121b2a/2HCQ9dAU1l0.jpg?size=1200x1600&quality=96&sign=59a417626f0c8207d24e76f5be19115a&c_uniq_tag=k0nqoMdQChnPIts58tK2ZagWD4Vqh0FmZTsnGd0bBYA&type=album" className=" rounded-xl" /> */}
      <div>
        <button className="h-8 rounded-full bg-slate-200 w-fit p-2 flex gap-1 items-center px-3 hover:">
          <span className="material-symbols-rounded text-red-500">favorite</span>
          <p className=" text-sm font-semibold">{post.like || 0}</p>
        </button>
      </div>
    </div>
  );
};

export default Post;

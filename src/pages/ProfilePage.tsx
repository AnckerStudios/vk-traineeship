import { useEffect, useState } from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";
import { IUser } from "../model/User";
import { IPost } from "../model/Post";
import Post from "../components/Post";

// export async function loader({ params }:any) {
//     const user;
//     axios.get(`/api/user/${params.userId}`)
//         .then(res=>{

//         })
//     return { user };
//   }

export async function loader({ params }: any) {
  console.log("jjj", params);
  let user;
  return { user };
}
const ProfilePage = () => {
  const [user, setUser] = useState<IUser>();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File>();
  let { userId } = useParams();
  useEffect(() => {
    axios
      .get(`/api/user/findByUsername/${userId}`)
      .then((res) => {
        console.log("res", res.data);

        setUser(res.data);
        console.log("user", user);
      })
      .catch((err) => console.log(err));

    axios
      .get(`/api/post/myPosts`)
      .then((res) => {
        console.log("res", res.data);

        setPosts(res.data);
        console.log("user", user);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmitPost = () => {
    let formData = new FormData();
    formData.append("post", text);
    formData.append('image', new Blob([JSON.stringify(file)]), file?.name)
    axios
      .post(`/api/post`,formData)
      .then((res) => {
        console.log("res", res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" w-full flex justify-between items-center flex-col gap-4 ">
      <div className=" mt-2 w-full border rounded-2xl p-3 h-fit flex items-end">
        <img
          src={user?.photo || "no-avatar.png"}
          className=" border rounded-full h-48"
        />
        <div>
          <div className=" font-bold text-xl">
            {user?.firstname} {user?.lastname}
          </div>
        </div>
      </div>
      <div className=" mt-2 w-full border rounded-2xl p-3 flex flex-col gap-2">
        <div className="flex w-full justify-between gap-2">
          <img
            src={user?.photo || "no-avatar.png"}
            className=" border rounded-full h-12"
          />
          <textarea
            className="w-full"
            required
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        {file && (
             <div>
             <img
               alt="not found"
               width={"250px"}
               src={URL.createObjectURL(file)}
             />
             <br />
             <button onClick={() => setFile(undefined)}>Remove</button>
           </div>
        )}
        <div className="flex justify-between items-center">
          <span className="material-symbols-rounded">attach_file_add</span>
          <input
            type="file"
            onChange={(event) => {
              if (event.target.files) {
                console.log(event.target.files[0]);
                setFile(event.target.files[0]);
              }
            }}
          />
          <button
            onClick={onSubmitPost}
            className=" text-sm p-2 bg-blue-400 text-white px-3 rounded-md"
          >
            Опубликовать
          </button>
        </div>
      </div>

      {posts && posts.map((item) => {
        return <Post post={item}/>;
      })}
    </div>
  );
};

export default ProfilePage;

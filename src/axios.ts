import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080"
});

instance.interceptors.request.use((config) => {
  let t = localStorage.getItem("user");
  if(t){
    config.headers.Authorization = "Bearer " + t;
  }else{
    config.headers.Authorization = "" ;
    
  }
  
  // let user = null;
  // if (t) {
  //   user = JSON.parse(t);
  //   config.headers.Authorization = "Bearer " + t;
  // }

  // console.log(user);

  return config;
});


export default instance;

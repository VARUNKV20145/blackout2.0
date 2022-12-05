import './index.css'
import {useForm} from "react-hook-form";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
function Login() {
    const [message,setMessage]=useState("")
    const navigate= useNavigate();
    const {register, handleSubmit} = useForm();
    const onSubmit = async data => {
        const res = await axios.get('https://oyster-app-cmvre.ondigitalocean.app/users/login', {
            auth: {
                username: data.username,
                password: data.password
            }
        });
        if(res.status===200)
        { localStorage.setItem('username', data.username);
            localStorage.setItem('password', data.password);

             navigate('/home', {replace: true});
            setMessage("Logged in sucessfully");
        }
        else if(res.status===401){
            setMessage("User not found");

        }
        else{
            console.log("Error occured")
        }


    }
  return (

      <div className="container h-screen w-screen lg:max-w-[100vw] selection:text-pink-600 bg-purple-600 flex flex-col  items-center">
          <div className="relative  top-2.5">
              <div class="gli font-medium font-Rubik text-[#ff0130] text-5xl">BLACKOUT</div>
          </div>
          <div className="flex flex-col gap-12 relative top-[10%]" >
              <h1 className="font-VT323 text-[40px] font-bold tracking-wide text-[#ff013c]">Login to continue</h1>
          <form class="flex gap-5 flex-col justify-center items-center  h-full w-full" onSubmit={handleSubmit(onSubmit)}>

          <div  className="w-full h-full">
            <input class="w-full h-[65px] border-b-[#F9EB05] tracking-wide border-l-[#f9eb054d] border-t-[#f9eb054d] border-r-[#F9EB05] border-b-4 border-r-4 font-VT323 text-2xl text-center text-[#00e6f6] bg-[#ffee0a26] outline-none" type="text" autoFocus='True' placeholder="Username"
                   {...register("username")} required />
          </div>
            <div className="w-full h-full ">
                <input class="w-full h-[65px] border-b-[#F9EB05] tracking-wide  border-l-[#f9eb054d] border-t-[#f9eb054d] border-r-[#F9EB05] border-b-4 border-r-4 font-VT323 text-2xl text-center text-[#00e6f6] bg-[#ffee0a26] outline-none" type="password" autoFocus='True'
                       placeholder="Password" {...register("password")}
                       required/>
            </div>




        <div className=" w-full h-full border-r-4 border-r-[#00e6f6]">

          <button className="submit font-VT323 text-2xl text-white font-light  w-full h-[65px] tracking-widest "  type="submit">SUBMIT</button>
        </div>

        <p>{message}</p>
      </form>
          </div>
      </div>

  );
}

export default Login;

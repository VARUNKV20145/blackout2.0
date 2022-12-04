
import {useEffect, useState} from "react";
import { useNavigate,useParams } from 'react-router-dom';
import { CopyToClipboard } from "react-copy-to-clipboard";


function  Question () {
    const [copy,setCopy]=useState(false);
    let { id } = useParams();


const[redirect,setRedirect]=useState(true);
const [show,setShow]=useState(true)
const [img,setImg]=useState("")
    const [isLoading, setLoading] = useState(true);
    const [tem,setTem]=useState({})

    const [message, setMessage] = useState('');
    const [wrong, setWrong] = useState('');

    const navigate= useNavigate();


    const handleChange = event => {
        setMessage(event.target.value);
    };




    useEffect( ()=> {



        const fetchData = async() => {
            const options = {method: 'GET', headers: {Authorization: 'Basic '+btoa(localStorage.getItem('username')+':'+localStorage.getItem('password'))}};


            const t=await fetch('https://oyster-app-cmvre.ondigitalocean.app/questions/fetch?level=1&qid='+id, options)
                .then(async response => {
                    if (response.ok) {
                        return await response.json()
                    }
                    throw response;
                })
                .then(tem => {
                    setTem(tem);
                    setImg(tem.image_url)
                    if(id==="fhqclqvcxh"){
                        setCopy(true);
                    }
                    else{
                        setCopy(false);
                    }



                    setTimeout(() => {

                        setLoading(false);



                    }, 1500);


                })
                .catch(error => {
                    console.log("Error fetching questions")
                })
        }
        fetchData().then(r=>{
            
        })

        

    },[]);
    

    const Anssubmit = async () => {
        if (message === '') {
            setWrong("please type something")
        } else {

            const options = {method: 'GET',headers: {Authorization: 'Basic '+btoa(localStorage.getItem('username')+':'+localStorage.getItem('password'))}};

            const res = await fetch('https://oyster-app-cmvre.ondigitalocean.app/questions/validate?level=1&qid='+tem.q_id+'&answer='+message, options)


            if (res.status === 200) {
setRedirect(false);


                setWrong("Correct answer");


                setTimeout(() => {
                    setShow(false)
                    setImg(tem.return_img);
                    setWrong("Challenge completed");




                }, 1000);


            } else if(res.status===202) {
                setMessage('')
                setWrong("Wrong answer");
            }

        }

    }

    const anscheck = async () => {

        const options = {method: 'GET',headers: {Authorization: 'Basic '+btoa(localStorage.getItem('username')+':'+localStorage.getItem('password'))}};
        const r = await fetch('https://oyster-app-cmvre.ondigitalocean.app/questions/check?level=1&qid='+id, options)

        if(r.status===200){
    

            navigate('/home', {replace: true});



        }
        else {
            
            console.log("");
        }




    }

    useEffect(()=>{
        const interval=setInterval(() =>{
            if(redirect==true) {
                anscheck()
            }
            else{
                console.log("")
            }
        },10000);
    return ()=>clearInterval(interval);
    },[anscheck])



    if(isLoading){
        return (
            <div className="container flex flex-col  h-screen w-screen items-center justify-center ">
                <div className="container">

                    <div className="wrap-top">

                        <div  className="loading loading--center loading--glitch loading--animation relative text-[#eb0005] font-Rubik text-5xl"
                             data-title="Loading...">
                            Loading...
                        </div>


                    </div>
                </div>





            </div>

        );
    }
    return (
        <div className=" container m-0 flex flex-col  min-h-screen w-full items-center justify-center ">


                <div className="gli lg:relative lg:top-10 flex flex-col items-center my-5 lg:my-10  font-medium font-Rubik text-[#ff0130] text-5xl " data-text="BLACKOUT">BLACKOUT</div>



            {show? <p className="flex flex-col items-center font-Rubik  text-[#ff0130] text-2xl ">{tem.question}</p>:<p></p>}
              <div className=" flex flex-col h-full w-full items-center gap-5 ">
                {show&&copy&&<CopyToClipboard id="copy" value="Caution" text={"QSBzcGlkZXIgaXMgdHJ5aW5nIHRvIGJ1aWxkIGEgd2ViIGZvciBpdHNlbGYuIEl0IGRvdWJsZXMgdGhlIHdvcmsgZG9uZSBldmVyeSBkYXkuIElmIHRoZSBzcGlkZXIgY29tcGxldGVseSBidWlsdCB0aGUgd2ViIGluIDUwIGRheXMsIGhvdyBtYW55IGRheXMgZGlkIGl0IHRha2UgZm9yIHRoZSBzcGlkZXIgdG8gYnVpbGQgMjUlIG9mIHRoZSB3ZWI/"} onCopy={() => window.alert("Copied to Clipboard")}>

                    <p className="copy">Don't Touch</p>
                </CopyToClipboard>}
                <div className="flex flex-col h-1/2 w-full items-center justify-center">

                    <img alt="img" src={img} className="flex flex-col  max-h-56 w-full"/>
                </div>

                <div className="flex flex-col   w-[80%] lg:w-1/4 justify-center">
                    {show&&
                    <input className="h-full w-full xl: w-full p-6 border-b-[#F9EB05] tracking-wide border-l-[#f9eb054d] border-t-[#f9eb054d] border-r-[#F9EB05] border-b-4 border-r-4 font-VT323 text-2xl text-center text-[#00e6f6] bg-[#ffee0a26] outline-none" type="text" placeholder="Type your answer" autoFocus='True' value={message} onChange={handleChange}
                           required/>}
                </div>

            <div className="flex flex-col w-[80%] lg:w-1/4 ">
                {show&&
                <button className="submit font-VT323 text-2xl text-white font-light  w-full h-[65px] tracking-widest  " onClick={Anssubmit}>SUBMIT</button>}
            </div>
            <p className="flex flex-col items-center font-Rubik  text-[#ff0130] text-2xl">{wrong}</p>

              </div>

        </div>

    );
}

export default Question;

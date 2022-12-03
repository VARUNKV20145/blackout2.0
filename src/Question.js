
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
    const [count, setCount] = useState(0);
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
            <div className="con">
                <div className="container">

                    <div className="wrap-top">

                        <div  className="loading loading--center loading--glitch loading--animation"
                             data-title="Loading...">
                            Loading...
                        </div>

                        <div id="author-source" className="clearfix">

                        </div>
                    </div>
                </div>

                <div className="wrap-mid">


                </div>
                <p>{wrong}</p>



            </div>

        );
    }
    return (
        <div className="container">
            <div className="Head">
                <div className="gli" data-text="BLACKOUT">BLACKOUT</div>


            </div>
            {show? <p>{tem.question}</p>:<p></p>}
              <div className="wrap-top">
                {show&&copy&&<CopyToClipboard id="copy" value="Caution" text={"QSBzcGlkZXIgaXMgdHJ5aW5nIHRvIGJ1aWxkIGEgd2ViIGZvciBpdHNlbGYuIEl0IGRvdWJsZXMgdGhlIHdvcmsgZG9uZSBldmVyeSBkYXkuIElmIHRoZSBzcGlkZXIgY29tcGxldGVseSBidWlsdCB0aGUgd2ViIGluIDUwIGRheXMsIGhvdyBtYW55IGRheXMgZGlkIGl0IHRha2UgZm9yIHRoZSBzcGlkZXIgdG8gYnVpbGQgMjUlIG9mIHRoZSB3ZWI/"} onCopy={() => window.alert("Copied to Clipboard")}>

                    <p className="copy">Don't Touch</p>
                </CopyToClipboard>}
                <div id="quote">

                    <img alt="img" src={img}/>
                </div>

                <div id="author-source" className="clearfix">
                    {show&&
                    <input className="Answerfield" type="text" placeholder="Type your answer" autoFocus='True' value={message} onChange={handleChange}
                           required/>}
                </div>
            </div>

            <div className="wrap-mid">
                {show&&
                <button id="submit" onClick={Anssubmit}>SUBMIT</button>}
            </div>
            <p id="error">{wrong}</p>


        </div>

    );
}

export default Question;

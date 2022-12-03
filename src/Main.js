
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';


 function  Main () {

     let { id } = useParams();

     console.log("newid",id);

     const[limit,setLimit]=useState(6);
     const [index,setIndex]=useState(0);
     const [isLoading, setLoading] = useState(true);
     const [tem,setTem]=useState({})

     const [message, setMessage] = useState('');
     const [wrong, setWrong] = useState('');
     const [currentQuestion, setCurrentQuestion] = useState(0);

     const handleChange = event => {
         setMessage(event.target.value);
     };








             const fetchData = async() => {
                 const options = {method: 'GET', headers: {Authorization: 'Basic '+btoa(localStorage.getItem('username')+':'+localStorage.getItem('password'))}};


                const t=await fetch('https://oyster-app-cmvre.ondigitalocean.app/questions?level=1', options)
                     .then(async response => {
                         if (response.ok) {
                             return await response.json()
                         }
                         throw response;
                     })
                     .then(tem => {
                         setTem(tem);
                         window.data=tem;
                         console.log(window.data)



                         setLoading(false);
                     })
                     .catch(error => {
                         console.log("Error fetching questions")
                     })
             }

             fetchData();



    const Anssubmit = async () => {
        if (message === '') {
            setWrong("please type something")
        } else {
            const options = {method: 'GET',headers: {Authorization: 'Basic '+btoa(localStorage.getItem('username')+':'+localStorage.getItem('password'))}};

            const res = await fetch('https://oyster-app-cmvre.ondigitalocean.app/questions/validate?level=1&qid='+tem.questions[currentQuestion].q_id+'&answer='+message, options)


            if (res.status === 200) {
                console.log(res.status)


                setWrong("Correct answer");

                setTimeout(() => {
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
         const r = await fetch('https://oyster-app-cmvre.ondigitalocean.app/questions/check?level=1&qid='+window.data.questions[currentQuestion].q_id, options)

         if(r.status===200){

             console.log(limit);

             if(index<limit-1) {
                     setMessage('')
                     setWrong(" ")
const nextquestion=currentQuestion+1;

                     setCurrentQuestion(nextquestion);
                     console.log(index)
                     console.log(window.data.questions[nextquestion].q_id);
             }


         }
         else {
             console.log(r.status)
             console.log("not resolved");
         }




     }
     useEffect(() => {
var idx=0;
         const interval = setInterval( () => {
             //setIndex(index => index + 1);
             idx=idx+1;
             setIndex(idx);
             console.log("new")
             console.log(idx)
             console.log("index="+index)
             anscheck();
         }, 1000);

         return () => clearInterval(interval);
     }, []);

     if(isLoading){
    return (
        <div className="con">
          <div className="container">

            <div className="wrap-top">

                <div id="quote">

                    <p>Loading Questions</p>
                </div>

                <div id="author-source" className="clearfix">
                    <input className="Answerfield" type="text" autoFocus='True' value={message} onChange={handleChange}
                           required/>
                    <button className="anssubmit" onClick={Anssubmit}>submit</button>
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
             <p>{tem.questions[currentQuestion].question}</p>
             <div className="wrap-top">

                 <div id="quote">

                     <img alt="img" src={tem.questions[currentQuestion].image_url}/>
                 </div>
                 <div id="author-source" className="clearfix">
                     <input className="Answerfield" type="text" autoFocus='True' value={message} onChange={handleChange}
                            required/>
                 </div>
             </div>

             <div className="wrap-mid">

                 <button id="submit" onClick={Anssubmit}>SUBMIT</button>
             </div>
             <p>{wrong}</p>


         </div>

     );
 }

export default Main;

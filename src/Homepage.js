
import { useEffect, useState} from "react";
function Homepage() {

    const [tem, setTem] = useState()
    const [loading,setLoading]=useState(false)





        const fetchData = async () => {
            const options = {
                method: 'GET',
                headers: {Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'))}
            };


            await fetch('https://oyster-app-cmvre.ondigitalocean.app/questions?level=1', options)
                .then(async response =>response.json()
                )
                .then((data) => {
                    setTem(data);




                })






            setTimeout(() => {
                setLoading(true);


            }, 2000);
             }
        useEffect(()=>{
            fetchData();
        }, [fetchData])




if(!loading){
    return (
        <div className="front-wrap">
            <h1 className="front-heading">BLACKOUT</h1>
            <div className="grid-container">
                <div id="aidiv" className="loading loading--center loading--typing loading--animation">An AI has gone Rogue</div>
                <div id="loaddiv" className="loading loading--center loading--glitch loading--animation" data-title="Loading...">
                    Loading...
                </div>

            </div>
        </div>

    );


}


    return (
        <div className="container overflow-scroll flex h-screen w-screen selection:text-pink-600 overflow-scroll bg-purple-600 flex flex-col gap-10 justify-center items-center">
        <h1 className="gli font-medium font-Rubik text-[#ff0130] text-5xl">BLACKOUT</h1>
        <div className=" flex flex-col h-3/4 gap-y-4 w-full   sm:grid grid-cols-2 gap-x-20  h-full w-3/4  justify-items-stretch ">
            { tem && tem.questions.length > 0 ?
tem.questions.map((item)=>

            <a href={"/home/"+item.q_id } className="flex  flex-col  bg-[#00000033] justify-center  items-center  border-2 border-[#eb0005]">
                <h2 className="flex justify-center justify-items-center font-Rubik w-full text-xl sm:font-Rubik font-lighter text-2xl text-[#eb0005] ">
                    {item.question}
                </h2>
            </a>
            ) : <p id="quesload">DANGER: High Voltage!!!</p>}

        </div>
            </div>

    );
}

export default Homepage;




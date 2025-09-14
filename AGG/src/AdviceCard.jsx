import { useEffect, useState } from "react";
import dice from "../src/assets/icon-dice.svg"
import line from "../src/assets/pattern-divider-desktop.svg"

const AdviceCard = () => {
    const [advice, setadvice] = useState();
    const [loading, setloading] = useState(false);
    const [idd, setid] = useState(null);


    const FetchAdvice = () => {
        setloading(true);
        fetch("https://api.adviceslip.com/advice")
            .then((res) => res.json())
            .then((data) => 
                {setadvice(data.slip.advice);
                    setid(data.slip.id);
                }
                
                )
            .catch(()=>setadvice("error,try again :("))
            .finally(() => setloading(false));

    };
    useEffect(() => {
        FetchAdvice();
    }, [])
    return (
        <div className="bg-gray-400 text-white p-8 rounded-xl shadow-lg text-center relative max-w-md w-full mx-auto">
            <p className="text-pink-800 text-sm tracking-wider mt-1 mb-1">
                {idd ? `Advice #${idd}` : "Advice Generator"}
            </p>
            <p className="text-2xl mb-3 md:text-3xl italic">
                {loading ? "loading..." : `"${advice}"`}
            </p>
            <img src= {line}className="mx-auto mt-6 mb-7 "></img>
            <button
                className=" active:scale-90 hover:cursor-pointer bg-pink-800 p-4 rounded-full shadow-lg  hover:shadow-[0_0_40px_15px_pink]"
                onClick={FetchAdvice}
            >
                <img src={dice} alt="dice to roll"></img>
            </button>

        </div>
    );
}

export default AdviceCard;
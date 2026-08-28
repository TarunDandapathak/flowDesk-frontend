import "./PageNotFound.css";

import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <div className="flex-col justify-center items-center pageNotFound ">
            <div className="error absolute top-[50px]"> ERROR </div>
            <div className="num-div text-[#6C757D]!" >
                <span className="text-[10rem]">4</span><span className="text-[#8A2BE2] text-[15rem]">0</span><span className="text-[10rem]">4</span>
            </div>

            <div className="para1 text-5xl"> The page is outside of the universe </div>

            <div className="para2  text-[#6C757D]!"> The page you are trying to access doesn't  exist or has been movied .</div>
            <div className="para3  text-[#6C757D]! "> Try going back to our homepage .</div>

            <div className="flex justify-center">
                <button className="new-btn mr-4 sm:mr-0">
                    <Link to="/login"> Go to Login Page </Link>
                </button>
            </div>


        </div>
    )

}

export default PageNotFound;
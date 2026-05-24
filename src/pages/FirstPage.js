import react, {useEffect} from "react";
import './FirstPage.css';
import ReactPlayer from 'react-player';
import {NavBar} from "../components/navbar";


// Render a YouTube video player
export const FirstPage = () => {
    let title = "firstPage";

    useEffect(
        ()=>{
            document.title = title;
        },
    )
    return (
        <>
        <NavBar/>
            <div className="firstPage">
                <div className={"reactPlayer"}>
                <ReactPlayer src='https://www.youtube.com/watch?v=LXb3EKWsInQ'/>
                </div>
            </div>
        </>
    )
}
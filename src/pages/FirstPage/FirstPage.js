import { useEffect } from "react";
import './FirstPage.css';
import ReactPlayer from 'react-player';
import { NavBar } from '../../components/Navbar';

export const FirstPage = () => {
    const title = "firstPage";

    useEffect(() => {
        document.title = title;
    });

    return (
        <>
            <NavBar />
            <div className="firstPage">
                <div className="reactPlayer">
                    <ReactPlayer src='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
                </div>
            </div>
        </>
    );
};

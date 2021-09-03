import React, { useEffect, useState, useRef } from "react";
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';
import useInterval from '../../custom-hooks/use-interval';
import './LoopProgressBar.css';

// component to hanldle the loop progress bar
const LoopProgressBar = ({ isPlaying }) => {
    const [progressState, setProgressState] = useState(0);
    // const progressBar = useRef();
    useEffect(() => {
        if (!isPlaying) {
            setProgressState(0)
        }
    })
    // filling the progress bar every second
    useInterval(() => {
        console.log('loop activated')
        handleLoop();
    }, isPlaying ? 1000 : null);

    // Handle loop progress
    const handleLoop = () => {
        if (isPlaying) {
            if (progressState === 7) {
                setProgressState(0)
            } else {
                setProgressState(progressState + 1)
            }
        } else {
            if (progressState !== 0) {
                setProgressState(0);
            }
        }
    }

    return (
        <>
            <ProgressBar
                // ref={progressBar}
                striped
                now={progressState}
                animated min={0}
                max={7}
                className='progress-bar-blue bg-warning'
            />
        </>

    )
}

export default LoopProgressBar;
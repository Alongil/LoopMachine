import { useState, useRef } from 'react';
import { Button, Overlay, Tooltip } from 'react-bootstrap';
import { icons } from '../../helper/icons'
import './Controllers.css';



const RecordTracks = ({ tracks, isPlaying, handlePlay, handleStop, setTracks }) => {
    const [showToolTip, setShowToolTip] = useState(false);
    const recordBtn = useRef(null);

    // saving the selected to local storage tracks unsless 
    const recordTracks = (e) => {
        let counter = 0;
        for (const track in tracks) {
            if (tracks[track].isChecked) {
                counter++;
            }
        }
        if (counter > 0 && isPlaying) {
            let savedTracks = tracks;
            localStorage.setItem('savedTracks', JSON.stringify(savedTracks));
            setShowToolTip(true);
        } else {
            handleStop(false);
            alert('Sorry, I can\'t save an empty session');
        }
    };

    // getting the selected tracks from local storage and calling the handle play function
    const handlePlayRecordedTracks = () => {
        if (!isPlaying) {
            let tracksFromLocalStorage = JSON.parse(localStorage.getItem('savedTracks'));
            if (!tracksFromLocalStorage) {
                alert('No tracks have been recorded please record something and try again');
                return;
            }
            for (const track in tracksFromLocalStorage) {
                tracksFromLocalStorage[track].audio = new Audio(tracksFromLocalStorage[track].url);
            }
            setTracks(tracksFromLocalStorage);
            handlePlay();
        }
    };

    return (
        <>
            <Button
                className='record-btn btn-dark'
                title="Save Session"
                ref={recordBtn}
                onClick={recordTracks}
                onMouseOut={() => { setShowToolTip(false) }}
                disabled={!isPlaying}
            >
                {icons.save}
            </Button>
            {/* bootstrap component to handle the overly that gives feedback to the client when a track is being played */}
            <Overlay
                target={recordBtn.current}
                show={showToolTip}
                placement="top"
            >
                {(props) => (
                    <Tooltip id="overlay-saved" {...props}>
                        Saved!
                    </Tooltip>
                )}
            </Overlay>
            <Button
                className='play-recorded-btn btn-dark'
                title="Load Session"
                onClick={handlePlayRecordedTracks}
                disabled={isPlaying}
            >
                {icons.load}
            </Button>
        </>
    )
}

export default RecordTracks;

import { useState, useEffect, useRef } from 'react';
import useInterval from '../../custom-hooks/use-interval';
import { tracksInfo } from '../../helper/TracksInfo'
import { Button, Row, Container, Col, Overlay, Tooltip } from 'react-bootstrap';
import LoopProgressBar from './LoopProgressBar';
import { icons } from '../../helper/icons'
import './Controllers.css';



const NewControllers = () => {
    // initiating component states
    const [tracks, setTracks] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const loopTimer = 8000;

    const [show, setShow] = useState(false);
    const target = useRef(null);

    // initiating the tracks object once when component mounts
    useEffect(() => {
        const tracksWithState = {}
        tracksInfo.forEach((trackInfo) => tracksWithState[trackInfo.id] = {
            name: trackInfo.name,
            isChecked: false,
            url: trackInfo.url,
            audio: new Audio(trackInfo.url)
        });
        setTracks(tracksWithState);
    }, []);

    useEffect(() => {
        if (isPlaying) {
            playCheckedTracks(tracks);
        }
    }, [isPlaying])



    // custom hook to control the loop of tracks playing(only activate if isPlaying state is true)
    useInterval(() => {
        playCheckedTracks(tracks);
    }, isPlaying ? loopTimer : null);


    const playCheckedTracks = (currTracks) => {
        // looping through tracks object and playing the checked ones
        for (const track in currTracks) {
            if (currTracks[track].isChecked) {
                const audio = currTracks[track].audio;
                audio.pause();
                audio.currentTime = 0;
                audio.play();
            }
        }
    };
    const handlePlay = () => {
        playCheckedTracks(tracks);
        setIsPlaying(true);
    };

    const handleStop = () => {
        setIsPlaying(false);
        // checking which tracks are checked, pausing and reseting them.
        for (const track in tracks) {
            if (tracks[track].isChecked) {
                const audio = tracks[track].audio;
                audio.pause();
                audio.currentTime = 0;
            };
        };
    };

    // function to handle click on a track,  if track is checked pause and reset it to  0 
    const handleClick = (trackId) => {
        if (tracks[trackId].isChecked) {
            const audio = tracks[trackId].audio;
            audio.pause();
            audio.currentTime = 0;
        }
        // getting the current object from tracks object
        let track = { ...tracks[trackId] }
        // toggle track is checked proprity
        track.isChecked = !track.isChecked;
        // setting track to new state
        setTracks(prevState => {
            return {
                ...prevState,
                [trackId]: track
            }
        });
    };

    // saving the checked tracks only in local storage, if there arnt't any, alerting and setting isPlaying state to false
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
            setShow(true);
        } else {
            setIsPlaying(false);
            alert('Sorry, I can\'t save an empty session');
        }
    };
    //getting the recorded tracks from local storage and setting tracks object to tracks from local storage
    const handlePlayRecordedTracks = () => {
        if (!isPlaying) {
            let tracksFromLocalStorage = JSON.parse(localStorage.getItem('savedTracks'));
            if (!tracksFromLocalStorage) {
                alert('No tracks have been recorded please record something and try again');
                return;
            }
            for (const track in tracksFromLocalStorage) {
                // setting the audio to new audio after getting tracks from local storage
                tracksFromLocalStorage[track].audio = new Audio(tracksFromLocalStorage[track].url);
            }

            setTracks(tracksFromLocalStorage);
            setIsPlaying(true);
        }
    };

    // looping through tracks object and returning and array of components with each on with a different track
    const trackList = Object.entries(tracks).map(([trackId, trackValue]) => {
        return (
            <Col xxl={4} xl={4} lg={4} md={4} sm={4} className='square'>
                <Button
                    className={trackValue.isChecked ? 'track btn active' : 'track btn'}
                    color='primary'
                    variant="secondary"
                    size="lg"
                    key={trackId}
                    onClick={() => { handleClick(trackId) }}>
                    {trackValue.name}
                </Button>
            </Col>
        )
    })


    return (
        <>
            <Container className='container-tracks'>
                <LoopProgressBar striped variant="success" animated={true} min={0} max={8} isPlaying={isPlaying} />
                <Row xl={4} lg={4} md={4} xs={2} className='border-radius'>
                    {trackList}
                </Row>
                <Button onClick={handlePlay} disabled={isPlaying} className='play-btn btn-dark' variant="success" title="Play">
                    {icons.play}
                </Button>
                <Button onClick={handleStop} className='stop-btn btn-primary btn-dark' title="Stop">
                    {icons.stop}
                </Button>
                <Button ref={target} onClick={recordTracks} onMouseOut={() => { setShow(false) }} disabled={!isPlaying} className='record-btn btn-dark' title="Save Session">
                    {icons.save}
                </Button>
                <Overlay target={target.current} show={show} placement="top">
                    {(props) => (
                        <Tooltip id="overlay-saved" {...props}>
                            Saved!
                        </Tooltip>
                    )}
                </Overlay>
                <Button onClick={handlePlayRecordedTracks} disabled={isPlaying} className='play-recorded-btn btn-dark' title="Load Session">
                    {icons.load}
                </Button>
            </Container>
        </>
    )
}

export default NewControllers;

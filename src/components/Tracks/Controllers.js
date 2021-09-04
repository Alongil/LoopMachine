import { useState, useEffect, useRef } from 'react';
import useInterval from '../../custom-hooks/use-interval';
import { tracksInfo } from '../../helper/TracksInfo'
import { Button, Row, Container, Col, Overlay, Tooltip } from 'react-bootstrap';
import LoopProgressBar from './LoopProgressBar';
import RecordTracks from './RecordTracks';
import { icons } from '../../helper/icons'
import './Controllers.css';

const Controllers = () => {
    const [tracks, setTracks] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const loopTimer = 8000;

    // creating the tracks object
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

    // playing or stoping the tracks depending on is playing state
    useEffect(() => {
        if (isPlaying) {
            play(tracks);
        } else {
            stop(tracks);
        }
    }, [isPlaying])

    // custom hook to control the loop of tracks playing(only activate if isPlaying state is true)
    useInterval(() => {
        play(tracks);
    }, isPlaying ? loopTimer : null);


    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handleStop = () => {
        setIsPlaying(false);
    };

    //play function 
    const play = (currTracks) => {
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

    // stop function, getting the tracks it needs to stop as an argument and stoping it
    const stop = (tracksToStop) => {
        if (typeof tracksToStop == 'string') {
            const audio = tracks[tracksToStop]?.audio;
            if(audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        } else if(typeof tracksToStop == 'object'){
            for (const track in tracks) {
                if (tracks[track]?.isChecked) {
                    const audio = tracks[track]?.audio;
                    audio.pause();
                    audio.currentTime = 0;
                };
            };
        } else {
            throw new Error('unsupported object type to stop');
        }
    }
    // function to handle a track beuing clicked,  if track is checked pause and reset it to  0 
    const handleClick = (trackId) => {
        if(tracks[trackId].isChecked) {
            stop(trackId);
        }
        let track = { ...tracks[trackId] }
        // toggle track is checked property
        track.isChecked = !track.isChecked;

        setTracks(prevState => {
            return {
                ...prevState,
                [trackId]: track
            }
        });
    };

    // looping through tracks object and returning an array of button ecch containing a track 
    const trackList = Object.entries(tracks).map(([trackId, trackValue]) => {
        return (
            <Col className='square' xxl={4} xl={4} lg={4} md={4} sm={4} >
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
    });

    return (
        <>
            <Container className='container-tracks'>
                <LoopProgressBar
                    striped variant="success"
                    animated={true}
                    isPlaying={isPlaying}
                />
                <Row className='border-radius' xl={4} lg={4} md={4} xs={2} >
                    {trackList}
                </Row>
                <Button
                    className='play-btn btn-dark'
                    title="Play"
                    onClick={handlePlay}
                    disabled={isPlaying}
                >
                    {icons.play}
                </Button>
                <Button
                    className='stop-btn btn-primary btn-dark'
                    title="Stop"
                    onClick={handleStop}
                >
                    {icons.stop}
                </Button>
                <RecordTracks
                    tracks={tracks}
                    isPlaying={isPlaying}
                    handleStop={handleStop}
                    handlePlay={handlePlay}
                    setTracks={(tracks) => { setTracks(tracks) }}
                />
            </Container>
        </>
    )
}

export default Controllers;

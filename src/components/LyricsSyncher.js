import React, { useState, useEffect, useCallback } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Label, Button, Container, Row, ButtonGroup } from "reactstrap";



function LyricsSyncher(props) {

    const [data, setData] = useState([]);
    const url = URL.createObjectURL(props.filePath);
    const [audio, setAudio] = useState(new Audio(url));
    const [currentStart, setCurrentStart] = useState();
    const [currentLine, setCurrentLine] = useState(0);
    const [isRecordingLyric, setIsRecordingLyrics] = useState(false);
    const lyrics = props.lyrics.split('\n');

    useEffect(() => {
        console.log(lyrics);
        const onKeyDown = (event) => {
            if (event.keyCode === 32) {
                event.preventDefault();
                if (event.repeat) return;
                setIsRecordingLyrics(true);
                setCurrentStart(audio.currentTime);
            }
        };

        const onKeyUp = (event) => {
            if (event.keyCode === 32) {
                event.preventDefault();

                if (event.repeat) return;


                // Make sure the audio is playing.
                if (audio.paused) return;

                // New data
                const newData = { line: lyrics[currentLine], start: currentStart, end: audio.currentTime };
                //Update data.
                setData(prevData => [...prevData, newData]);


                let nextLine = 0;
                // Increase current line if possible
                for (let i = currentLine; i < lyrics.length; i++) {
                    nextLine = i + 1;
                    if (lyrics[nextLine].trim() !== '') {

                        break;
                    }
                }
                setCurrentLine(nextLine);
                setIsRecordingLyrics(false);
            }
        };

        document.addEventListener("keydown", onKeyDown, false);
        document.addEventListener("keyup", onKeyUp, false);


        return () => {
            document.removeEventListener("keyup", onKeyUp, false);
            document.removeEventListener("keydown", onKeyDown, false);
        };
    }, [currentStart, data, currentLine]);

    function onResetClick(e) {
        audio.pause();
        audio.currentTime = 0;
        setCurrentLine(0);
        setData([]);
    }

    function onSaveClick(e) {
        const output = JSON.stringify(data);
        const file = new Blob([output], {type: 'text/json'});
        const tmpLink = document.createElement("a");
        tmpLink.href = URL.createObjectURL(file);
        tmpLink.setAttribute('download','synched_lyrics.json');
        tmpLink.click();
    }


    return (
        <>
            <ButtonGroup>
                <Button onClick={() => audio.play()}>Play audio</Button>
                <Button onClick={onResetClick}>Reset</Button>
                <Button onClick={onSaveClick}>Save</Button>
            </ButtonGroup>
            <Container>
                {lyrics.map((itm, index) => {
                    return (<Row key={index}>
                        {itm.isEmpty ? <></> : <Label style={index === currentLine && isRecordingLyric ? { fontWeight: 'bold' } : {}}>{itm}</Label>}
                    </Row>);
                })}
            </Container>
        </>
    )
}

export default LyricsSyncher;
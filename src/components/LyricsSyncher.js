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
        const file = new Blob([output], { type: 'text/json' });
        const tmpLink = document.createElement("a");
        tmpLink.href = URL.createObjectURL(file);
        tmpLink.setAttribute('download', 'synched_lyrics.json');
        tmpLink.click();
    }


    return (
        <>
            <Container>
                <Row>
                    <h3>Instructions</h3>
                    <ul>
                        <li>Click on play audio</li>                        
                        <li>Pres and hold space bar when lyric line starts</li>
                        <li>Release space bar when lyric line ends</li>
                        <li>When finished, click on Save to download the json file</li>
                        <li>If you make a mistake, click on reset to stop the audio and clear the data</li>
                    </ul>

                </Row>
                <Row>
                    <ButtonGroup>
                        <Button onClick={() => audio.play()}>Play audio</Button>
                        <Button onClick={onResetClick}>Reset</Button>
                        <Button onClick={onSaveClick}>Save</Button>
                    </ButtonGroup>
                </Row>
                {lyrics.map((itm, index) => {
                    const isEmpty = itm.trim() === '';
                    const style = {marginBottom: 0};
                    if(index === currentLine && isRecordingLyric)
                        style.fontWeight = 'bold';
                    return (<Row key={index} style={isEmpty ? {display: 'block'} : {}} className="text-center">
                        {isEmpty ? <div style={{margin: '20px'}}></div> : <p style={style}>{itm}</p>}
                    </Row>);
                })}
            </Container>
        </>
    )
}

export default LyricsSyncher;
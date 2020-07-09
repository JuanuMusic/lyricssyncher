import React, { useState } from 'react';
import './App.css';
import { Jumbotron, Button, Input, Label, FormGroup, Form, Container, Row, Col } from 'reactstrap';
import LyricsEditor from './components/LyricsEditor';
import LyricsSyncher from './components/LyricsSyncher';
import AudioSelect from './components/AudioSelect';

function App() {
  const [step, setStep] = useState(1);
  const [lyrics, setLyrics] = useState('');
  const [audioFilePath, setAudioFilePath] = useState('');

  function onNextStepClicked(e) {
    if (step === 3)
      setStep(0);
    else
      setStep(step + 1);

  }

  function onLyricsChanged(lyrics) {
    setLyrics(lyrics);
  }

  function onAudioFileChanged(path) {
    setAudioFilePath(path);
  }

  function getCurrentComponent() {
    switch (step) {
      case 1:
        return <LyricsEditor onChange={onLyricsChanged} />
      case 2:
        return <AudioSelect onChange={onAudioFileChanged} />
      case 3:
        return <LyricsSyncher lyrics={lyrics} filePath={audioFilePath} />
      default:
        return <></>
    }
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">Lyrics Syncher</h1>
              <p className="lead">A simple and fast way to generate a lyrics file synched to an audio file.</p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col lg={{ size: 6, offset: 3 }} md={12}>
            {getCurrentComponent()}
            <Button onClick={onNextStepClicked}>Next step</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

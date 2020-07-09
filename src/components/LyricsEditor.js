import React, { useState } from 'react';
import { Button, Input, Label, FormGroup, Form, Container, Row, Col } from 'reactstrap';

function LyricsEditor(props) {

    function handleLyricsChanged(e) {
        if (props.onChange) props.onChange(e.target.value);
    }

    return (
        <>
            <h5>Type or paste your lyrics below and click on "Next Step"</h5>
            <Form>
                <FormGroup>
                    <Input type="textarea" name="lyrics" id="lyricsField" aria-label="lyrics" rows={10} onChange={handleLyricsChanged} />
                </FormGroup>
            </Form>
        </>
    )
}

export default LyricsEditor;
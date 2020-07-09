import React, { useState } from 'react';
import { Button, Input, Label, FormGroup, Form, Container, Row, Col } from 'reactstrap';

function LyricsEditor(props) {

    function handleLyricsChanged(e) {
        if (props.onChange) props.onChange(e.target.value);
    }

    return (
        <Form>
            <FormGroup>
                <Label for="lyricsField">Enter your lyrics</Label>
                <Input type="textarea" name="lyrics" id="lyricsField" aria-label="lyrics" rows={20} onChange={handleLyricsChanged} />
            </FormGroup>
        </Form>
    )
}

export default LyricsEditor;
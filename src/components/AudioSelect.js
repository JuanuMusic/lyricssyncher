import React, { useState } from "react";
import { Label, Button, Input } from "reactstrap";
import { readdirSync, read } from "fs";
//const { dialog } = window.require("electron").remote;
//const url = window.require("url");
function AudioSelect(props) {

    const [path, setPath] = useState('');

    function onSelectedFileChanged(e) {
        props.onChange(e.target.files[0]);
    }


    return (
        <>
            <div style={{marginBottom: '20px'}}>
                <h5>Select your audio file</h5>
                <Input type="file" onChange={onSelectedFileChanged}></Input>
            </div>
        </>
    );
}

export default AudioSelect;
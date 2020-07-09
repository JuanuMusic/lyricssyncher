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
            <Label>Select audio file</Label>
            <Input type="file" onChange={onSelectedFileChanged}></Input>
        </>
    );
}

export default AudioSelect;
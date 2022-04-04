import { CONFIG } from '../data/config';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as axios from 'axios';
import '../App.css';
import { useState } from 'react';

function Upload() {
    
    const [selectedFile, setSelectedFile] = useState();
    const [disabledSubmit, setDisabledSubmit] = useState(true)
    const [isDataReady, setIsDataReady] = useState(false);

    function changeHandler(event) {
        if(event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            setDisabledSubmit(false);
        } else {
            setSelectedFile();
            setDisabledSubmit(true);
        }
    }

    async function handleSubmission() {

        const bodyFormData = new FormData();
        bodyFormData.append('data', selectedFile);
        const urlUserData = CONFIG.API_URL + '/users/data';

        const response = await axios({
            method: 'post',
            url: urlUserData,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" }
        })

        if(response.status === 200){
            setDisabledSubmit(true);
            setIsDataReady(true);
        }
    }   

    return (
        <div className="App">
            <header className="App-full">
                <h1 className="m-4">
                    Upload your user's data.
                </h1>
                <div className="App-body">
                    <div className="White-bg">
                        <div className="my-2 container">
                            <div>
                                <div className="m-2 text-dark">
                                    <input className="form-control form-control-lg max-w-80" type="file" name="file" onChange={changeHandler} />
                                    <button type="button"  className="mx-2 btn btn-primary btn-lg" onClick={handleSubmission} disabled={disabledSubmit}>Import</button>
                                </div>
                                <div>
                                    <button type="button"  className="mx-2 btn btn-success btn-lg" disabled={!isDataReady}><Link to="/data">See data</Link></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Upload;

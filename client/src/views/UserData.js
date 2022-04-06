import { CONFIG } from '../data/config';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as axios from 'axios';
import '../App.css';
import { useEffect, useState } from 'react';
// import BasicTable from '../components/BasicTable';
import DataTable from '../components/DataGrid';

function UserData() {

    const [userData, setUserData] = useState({});

    // Hook called upon loading the component
    useEffect(() => {
        async function fetchData() {
            // GET request using axios inside useEffect React hook
            const response = await axios.get(`${CONFIG.API_URL}/users/data`)
            if (response.data) {
                setUserData(response.data)
            }
        }
        fetchData();
    }, []);

    return (
        <div className="App">
            <header className="App-full">
                <h1 className="m-4">
                    Consult your user 's data.
                </h1>
                <div className="App-body">
                    <div className="White-bg">
                        <div className='container'>
                            <div>
                                <div className="m-2 text-dark" style={{ display: 'flex', height: '100%' }}>
                                    <DataTable rows={userData.rows || []} columns={userData.columns || []}>
                                    </DataTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default UserData;
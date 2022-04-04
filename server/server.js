require('dotenv').config();
const express = require('express')
const multer = require('multer');
const cors = require('cors');
const { connectCallback } = require('./database');
const upload = multer({ dest: 'uploads/' })

const CSV_MIME_TYPES = ["text/plain",
    "text/x-csv",
    "application/vnd.ms-excel",
    "application/csv",
    "application/x-csv",
    "text/csv",
    "text/comma-separated-values",
    "text/x-comma-separated-values",
    "text/tab-separated-value"
]

const app = express()

app.use(cors());

app.get('/', function(req, res) {
    res.send('Health check')
})

app.get('/users/data', async function(req, res) {

    // Modify the following:

    const usersData = []; // should be all the users documents

    // end here

    // Leave this rows/columns formatting untouched. Client-side needs this format
    const rows = usersData.map((data, index) => {
        data.id = index;

        return data;
    })

    const columns = Object.keys(usersData[0]).map((key => {
        return {
            field: key,
            headerName: key
        }
    }))

    res.send({
        rows,
        columns,
    })

})

const PORT = 8080;
connectCallback(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
})
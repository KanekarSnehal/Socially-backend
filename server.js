const express = require('express');
const { json, urlencoded } = require('express');
const { PORT, FRONTEND_URL } = require('./config/server');
const apiRoutes = require('./routes');
const cors = require('cors');

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors(
    {
        origin: FRONTEND_URL,
        credentials: true
    }
));
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
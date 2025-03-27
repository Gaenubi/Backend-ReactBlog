const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const express = require('express');
const path = require('path');
const { Logger } = require('./middleware/LogEvents');
const errorHandler = require('./middleware/errorHandler');
const port = process.env.PORT || 4322;
const app = express();


//custom middleware
app.use(Logger)
//built in middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
//app.use('/subdir', express.static(path.join(__dirname, 'public')))
//third party middleware

app.use(cors(corsOptions))

app.use('/posts', require('./routes/api/posts'));
//app.use('/register', require('./routes/api/employees'));


app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
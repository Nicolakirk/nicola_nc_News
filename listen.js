const app = require('./app.js');
const { PORT = 9090 } = process.env;

app.listen(9090, (err) => {
    if(err) console.log(err)
    else console.log('Server is listening on ${PORT}')
})
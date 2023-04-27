const express = require('express')
const path = require('path');
const cors = require('cors');
const app = express()
const port = 3000

const fs = require('fs');
var child_process = require('child_process');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})


app.get('/cmdTerminal',(req,res) => {
    const cmd = req.query.cmd.split(' ')[0];
    const args = req.query.cmd.split(' ').slice(1);
    const terminal = child_process.spawnSync(cmd, [...args], { encoding : 'utf8' })
    console.log("Process finished.");
    if (terminal.error) {
        res.send(terminal.error.stack);
      }else{
        res.send(terminal.stdout);
      }
    });
  
  
app.use(cors({
    origin: '*'
}));
app.listen(port, () => {
console.log(`Serveur UI lancé sur le port => ${port}`)
})
const express = require("express")
const batteryLevel = require('battery-level');

const app = express();

let battery;
app.get("/battery-stats", async (req,res) => {
    let battery = await batteryLevel() * 100;
    console.log(battery);
    res.send(JSON.stringify({
        "battery": battery,
    }))
})

app.listen(8080,()=> {
    console.log(`Listening on port ${8080}`)
})
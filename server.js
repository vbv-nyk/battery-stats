const express = require("express")
const batteryLevel = require('battery-level');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let battery = 20, should_charge = true, ll = 40, ul = 80;


function check_charge(){
    if(battery >= ll && battery <= ul) {
        return true
    }  else {
        return false
    }
}

app.post("/update-battery", (req,res) => {
    let {laptop_battery} = req.body;
    battery = Math.floor(laptop_battery);
    should_charge = check_charge()
    console.log(`update-battery ${ll} ${ul} ${should_charge} ${battery}`)
    res.send({
        response:"Success",
        should_charge,
        ll,
        ul,
        battery
    })
})

app.post("/change-bounds", (req,res) => {
    let {lower_limit, upper_limit} = req.body;
    ll = lower_limit
    ul = upper_limit
    should_charge = check_charge();
    console.log(`update-battery ${ll} ${ul} ${should_charge} ${battery}`)
    res.send({
        ll,
        ul,
        should_charge  
    })
})

app.get("/battery-stats", (req,res) => {
    console.log(`battery-stats ${ll} ${ul} ${should_charge} ${battery}`)
    res.send({
        ll,
        ul,
        should_charge  
    })
})

app.listen(8080,()=> {
    console.log(`Listening on port ${8080}`)
})
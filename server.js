require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const axios = require('axios');


app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());

let query = "nature";
let type = 'all';



app.post('/post', (req, res)=>{
    query = req.body.name;
    type = req.body.sel;
    console.log(query, type);
    const pixaUrl = `https://pixabay.com/api/?key=${process.env.API_KEY}&q=${query}&image_type=${type}&per_page=200`;
    axios
        .get(pixaUrl)
        .then(response=>{ 
            console.log(response.data.hits);
        res.send(response.data.hits);
        })
        .catch(e=>{console.log(e);})
})


// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static('scroll/build'));
//     app.get('*', function(req, res){
//         res.sendFile(path.resolve(__dirname, 'scroll', 'build', 'index.html'));
//     })
// }

app.listen(process.env.PORT || 3001, () => {
    console.log('server started');
})


import Express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import fs from "fs";

const port = 3000;
const app = Express();
const api_key = "b4a8682dd3mshdda7ce718b44bb9p19bb49jsn9f8a83c0dc96";
const api_host = "text-to-speech27.p.rapidapi.com";
const api_site = "https://text-to-speech27.p.rapidapi.com/speech/";

var send_sentence = "Hello World! How are you? I am Nikhil";

// This is for now giving text input currently



app.use(Express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.render("index.ejs");
}); 

app.get("/spe", async ( req, res)=>{
        var text_sound = await axios.get(api_site, {
            params: {
                text: send_sentence,
                lang: 'en-us'
            },
            headers: {
                'X-RapidAPI-Key': api_key,
                'X-RapidAPI-Host': api_host
            },
            responseType: 'arraybuffer'
        })
        .then(text_sound => {
            // Assuming the response is in arraybuffer format
            const audioData = Buffer.from(text_sound.data, 'binary');
            res.set("Content-type", "audio/mpeg");
            res.send(audioData);
        })
        .catch(error => {
        console.error('Error:', error);
        });
});

app.listen( port, ( req, res)=>{
    console.log(`Listening on Port ${port}`);
});
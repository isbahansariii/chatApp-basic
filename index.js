const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require('method-override')
const Chat = require("./models/chat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))

//---------------------------------------------------------------------------------------------
const mongoose = require("mongoose");
main().then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err)
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
//-------------------------------------------------------------------------------------------------

// Index path to show all cahts
app.get("/chats", async (req, res)=>{
    const chats = await Chat.find();
    res.render("allChats.ejs", {chats})
})

// ---------- CREATE CHAT START ------------------
app.get("/chats/new", (req, res)=>{
    res.render("addChat.ejs")
})
app.post("/chats", (req, res)=>{
    let {from, msg, to} = req.body;
    let newChat = new Chat ({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat.save()
        .then( data=>console.log(data) )
        .catch( err=>console.log(err) );

    res.redirect("/chats")
})
// ----------- CREATE CHAT END -------------------


// ------ EDIT AND UPDATE CHAT START --------------

// edit
app.get("/chats/:id/edit", async (req, res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat})
})

// update
app.patch("/chats/:id", async (req, res)=>{
    let {id} = req.params;
    let {msg} = req.body;
    
    await Chat.findByIdAndUpdate(id, {msg: msg}, {new:true, runValidators:true });
    
    res.redirect("/chats")
})
// ------- EDIT AND UPDATE CHAT END ---------------


// ----------- DELETE CHAT END -------------------

// del all
app.delete("/chats", async (req, res)=>{
    await Chat.deleteMany({});
    res.redirect("/chats");
})

// del one
app.delete("/chats/:id", async (req, res)=>{
    let {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

// ----------- DELETE CHAT END -------------------

//  root path
app.get("/", (req, res)=>{
    res.send("Hello, I am there.")
});

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
});
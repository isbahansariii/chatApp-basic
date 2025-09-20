const mongoose = require("mongoose");
const Chat = require("./models/chat.js");


// ------------------ Establising Connection--------------------------
main()
    .then( () => console.log("Connection established") )
    .catch( err => console.log(err) );

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}
// -------------------------------------------------------------------

const allChat = [
    {
        from: "Isbah",
        to: "Darisha",
        msg: "Hi there, It's me Isbah.",
        created_at: new Date()
    },
    {
        from: "Darisha",
        to: "Isbah",
        msg: "Ok, how can I help you?",
        created_at: new Date()
    },
    {
        from: "Bilal",
        to: "Isbah",
        msg: "How to solve our fyp issues?",
        created_at: new Date()
    },
    {
        from: "Isbah",
        to: "Bilal",
        msg: "Let's talk about it. I'm free!",
        created_at: new Date()
    },
    {
        from: "Aly",
        to: "Hassan",
        msg: "Coffee or tea?",
        created_at: new Date()
    },
    {
        from: "Hassan",
        to: "Aly",
        msg: "2 cup half cut tea?",
        created_at: new Date()
    },
    {
        from: "Aly",
        to: "Hassan",
        msg: "Sure!",
        created_at: new Date()
    },
    {
        from: "Miss Sana",
        to: "CR Saleem",
        msg: "Today we've the class of Maths.",
        created_at: new Date()
    },
    {
        from: "CR Saleem",
        to: "Miss Sana",
        msg: "Ok Ma'am",
        created_at: new Date()
    },
    {
        from: "Hina",
        to: "Amber",
        msg: "I am in the class, call you later!",
        created_at: new Date()
    }
];

Chat.insertMany(allChat)
    .then(data => console.log(data))
    .catch(err => console.log(err));
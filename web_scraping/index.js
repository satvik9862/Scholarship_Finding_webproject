const express=require("express");
const app=express();
const path=require('path')
const Message=require('./module/chat')
const session = require('express-session');
const {scholarupdate}=require("./controller/updateTodo");
app.use(session({
    secret: 'satvik@555',
    resave: false,
    saveUninitialized: true
  }));
const { scrapeAndCreateTodos }= require('./controller/createTodo');
// const onConnected=require("./controller/sockets");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static('public'));
app.set("view engine","ejs");
app.set('views',path.resolve("./Views"))
const todoRoutes=require("./routes/todo")
// app.use("/api/v1",todoRoutes);
app.use("/",todoRoutes);
// app.post('/api/v1/createTodo', createTodo);
const server=app.listen(4000,()=>{
    console.log("running on port 3005");
    runScrapingAndCreateTodos();
})
const io = require('socket.io')(server);
const dbConnect=require("./config/database")
dbConnect
async function runScrapingAndCreateTodos() {
    try {
        // await scrapeAndCreateTodos();
        console.log('Scraping and creating todos completed.');
    } catch (error) {
        console.error('Error running scraping and creating todos:', error);
    }
}
let socketsConected = new Set();
io.on('connection', onConnected);
// function onConnected(socket) {
//     socket.on('set-name', (name) => {
//        // Set the name for the socket connection
//        socket.name = name;
//        // Emit an event to the client to indicate that the name is set
//        socket.emit('name-set');
//    });
//    console.log('Socket connected', socket.id);
//    socketsConected.add(socket.id);
//    io.emit('clients-total', socketsConected.size);
//    socket.on('request-previous-messages', () => {
//        // Retrieve previous messages from the database
//        Message.find().sort('-dateTime').limit(100).then((messages) => {
//            // Send previous messages to the client
//            socket.emit('previous-messages', messages);
//        }).catch((error) => {
//            console.error('Error retrieving previous messages:', error);
//        });
//    });
//    // Retrieve previous messages from MongoDB
//    // Message.find().sort('-dateTime').limit(100).then((messages) => {
//    //   // Emit previous messages to the newly connected client
//    //   socket.emit('previous-messages', messages.reverse());
//    // }).catch((error) => {
//    //   console.error('Error retrieving previous messages:', error);
//    // });
 
//    socket.on('disconnect', () => {
//      console.log('Socket disconnected', socket.id);
//      socketsConected.delete(socket.id);
//      io.emit('clients-total', socketsConected.size);
//    });
 
 
//    socket.on('message', (data) => {
//              // Broadcast the message to all connected clients
//             //  socket.broadcast.emit('chat-message', data);
//              console.log(data.name);
         
//              const message = new Message({
//                  name: data.name,
//                  message: data.message
//              });
//              message.save()
//                  .then(() =>{console.log('Message saved to MongoDB');
                 
//                  socket.broadcast.emit('chat-message', data);
                 
//             })
//                  .catch(err => console.error('Error saving message to MongoDB:', err));
//          });
     
//          socket.on('feedback', (data) => {
//              socket.broadcast.emit('feedback', data);
//          });
//  }
 function onConnected(socket) {
//     socket.on('set-name', (name) => {
//        // Set the name for the socket connection
//        socket.name = name;
//        // Emit an event to the client to indicate that the name is set
//        socket.emit('name-set');
//    });
socket.emit('name-set');
   console.log('Socket connected', socket.id);
   socketsConected.add(socket.id);
   io.emit('clients-total', socketsConected.size);
   socket.on('request-previous-messages', () => {
       // Retrieve previous messages from the dataase
       Message.find().sort('-dateTime').limit(100).then((messages) => {
           // Send previous messages to the client
           socket.emit('previous-messages', messages);
       }).catch((error) => {
           console.error('Error retrieving previous messages:', error);
       });
   });
 
   socket.on('disconnect', () => {
     console.log('Socket disconnected', socket.id);
     socketsConected.delete(socket.id);
     io.emit('clients-total', socketsConected.size);
   });
 
 
   socket.on('message', (data) => {
             // Broadcast the message to all connected clients
             socket.broadcast.emit('chat-message', data);
             console.log(data.name);
         
             const message = new Message({
                 name: data.name,
                 message: data.message
             });
             message.save()
                 .then(() => console.log('Message saved to MongoDB'))
                 .catch(err => console.error('Error saving message to MongoDB:', err));
         });
     
    
 }
//  app.get('/chat',(req,res)=>{
//     res.render("chat");
//  })
//  scholarupdate();
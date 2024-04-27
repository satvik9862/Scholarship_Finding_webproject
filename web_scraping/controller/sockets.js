const Message=require("../module/chat");
let socketsConected = new Set();


function onConnected(socket,io) {
    socket.on('set-name', (name) => {
       // Set the name for the socket connection
       socket.name = name;
       // Emit an event to the client to indicate that the name is set
       socket.emit('name-set');
   });
   console.log('Socket connected', socket.id);
   socketsConected.add(socket.id);
   io.emit('clients-total', socketsConected.size);
   socket.on('request-previous-messages', () => {
       // Retrieve previous messages from the database
       Message.find().sort('-dateTime').limit(100).then((messages) => {
           // Send previous messages to the client
           socket.emit('previous-messages', messages);
       }).catch((error) => {
           console.error('Error retrieving previous messages:', error);
       });
   });
   // Retrieve previous messages from MongoDB
   // Message.find().sort('-dateTime').limit(100).then((messages) => {
   //   // Emit previous messages to the newly connected client
   //   socket.emit('previous-messages', messages.reverse());
   // }).catch((error) => {
   //   console.error('Error retrieving previous messages:', error);
   // });
 
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
     
         socket.on('feedback', (data) => {
             socket.broadcast.emit('feedback', data);
         });
 }

 module.exports={onConnected};
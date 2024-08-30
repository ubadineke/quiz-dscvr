import { Server as SocketIOServer, Socket } from 'socket.io';

// Function to register Socket.IO events
export const registerSocketEvents = (io: SocketIOServer) => {
    io.on('connection', (socket: Socket) => {
        console.log('A user connected');
        socket.on('joinQuizRoom', (pin: string, username: string) => {
            socket.join(pin); // Join the room based on the quiz pin
            console.log(`Socket ${socket.id} joined room: ${pin}`);

            // Emit an event to notify all clients in the room
            io.emit('playerJoined', { username, pin });
        });

        // Listen for a request to get the players count
        socket.on('getPlayersCount', (pin: string) => {
            const playersCount = io.sockets.adapter.rooms.get(pin)?.size || 0; // Count users in the room
            console.log(playersCount);
            socket.emit('updatePlayersCount', playersCount);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
            // Optionally, handle player removal here
        });
    });
};

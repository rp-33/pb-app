import SocketIOClient from 'socket.io-client';

const url = (global.__DEV__) ? 'http://192.168.1.7:8888' : 'https://petsbenefits.herokuapp.com';

const socket = SocketIOClient(url, {
    reconnectionDelay: 500,
    reconnection: true,
    reconnectionAttemps: 10,
    agent: false,
    upgrade: false,
    rejectUnauthorized: false
}); 

export default socket;

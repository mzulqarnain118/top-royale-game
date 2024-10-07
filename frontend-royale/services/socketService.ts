import { io, Socket } from 'socket.io-client';
import { SERVER_URL } from './api';

interface ServerToClientEvents {
  updatePlayerList: (players: any[]) => void;
  gameStart: () => void;
  updateHealth: (playerId: string, health: number) => void;
  playerEliminated: (playerId: string) => void;
  gameOver: (message: string) => void;
  error: (message: string) => void;  // Error event from server
}

interface ClientToServerEvents {
  joinGame: (username: string, mode: 'BattleRoyale' | 'Deathmatch') => void;
  attackPlayer: (targetId: string) => void;
  buyLoadout: (loadoutItem: string) => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

// Function to initialize socket connection
export const initiateSocketConnection = () => {
  if (!socket) {
    socket = io(SERVER_URL);

    socket.on('connect', () => {
      console.log('Connected to server:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('error', (message: string) => {
      console.error('Error from server:', message);
      // Handle the error however you'd like
    });

    // Other events can be added here...
  }
};

// Function to join a game
export const joinGame = (username: string, mode: 'BattleRoyale' | 'Deathmatch') => {
  if (socket) {
    socket.emit('joinGame', username, mode);
  }
};

// Function to attack another player
export const attackPlayer = (targetId: string) => {
  if (socket) {
    socket.emit('attackPlayer', targetId);
  }
};

// Function to listen for updates on player list
export const onPlayerListUpdate = (callback: (players: any[]) => void) => {
  if (socket) {
    socket.on('updatePlayerList', callback);
  }
};

// Function to handle game start event
export const onGameStart = (callback: () => void) => {
  if (socket) {
    socket.on('gameStart', callback);
  }
};

// Function to handle health updates
export const onHealthUpdate = (callback: (playerId: string, health: number) => void) => {
  if (socket) {
    socket.on('updateHealth', callback);
  }
};

// Function to listen for game over event
export const onGameOver = (callback: (message: string) => void) => {
  if (socket) {
    socket.on('gameOver', callback);
  }
};

// Function to disconnect the socket when not needed
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

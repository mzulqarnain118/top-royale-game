export type LobbyBoxesType = LobbyBoxType[];

export type LobbyBoxType = {
    id: string;
    name: string;
    clickedCount: number;
}

export const lobbyBoxes: LobbyBoxesType = [
    { id: "1", name: 'Lobby 1', clickedCount: 0 }, 
    { id: "2", name: 'Lobby 2', clickedCount: 0 }, 
    { id: "3", name: 'Lobby 3', clickedCount: 0 }, 
    { id: "4", name: 'Lobby 4', clickedCount: 0 }, 
    { id: "5", name: 'Lobby 5', clickedCount: 0 }, 
    { id: "6", name: 'Lobby 6', clickedCount: 0 }, 
    { id: "7", name: 'Lobby 7', clickedCount: 0 }, 
    { id: "8", name: 'Lobby 8', clickedCount: 0 }, 
    { id: "9", name: 'Lobby 9', clickedCount: 0 }
];


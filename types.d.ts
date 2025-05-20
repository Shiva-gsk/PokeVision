
export interface User {
    username: string;
    avatar: null;
    region: string;
    joinedDate: string;
    stats: {
        captured: number;
        totalPokemon: number;
        badges: number;
        rare: number;
    };
}
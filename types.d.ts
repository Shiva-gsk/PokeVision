
export interface UserType {
    name: string;
    avatar: null | string;
    region: string;
    createdAt: string;
    stats: {
        captured: number;
        totalPokemon: number;
        badges: number;
        rare: number;
    };
}

interface Pokemon {
  id: number
  name: string
  image: string
  type: string
  captured: boolean
  createdAt: string | null
}
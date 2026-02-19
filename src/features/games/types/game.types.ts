export interface Game {
    id: number;
    name: string;
    rating: number;
    released: string;
    genres: { id: number; name: string }[];
    background_image: string | null;
    [key: string]: any;
}

export interface RawgResponse {
    results: Game[];
    count: number;
}

export interface GameState {
    loading: boolean;
    results: Game[];
    error: string | null;
    currentPage: number;
    totalPages: number;
    count: number;
}


export interface GameDetailState {
  loading: boolean;
  game: Game | null;
  error: string | null;
}

export interface Game {
    id: number;
    name: string;
    rating: number;
    released: string;
    genres: { id: number; name: string }[];
    background_image: string | null;
    parent_platforms: GamePlatform[];
    [key: string]: any;
}
export interface GamePlatform {
  platform: {
    name: string;
       id?: number;
    slug?: string;
  };
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
const API_KEY = "3d6c1fae19c3464fa0e8b2c9fc9bacc0";

// Get the genres of the game

export const fetchGenres = async () => {
    // NOTE: Fetching all game genres from RAWG API

  const res = await fetch(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;// NOTE: RAWG API returns results array
};
//get the platforms of the game

export const fetchParentPlatforms = async () => {
    // NOTE: Fetching all parent platforms from RAWG API

  const res = await fetch(
    `https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;// NOTE: RAWG API returns results array
};


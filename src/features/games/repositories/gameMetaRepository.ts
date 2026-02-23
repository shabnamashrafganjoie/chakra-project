const API_KEY = "3d6c1fae19c3464fa0e8b2c9fc9bacc0";

//get the genres of the game
export const fetchGenres = async () => {
  const res = await fetch(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;
};
//get the platforms of the game

export const fetchParentPlatforms = async () => {
  const res = await fetch(
    `https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;
};


import {
  fetchGenres,
  fetchParentPlatforms,
} from "../repositories/gameMetaRepository";
export const getGenres = async () => {
    // NOTE: Service function to fetch game genres

  return await fetchGenres();
};

export const getParentPlatforms = async () => {
    // NOTE: Service function to fetch parent platforms

  return await fetchParentPlatforms();
};
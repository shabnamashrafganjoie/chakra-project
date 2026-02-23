import {
  fetchGenres,
  fetchParentPlatforms,
} from "../repositories/gameMetaRepository";
export const getGenres = async () => {
  return await fetchGenres();
};

export const getParentPlatforms = async () => {
  return await fetchParentPlatforms();
};
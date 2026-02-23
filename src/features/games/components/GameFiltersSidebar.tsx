"use client";

import {
  Box,
  Heading,
  Checkbox,
  CheckboxGroup,
  Stack,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGames,
  resetGames,
} from "@/features/games/redux/getAllGamesSlice";
import { fetchMetaData } from "@/features/games/redux/gameMetaSlice";
import type { RootState, AppDispatch } from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  searchQuery: string;
}

export default function GameFilterSidebar({ searchQuery }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();

  const { genres, platforms } = useSelector(
    (state: RootState) => state.gameMeta
  );

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
const router = useRouter();
  useEffect(() => {
    dispatch(fetchMetaData());
  }, [dispatch]);
// useEffect(() => {
//     const parentPlatform = searchParams.get("parent_platforms");

//     dispatch(
//       fetchGames({
//         page: 1,
//         parent_platforms: parentPlatform
//           ? [Number(parentPlatform)]
//           : [],
//       })
//     );
//   }, [searchParams, dispatch]);

  const applyFilters = () => {
    dispatch(resetGames());
 const genresParam = selectedGenres.map(Number).join(",");
  const platformsParam = selectedPlatforms.map(Number).join(",");
    // dispatch(
    //   fetchGames({
    //     page: 1,
    //     search: searchQuery,
    //     genres: selectedGenres.map(Number),
    //     parent_platforms: selectedPlatforms.map(Number),
    //   })
    // );

     // آپدیت URL با پارامترها
  const query: Record<string, string> = {};
  if (searchQuery) query.search = searchQuery;
  if (genresParam) query.genres = genresParam;
  if (platformsParam) query.parent_platforms = platformsParam;

  // ساخت query string
  const queryString = new URLSearchParams(query).toString();

  router.push(`/games?${queryString}`);
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
      <Heading size="md" mb={4}>
        Filters
      </Heading>

      {/* Genres */}
      <Heading size="sm" mb={3}>
        Genres
      </Heading>

      <CheckboxGroup
        value={selectedGenres}
        onChange={(values) => setSelectedGenres(values as string[])}
      >
        <Stack spacing={2}>
          {genres.map((genre) => (
            <Checkbox key={genre.id} value={genre.id.toString()}>
              {genre.name}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>

      <Divider my={6} />

      {/* Platforms */}
      <Heading size="sm" mb={3}>
        Platforms
      </Heading>

      <CheckboxGroup
        value={selectedPlatforms}
        onChange={(values) => setSelectedPlatforms(values as string[])}
      >
        <Stack spacing={2}>
          {platforms.map((platform) => (
            <Checkbox
              key={platform.id}
              value={platform.id.toString()}
            >
              {platform.name}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>

      <Button
        mt={8}
        w="full"
        bg="black"
        color="white"
        _hover={{ bg: "gray.800" }}
        onClick={applyFilters}
      >
        Apply Filters
      </Button>
    </Box>
  );
}
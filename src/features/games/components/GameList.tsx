//3d6c1fae19c3464fa0e8b2c9fc9bacc0
"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGames } from "@/features/games/redux/getAllGamesSlice";
import Loading from "@/components/shared/Loading";
import type { RootState, AppDispatch } from "@/store/store";
import type { Game } from "@/features/games/types/game.types";

import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import GameCard from "./GameCard";
import { useRouter } from "next/navigation";
import Search from "@/components/shared/SerchBox";
import { useSearchParams } from "next/navigation";

export default function GamePage() {
  const dispatch = useDispatch<AppDispatch>();
const router = useRouter();
  // گرفتن state محصولات از Redux
  const { loading, results, error,next , previous , count   } = useSelector(
    (state: RootState) => state.games
  );
const searchParams = useSearchParams();
const searchQuery = searchParams.get("search") || "";
  useEffect(() => {
    dispatch(fetchGames({ page: 1,search: searchQuery }));
    console.log("Search Query:", searchQuery);
  }, [dispatch,searchQuery]);




  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={6} p={4} width="100%">
      {/* لودینگ */}
      {loading && <Loading />}

      {/* خطا */}
      {error && (
        <Heading as="h2" size="lg" color="red.500" textAlign="center">
          {error}
        </Heading>
      )}
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }} // responsive
        gap={6}
        width="100%"
      >
        {/* سمت راست: sidebar */}
        <Box
          w={{ base: "100%", md: "30%" }}
          border="1px solid #ddd"
          p={4}
          rounded="md"
          h="fit-content"
          bg="gray.50"
        >
         <Search />
        </Box>

        {/* سمت چپ: محصولات */}
        <Box w={{ base: "100%", md: "70%" }}>
          {results.length > 0 && (
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fit, minmax(162px, 1fr))"
              gap={4}
            >
              {results.map((game: Game) => (
                <GameCard key={game.id} data={game} onClick={()=>router.push(`/games/${game.id}`)}/>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* <Box>Page: {currentPage} / {totalPages}</Box> */}

{/* Pagination buttons */}
<Flex gap={4} mt={6}>
  <Button
    onClick={() => {
      if (next) {
        const url = new URL(next);
        const page = Number(url.searchParams.get("page") || 1);
        dispatch(fetchGames({ page, search: searchQuery }));
      }
    }}
    disabled={!next}
  >
    Next
  </Button>

  <Button
    onClick={() => {
      if (previous) {
        const url = new URL(previous);
        const page = Number(url.searchParams.get("page") || 1);

        dispatch(fetchGames({ page, search: searchQuery }));
      }
    }}
    disabled={!previous}
  >
    Previous
  </Button>
</Flex>
    </Box>
  );
}

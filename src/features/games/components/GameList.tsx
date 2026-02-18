//3d6c1fae19c3464fa0e8b2c9fc9bacc0
"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGames } from "@/features/games/redux/getAllGamesSlice";
import Loading from "@/components/shared/Loading";
import type { RootState, AppDispatch } from "@/store/store";
import type { Game } from "@/features/games/redux/getAllGamesSlice";

import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import GameCard from "./GameCard";

export default function GamePage() {
  const dispatch = useDispatch<AppDispatch>();

  // گرفتن state محصولات از Redux
  const { loading, results, error,currentPage , totalPages   } = useSelector(
    (state: RootState) => state.games
  );

  useEffect(() => {
    dispatch(fetchGames({ page: 1 }));
  }, [dispatch]);



  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(fetchGames({ page: currentPage + 1 }));
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(fetchGames({ page: currentPage - 1 }));
    }
  };


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
          <Heading as="h3" size="md" mb={4}>
            Sidebar
          </Heading>
          {/* محتویات sidebar */}
          <Box>
            <p>Filter by category</p>
            <p>Filter by price</p>
            <p>Other filters...</p>
          </Box>
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
                <GameCard key={game.id} data={game} />
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* <Box>Page: {currentPage} / {totalPages}</Box> */}

{/* Pagination buttons */}
<Flex gap={4} mt={6}>
  <Button onClick={handleNext} disabled={currentPage >= totalPages}>
    Next
  </Button>
  <Button onClick={handlePrev} disabled={currentPage < 2}>
    Previous
  </Button>
</Flex>
    </Box>
  );
}

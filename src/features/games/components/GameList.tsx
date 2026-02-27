//3d6c1fae19c3464fa0e8b2c9fc9bacc0
"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGames } from "@/features/games/redux/getAllGamesSlice";
import Loading from "@/components/shared/Loading";
import type { RootState, AppDispatch } from "@/store/store";
import type { Game } from "@/features/games/types/game.types";

import { Box, Button, Flex, Heading, HStack } from "@chakra-ui/react";
import GameCard from "./GameCard";
import { usePathname,useRouter } from "next/navigation";
import Search from "@/components/shared/SerchBox";
import { useSearchParams } from "next/navigation";
import GameFilterSidebar from "./GameFiltersSidebar";

export default function GamePage() {
  const dispatch = useDispatch<AppDispatch>();
const router = useRouter();
  const { loading, results, error,next , previous , count   } = useSelector(
    (state: RootState) => state.games
  );
const searchParams = useSearchParams();
const searchQuery = searchParams.get("search") || "";


const genresParam = searchParams.get("genres") || "";
const platformsParam = searchParams.get("parent_platforms") || "";

const genres = genresParam ? genresParam.split(",").map(Number) : [];
const platforms = platformsParam ? platformsParam.split(",").map(Number) : [];
  useEffect(() => {
    dispatch(fetchGames({ page: 1,search: searchQuery,genres,
      parent_platforms: platforms }));
    console.log("Search Query:", searchQuery);
  }, [dispatch,searchQuery, genresParam, platformsParam]);

 const pathname = usePathname();


  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={6} p={4} width="100%">
      {loading && <Loading />}

      {error && (
        <Heading as="h2" size="lg" color="red.500" textAlign="center">
          {error}
        </Heading>
      )}
        <Flex
  justify="space-between"
  align={{ base: "start", md: "center" }}
  direction={{ base: "column", md: "row" }}
  gap={4}
  mb={3}
  mt={2}
  display={{sm:"flex",md:"none"}}
 
>
<HStack spacing={3} flexWrap="wrap"  >
  <Button
    size="sm"
    onClick={() => router.push("/")}
    bg={pathname === "/" ? "#2f855a" : "white"}
    color={pathname === "/" ? "white" : "#2f855a"}
    border="1px solid"
    borderColor="#2f855a"
    _hover={{
      bg: "#2f855a",
      color: "white",
    }}
  >
    خانه
  </Button>

  <Button
    size="sm"
    onClick={() => router.push("/products")}
    bg={pathname === "/products" ? "#2f855a" : "white"}
    color={pathname === "/products" ? "white" : "#2f855a"}
    border="1px solid"
    borderColor="#2f855a"
    _hover={{
      bg: "#2f855a",
      color: "white",
    }}
  >
    محصولات
  </Button>

  <Button
    size="sm"
    onClick={() => router.push("/games")}
    bg={pathname === "/games" ? "#2f855a" : "white"}
    color={pathname === "/games" ? "white" : "#2f855a"}
    border="1px solid"
    borderColor="#2f855a"
    _hover={{
      bg: "#2f855a",
      color: "white",
    }}
  >
    بازی ها
  </Button>
</HStack>
     </Flex>              
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }} // responsive
        gap={6}
        width="100%"
      >
        <Box
          w={{ base: "100%", md: "30%" }}
          border="1px solid #ddd"
          p={4}
          rounded="md"
          h="fit-content"
          bg="gray.50"
        >
         <Search />

         <GameFilterSidebar searchQuery={searchQuery} />
        </Box>

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


{/* Pagination buttons */}
<Flex gap={4} mt={6}>
  <Button
    onClick={() => {
      if (next) {
        const url = new URL(next);
        const page = Number(url.searchParams.get("page") || 1);
        dispatch(fetchGames({ page, search: searchQuery, genres, parent_platforms: platforms }));
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

        dispatch(fetchGames({ page, search: searchQuery, genres, parent_platforms: platforms }));
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

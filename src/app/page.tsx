"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/features/products/redux/getAllProductsSlice";
import Loading from "@/components/shared/Loading";
import ProductCard from "@/features/products/components/ProductCard";
import type { RootState, AppDispatch } from "@/store/store";
import type { Product } from "@/features/products/types/product.types";
import { Box, Button, Flex, Heading, HStack } from "@chakra-ui/react";
import type { Game } from "@/features/games/types/game.types";
import GameCard from "@/features/games/components/GameCard";
import { fetchGames } from "@/features/games/redux/getAllGamesSlice";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // گرفتن state محصولات از Redux
  const { loading, products, error } = useSelector(
    (state: RootState) => state.products
  );
const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const {  results,next , previous , count   } = useSelector(
    (state: RootState) => state.games
  );
useEffect(() => {
  dispatch(fetchGames());
}, [dispatch]);
   
  
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
        display=""
        flexDirection={{ base: "column", md: "row" }} // responsive
        gap={6}
        width="100%"
      >

       {/* محصولات ها */}
        <Box w={{ base: "100%", md: "100%" }} marginBottom={8}>
            <HStack spacing={2} marginBottom={2}>
                       
                         <Button 
                           variant="ghost" 
                           size={{ base: "xs", md: "sm" }} 
                           color="#00FF5F" 
                           _hover={{ bg: "rgba(0,255,95,0.1)" }}
                           onClick={()=>router.push("/products")}
                         >
                           View All Products
                         </Button>
                       </HStack>
          {products.length > 0 && (
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fit, minmax(162px, 1fr))"
              gap={4}
            >
           {(selectedProducts.length > 0 ? selectedProducts : products).slice(0,5).map((product: Product) => (
  <ProductCard
    key={product.id}
    data={product}
    onClick={() => router.push(`/products/${product.id}`)}
  />
))}
            </Box>
          )}
                     
        </Box>


            {/* بازی ها */}

                    <Box w={{ base: "100%", md: "100%" }}>
                        <HStack spacing={2} marginBottom={2}>
                       
                         <Button 
                           variant="ghost" 
                           size={{ base: "xs", md: "sm" }} 
                           color="#00FF5F" 
                           _hover={{ bg: "rgba(0,255,95,0.1)" }}
                           onClick={()=>router.push("/games")}
                         >
                           View All Games
                         </Button>
                       </HStack>
                      {results.length > 0 && (
                        <Box
                          display="grid"
                          gridTemplateColumns="repeat(auto-fit, minmax(162px, 1fr))"
                          gap={4}
                        >
                          {results.slice(0,5).map((game: Game) => (
                            <GameCard key={game.id} data={game} onClick={()=>router.push(`/games/${game.id}`)}/>
                          ))}
                        </Box>
                      )}
                    </Box>
      </Box>
    </Box>
  );
}

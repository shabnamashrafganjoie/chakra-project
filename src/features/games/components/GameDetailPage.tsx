"use client";

import { Box, Flex, Image, Text, Spinner, HStack, Button } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useGame } from "@/features/games/hooks/useGames";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { GamePlatform } from "../types/game.types";

export default function GameDetailPage() {
  const params = useParams();
  const gameId = Number(params.id);

  const { game, loading, error } = useGame(gameId);
  const [activeImage, setActiveImage] = useState(0);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!game) return <Text>Game not found</Text>;

  // ساخت آرایه تصاویر: اگر screenshot نیست، عکس اصلی یا placeholder
  const images = (game.short_screenshots?.map((s: any) => s.image) || [])
    .filter(Boolean); // حذف مقادیر null/undefined

  // اگر هیچ تصویری نیست، یک placeholder اضافه کن
  if (images.length === 0 && game.background_image) {
    images.push(game.background_image);
  }

  if (images.length === 0) {
    images.push("/placeholder.png"); // عکس پیش‌فرض پروژه
  }

  return (
    <Flex direction={{ base: "column", md: "row" }} gap={8} p={8}>
      {/* گالری تصاویر */}
      <Box flex="1">
        {/* عکس بزرگ */}
        <Box  borderRadius="xl" p={4}>
          <Image
            src={images[activeImage]}
            alt={game.name}
            borderRadius="lg"
            w="100%"
            objectFit="contain"
          />
        </Box>

        {/* thumbnails */}
        <HStack mt={4} spacing={3}>
          {images.map((img: string, idx: number) => (
            <Image
              key={idx}
              src={img}
              alt={`${game.name}-${idx}`}
              boxSize="70px"
              objectFit="cover"
              borderRadius="md"
              cursor="pointer"
              border={activeImage === idx ? "2px solid black" : "1px solid #ddd"}
              onClick={() => setActiveImage(idx)}
            />
          ))}
        </HStack>
      </Box>

      {/* اطلاعات بازی */}
      <Box flex="1" display="flex" flexDirection="column" gap={4} dir="ltr">
        <Text fontSize="3xl" fontWeight="bold">{game.name}</Text>
        <Text fontSize="lg" fontWeight="bold">
            {game.genres.map((genre)=>genre.name ).join(", ")}
        </Text>
        <Text fontSize="lg" color="gray.600">Released: {game.released}</Text>
  <Flex align="center" gap={2}>
  <FaStar color="#facc15" />
  <Text fontSize="lg" fontWeight="bold" >
    {game.rating ?? "N/A"}
  </Text>
</Flex>


{game.parent_platforms && game.parent_platforms.length > 0 && (
  <Text flexWrap="wrap" colorScheme="blue" fontSize="10px" mt={1} dir="ltr" >
    {game.parent_platforms.map((pp: GamePlatform) => pp.platform?.name).filter(Boolean).join(", ")}
  </Text>
)}
      

        <HStack mt={4}>
          <Button size="lg" colorScheme="brand">Add to cart</Button>
          <Button size="lg" variant="outline">Favorite</Button>
        </HStack>
      </Box>
    </Flex>
  );
}

// "use client";
// import { Box, Image, Text, IconButton, Badge } from "@chakra-ui/react";
// import { FiHeart } from "react-icons/fi";
// import React, { useState } from "react";

// // 1️⃣ تایپ Props
// export interface ProductCardProps {
//   data: {
//     id: number;
//     title: string;
//     price: number;
//     category?: string;
//     images?: string[]; // اگر تصاویر اختیاری هست
//   };
// }

// const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
//   const { images = [], title, price, category, id } = data;

//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <Box position="relative" className="border border-[#f9b6bd] rounded-xl p-[8px] w-[192px] h-[224px] flex-1 bg-white ">
//       <IconButton
//         aria-label="علاقه مندی"
//         icon={<FiHeart />}
//         size="sm"
//         position="absolute"
//         top={2}
//         right={2}
//         zIndex={10}
//         backgroundColor="white"

//       />
//       {/* تصویر */}
//       <div className="h-[91px] w-full rounded-lg flex justify-center items-center overflow-hidden">
//         {images[activeIndex] && (
//           <img
//             src={images[activeIndex]}
//             alt={title}
//             className="h-full object-contain w-full"
//           />
//         )}
//       </div>

//       {/* دایره‌ها برای انتخاب تصویر */}
//       {images.length > 1 && (
//         <div className="flex justify-center items-center gap-2 mt-2">
//           {images.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveIndex(index)}
//               className={`w-2 h-2 rounded-full transition-all ${
//                 index === activeIndex ? "bg-gray-800" : "bg-gray-300"
//               }`}
//             />
//           ))}
//         </div>
//       )}

//       <div className="border-b-[1px] border-gray-300 mb-[4px] mt-[4px]"></div>

//       {/* اطلاعات محصول */}
//       <div>
//         <span className="font-semibold fontSize-[14px]" >{title}</span>
//       </div>
//       <div>
//         <span className="fontSize-[14px]">Price: ${price}</span>
//       </div>
//       <div>
//         <span className="fontSize-[12px]">Category: {category}</span>
//       </div>
//     </Box>
//   );
// };

// export default ProductCard;











// "use client";

// import React, { useState } from "react";
// import { Box, Image, IconButton, Text, Badge, Flex } from "@chakra-ui/react";
// import { FiHeart } from "react-icons/fi";

// export interface ProductCardProps {
//   data: {
//     id: number;
//     title: string;
//     price: number;
//     category?: string;
//     images?: string[];
//   };
//   onClick?: () => void; // کلیک روی کل کارت
// }

// const ProductCard: React.FC<ProductCardProps> = ({ data, onClick }) => {
//   const { images = [], title, price, category } = data;
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <Box
//       position="relative"
//       bg="white"
//       borderWidth="1px"
//       borderRadius="xl"
//       p={3}
//       cursor="pointer"
//       _hover={{ shadow: "md" }}
//       onClick={onClick}
//     >
//       {/* قلب علاقه‌مندی */}
//       <IconButton
//         aria-label="علاقه مندی"
//         icon={<FiHeart />}
//         size="sm"
//         colorScheme="red"
//         position="absolute"
//         top={2}
//         right={2}
//         zIndex={10}
//         bg="white"
//         onClick={(e) => e.stopPropagation()} // جلوگیری از کلیک روی کارت
//       />

//       {/* تصویر محصول */}
//       <Box
//         h="120px"
//         w="full"
//         mb={2}
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         overflow="hidden"
//         borderRadius="md"
//       >
//         {images[activeIndex] && (
//           <Image
//             src={images[activeIndex]}
//             alt={title}
//             objectFit="contain"
//             maxH="full"
//           />
//         )}
//       </Box>

//       {/* دایره‌ها برای انتخاب تصویر */}
//       {images.length > 1 && (
//         <Flex justify="center" gap={2} mb={2}>
//           {images.map((_, index) => (
//             <Box
//               key={index}
//               w={2}
//               h={2}
//               borderRadius="full"
//               bg={index === activeIndex ? "gray.800" : "gray.300"}
//               cursor="pointer"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setActiveIndex(index);
//               }}
//             />
//           ))}
//         </Flex>
//       )}

//       <Box borderBottom="1px" borderColor="gray.200" mb={2}></Box>

//       {/* اطلاعات محصول */}
//       <Text fontWeight="semibold" fontSize="sm" noOfLines={1}>
//         {title}
//       </Text>
//       <Text fontSize="sm" color="green.600">
//         Price: ${price}
//       </Text>
//       {category && (
//         <Badge colorScheme="blue" fontSize="0.7em">
//           {category}
//         </Badge>
//       )}
//     </Box>
//   );
// };

// export default ProductCard;






"use client";

import React, { useState } from "react";
import { Box, Image, IconButton, Text, Badge, Flex } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";

export interface ProductCardProps {
  data: {
    id: number;
    title: string;
    price: number;
    discountPercentage?: number;
    images?: string[];
  };
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ data, onClick }) => {
  const { images = [], title, price, discountPercentage } = data;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box
      position="relative"
      bg="white"
      borderWidth="1px"
      borderRadius="xl"
      p={3}
      cursor="pointer"
      _hover={{ shadow: "lg", transform: "translateY(-4px)" }}
      transition="0.2s"
      onClick={onClick}
      w="100%"
    >
      {/* قلب */}
      <IconButton
        aria-label="favorite"
        icon={<FiHeart />}
        size="sm"
        position="absolute"
        top={4}
        right={4}
        zIndex={10}
        bg="gray-50"
        padding="2px"
        _hover={{ bg: "gray.100" }}
        onClick={(e) => e.stopPropagation()}
      />

      {/* تصویر */}
      <Box
        h="150px"
        w="full"
        mb={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        borderRadius="md"
        bg="gray.50"
      >
        {images.length > 0 ? (
          <Image
            src={images[activeIndex]}
            alt={title}
            objectFit="contain"
            maxH="full"
          />
        ) : (
          <Text fontSize="xs" color="gray.400">
            No Image
          </Text>
        )}
      </Box>

      {/* dots */}
      {images.length > 1 && (
        <Flex justify="center" gap={2} mb={2}>
          {images.map((_, index) => (
            <Box
              key={index}
              w={2}
              h={2}
              borderRadius="full"
              bg={index === activeIndex ? "gray.800" : "gray.300"}
              cursor="pointer"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(index);
              }}
            />
          ))}
        </Flex>
      )}

      <Box borderBottom="1px" borderColor="gray.200" mb={2}></Box>

      {/* title */}
      <Text fontWeight="bold" color="#242424" fontSize="12px" dir="ltr" noOfLines={1}>
        {title}
      </Text>

      {/* price */}
      <Text fontSize="16px" dir="ltr" color="#242424" fontWeight="bold">
        ${price}
      </Text>

      {/* category */}
      {discountPercentage && (
        <Text dir="ltr"  color="red" fontSize="12px"  mt={1} textDecoration="line-through">
          
    {discountPercentage}%

          
        </Text>
      )}
    </Box>
  );
};

export default ProductCard;





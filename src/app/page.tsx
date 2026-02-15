import { Link } from '@chakra-ui/next-js'
import { Box, Button } from '@chakra-ui/react'
export default function Home() {
  return (
    <>
    <Link href='/about' color='blue.400' _hover={{ color: 'blue.500' }}>
      About
    </Link>
    <Button backgroundColor={"primary.100"}>click me</Button>
    <Box bg={{ base: "red", md: "blue" }} w={{ base: "100%", md: "50%" }}>shabnam ashraf ganjoie</Box>
    </>
  )
}

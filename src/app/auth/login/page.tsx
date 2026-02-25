"use client"
import Link
 from "next/link";
 import { useRef , useState } from "react";
 import { useSearchParams, useRouter } from "next/navigation";
 import { getSession, signIn } from "next-auth/react"
 import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

 export default function LoginPage(){
   const router = useRouter();
   const [error,setError] = useState("");
   const username = useRef("");
   const password = useRef("");
   const role = useRef("");
   const searchParams = useSearchParams();
   const callbackUrl = searchParams.get("callbackUrl") || "/";
   const onSubmit = async (e:any) => {
    e.preventDefault();
    console.log(`Username: ${username.current},Password: ${password.current}`);


    try {
        const result = await signIn("credentials",{
            username: username.current,
            password: password.current,
            redirect: false,
            callbackUrl,

        });
        console.log(result);
        if(!result?.error){
          const session = await getSession();
          const role = (session?.user as any)?.role;
          if(role !=="user"){
            router.push("/admin")
          }else{
            router.push("/");
          }
        }else {
            setError("نام کاربری یا کلمه عبور نادرست است")
        }
        
    } catch (err) {
        setError(String(err));
    }

   }
   return(
     <Flex
      minH="100vh"
      align="center"
      justify="center"
    
      px={4}
    >
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="lg"
        w="full"
        maxW="md"
      >
        <VStack spacing={6} as="form" onSubmit={onSubmit}>
          <Heading size="lg" textAlign="center" color="green.600">
            StockX Login
          </Heading>
{error && (
  <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
)}
          <FormControl id="username" isRequired>
            <FormLabel>نام کاربری</FormLabel>
            <Input
              placeholder="نام کاربری"
              
              onChange={(e) => (username.current = e.target.value)}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>کلمه عبور</FormLabel>
            <Input
              type="password"
              placeholder="کلمه عبور"
              
              onChange={(e) => (password.current = e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="green"
            w="full"
          >
            ورود
          </Button>


        </VStack>
      </Box>
    </Flex>
   )
 }
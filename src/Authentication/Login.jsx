import {
    Box,
    Button,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    Icon,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from '../Firebase/firebaseConfig.js';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    const hadleEmaillogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill all required fields.");
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('auth', 'true');
            onLogin();
            navigate('/')
        } catch (error) {
            console.error("Google login failed:", error.code, error.message);
            alert(`Google login failed: ${error.code}`);

        }
    }

    const handleLoginWithGoogle = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            localStorage.setItem('auth', 'true')
            localStorage.setItem('user', JSON.stringify({ name: user.displayName, email: user.email }))
            onLogin();
            navigate('/');
        } catch (error) {
            console.error('Google login error:', error);
            alert('Google login failed');
        }
    }




  return (
  <Box
    minH="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    bg="gray.50"
    px={4}
  >
    <Box
      maxW="md"
      w="full"
      p={8}
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading mb={6} size="lg" color="teal.600" textAlign="center">
        Welcome Back
      </Heading>

      <form onSubmit={hadleEmaillogin}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            colorScheme="teal"
            size="md"
            type="submit"
            mt={2}
            width="full"
          >
            Login
          </Button>
        </Stack>
      </form>

      <Divider my={6} />

      <Button
        leftIcon={<Icon as={FcGoogle} boxSize={5} />}
        variant="outline"
        size="md"
        width="full"
        onClick={handleLoginWithGoogle}
      >
        Continue with Google
      </Button>

      <Text mt={6} textAlign="center" fontSize="sm" color="gray.500">
        Don't have an account?{" "}
        <Text
          as="span"
          color="blue.500"
          fontWeight="bold"
          cursor="pointer"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </Text>
      </Text>
    </Box>
  </Box>
);

}

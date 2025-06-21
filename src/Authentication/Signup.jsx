import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Firebase/firebaseConfig.js";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

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
        as="form"
        onSubmit={handleSignup}
        maxW="md"
        w="full"
        p={8}
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading mb={6} size="lg" color="teal.600" textAlign="center">
          Create an Account
        </Heading>

        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            size="md"
            mt={4}
            width="full"
            isLoading={loading}
            loadingText="Signing Up"
          >
            Sign Up
          </Button>
        </Stack>

        {error && (
          <Text color="red.500" mt={4} textAlign="center">
            {error}
          </Text>
        )}

        <Text
          mt={6}
          textAlign="center"
          fontSize="sm"
          color="gray.500"
          onClick={() => navigate("/login")}
          cursor="pointer"
        >
          Already have an account?{" "}
          <Text as="span" color="blue.500" fontWeight="bold">
            Login
          </Text>
        </Text>
      </Box>
    </Box>
  );
}

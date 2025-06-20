import { Box, Flex, Button, Heading, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const bg = useColorModeValue("gray.50", "gray.900");
  const btnShadow = useColorModeValue("md", "dark-lg");

  return (
    <Box
      minH="100vh"
      bg={bg}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={4}
    >
      <Heading mb={10} size="2xl" color="blue.600" textAlign="center">
        Welcome to Item Manager
      </Heading>

      <Flex direction={{ base: "column", md: "row" }} gap={6}>
        <Button
          as={Link}
          to="/additems"
          size="lg"
          px={10}
          py={6}
          colorScheme="blue"
          boxShadow={btnShadow}
          _hover={{ transform: "scale(1.05)" }}
        >
          ➕ Add Items
        </Button>

        <Button
          as={Link}
          to="/viewitems"
          size="lg"
          px={10}
          py={6}
          colorScheme="teal"
          boxShadow={btnShadow}
          _hover={{ transform: "scale(1.05)" }}
        >
          📋 View Items
        </Button>
      </Flex>
    </Box>
  );
}

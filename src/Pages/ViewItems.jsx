import {
  Box,
  Heading,
  Grid,
  GridItem,
  Image,
  Text,
  Stack,
  IconButton,
  Button,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import ItemModal from "@/Components/ItemModal";

export default function ViewItems() {
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");

  const [clickedItem, setClickedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const existing = JSON.parse(localStorage.getItem("Items") || "[]");
  const [items, setItems] = useState(existing);

  const handleDeleteItem = (indexToDelete) => {
    const updated = items.filter((_, index) => index !== indexToDelete);
    localStorage.setItem("Items", JSON.stringify(updated));
    setItems(updated);
  };

  return (
    <Box minH="100vh" bg={bg} py={10} px={{ base: 4, md: 10 }}>
      <Flex justify="space-between" align="center" mb={8}>
        <Button as={Link} to="/" colorScheme="blue" variant="ghost">
          Home
        </Button>
        <Heading size="lg" color="blue.600">
          All Items
        </Heading>
        <Button as={Link} to="/additems" colorScheme="teal">
          Add Item
        </Button>
      </Flex>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {items.map((item, index) => (
          <GridItem
            key={index}
            bg={cardBg}
            border="1px solid"
            borderColor={border}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="sm"
            position="relative"
            _hover={{
              boxShadow: "lg",
              transform: "scale(1.02)",
              transition: "0.3s ease",
            }}
            onClick={() => {
              setClickedItem(item);
              onOpen();
            }}
          >
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Delete item"
              colorScheme="red"
              size="sm"
              position="absolute"
              top="2"
              right="2"
              zIndex="1"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteItem(index);
              }}
            />
            <Image
              src={item.coverImage}
              alt={item.itemName}
              width="100%"
              height="200px"
              objectFit="cover"
            />
            <Stack p={4}>
              <Text fontWeight="bold" fontSize="lg" color="gray.700">
                {item.itemName}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Click to view details
              </Text>
            </Stack>
          </GridItem>
        ))}
      </Grid>
      <ItemModal isOpen={isOpen} onClose={onClose} item={clickedItem} />
    </Box>
  );
}

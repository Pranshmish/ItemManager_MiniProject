import { Box, Heading, VStack, FormControl, FormLabel, Input, Textarea, Select, Button, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddItem() {
    const bg = useColorModeValue("white", "gray.800");
    const border = useColorModeValue("gray.200", "gray.700");

    const [itemName, setItemName] = useState("");
    const [selectedItem, setSelectedItem] = useState("");
    const [discription, setDiscription] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [additionalImage, setAdditionalImage] = useState([]);
    const [success, setSuccess] = useState(false);

    const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });


    const handleAddItems = async (e) => {
        e.preventDefault();
        if (!itemName || !selectedItem || !discription || !coverImage) {
            alert("Please fill all required fields.");
            return;
        }

        const existing = JSON.parse(localStorage.getItem("Items")) || [];
        const coverBase64 = await fileToBase64(coverImage);
        const additionalBase64 = await Promise.all(
            additionalImage.map(fileToBase64)
        );

        const newItem = {
            itemName,
            selectedItem,
            discription,
            coverImage: coverBase64,
            additionalImage: additionalBase64,
        };

        const updatedItems = [...existing, newItem];
        localStorage.setItem("Items", JSON.stringify(updatedItems));

        setSuccess(true);
        setItemName("");
        setSelectedItem("");
        setDiscription("");
        setCoverImage(null);
        setAdditionalImage([]);
    };


    return (
        <Box
            maxW="2xl"
            mx="auto"
            mt={10}
            p={8}
            bg={bg}
            borderRadius="xl"
            border="1px solid"
            borderColor={border}
            boxShadow="lg"
        >
            <Heading size="lg" mb={6} textAlign="center" color="blue.600">
                Add New Item
            </Heading>

            <VStack spacing={5}>
                <FormControl isRequired>
                    <FormLabel fontWeight="semibold" color="gray.600">
                        Item Name
                    </FormLabel>
                    <Input
                        placeholder="Enter item name"
                        focusBorderColor="blue.400"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontWeight="semibold" color="gray.600">
                        Item Type
                    </FormLabel>
                    <Select
                        placeholder="Select item type"
                        focusBorderColor="blue.400"
                        value={selectedItem}
                        onChange={(e) => setSelectedItem(e.target.value)}
                    >
                        <option value="shirt">Shirt</option>
                        <option value="pant">Pant</option>
                        <option value="shoes">Shoes</option>
                        <option value="sports">Sports Gear</option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontWeight="semibold" color="gray.600">
                        Description
                    </FormLabel>
                    <Textarea
                        placeholder="Enter item description"
                        resize="vertical"
                        focusBorderColor="blue.400"
                        value={discription}
                        onChange={(e) => setDiscription(e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontWeight="semibold" color="gray.600">
                        Cover Image
                    </FormLabel>
                    <Input
                        type="file"
                        accept="image/*"
                        variant="flushed"
                        onChange={(e) => setCoverImage(e.target.files[0])}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight="semibold" color="gray.600">
                        Additional Images
                    </FormLabel>
                    <Input
                        type="file"
                        accept="image/*"
                        multiple
                        variant="flushed"
                        onChange={(e) => setAdditionalImage(Array.from(e.target.files))}
                    />
                </FormControl>

                <Button
                    width="full"
                    colorScheme="blue"
                    size="lg"
                    fontWeight="bold"
                    shadow="md"
                    _hover={{ bg: "blue.600" }}

                    onClick={handleAddItems}
                >
                    Add Item
                </Button>
                {success && (
                    <Box mt="4" textAlign="center" color="green.500" fontWeight="semibold">
                        ✅ Item added successfully!
                        <Button as={Link} to="/viewitems" ml="4" size="sm" colorScheme="teal">
                            View Items
                        </Button>
                    </Box>
                )}
            </VStack>
        </Box>
    );
}

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  Box,
  Stack,
  Button,
} from "@chakra-ui/react";

export default function ItemModal({ isOpen, onClose, item }) {
  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{item.itemName}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack spacing={4}>
            <Image
              src={item.coverImage || "https://via.placeholder.com/300"}
              alt="Cover"
              borderRadius="md"
              maxH="200px"
              objectFit="cover"
            />
            <Text fontWeight="bold">Type:</Text>
            <Text>{item.selectedItem}</Text>

            <Text fontWeight="bold">Description:</Text>
            <Text>{item.discription}</Text>

            <Text fontWeight="bold">Gallery:</Text>
            <Button colorScheme="blue" mt={4} width="full">
              Enquire
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

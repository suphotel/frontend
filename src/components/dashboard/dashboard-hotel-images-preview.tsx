import {Hotel} from "../../types";
import {ActionIcon, Alert, Box, Image, Modal, SimpleGrid} from "@mantine/core";
import React from "react";
import {Trash} from "tabler-icons-react";
import axios from "axios";

interface Props {
  hotel: Hotel;
  opened: boolean;
  close: (withLoading: boolean) => void;
}

export const DashboardHotelImagesPreview = ({hotel, opened, close}: Props) => {
  const deleteImage = (imageId: number) => {
    console.log(imageId);

    axios.delete(`/hotels/${hotel.id}/images/${imageId}`)
      .then(response => {
        console.log(response);
        // TODO: remove image from hotel.images
      })
      .catch(error => console.log(error))
  }

  const previews = hotel.images.map((file, index) => {
    return (
      <Box display={"flex"} sx={{alignItems: "center"}} key={index}>
        <Image
          sx={{zIndex: -999}}
          src={`http://localhost:3000/hotels/${hotel.id}/images/${file.id}`}
          alt={file.originalName}
        />
        <ActionIcon mx={30} color={"red"} onClick={() => deleteImage(file.id)}>
          <Trash/>
        </ActionIcon>
      </Box>
    );
  });

  return (
    <>
      <Modal size={"lg"} opened={opened} onClose={() => close(false)} title="Images preview">
        {hotel.images.length > 0 ? (
          <SimpleGrid
            cols={1}
            breakpoints={[{maxWidth: 'sm', cols: 1}]}
            mt={previews.length > 0 ? 'xl' : 0}
          >
            {previews}
          </SimpleGrid>
        ) : (
          <Alert>
            No images found
          </Alert>
        )}
      </Modal>
    </>
  )
}

import {Hotel, HotelImage} from "../../../types";
import {ActionIcon, Alert, Box, Button, Grid, Group, Image, Modal, SimpleGrid} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {Trash} from "tabler-icons-react";
import axios from "axios";
import {DashboardHotelFormUpload} from "./dashboard-hotel-form-upload";

interface Props {
  hotel: Hotel;
  opened: boolean;
  close: (withLoading: boolean) => void;
}

export const DashboardHotelImagesPreview = ({hotel, opened, close}: Props) => {
  const [images, setImages] = useState<HotelImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const getImages = () => {
    setLoading(true);

    axios.get(`/hotels/${hotel.id}/images`)
      .then(response => {
        setImages(response.data);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  const handleFilesUpload = (files: File[]) => {
    setFiles(files);
  }

  const uploadFiles = () => {
    setUploadLoading(true);

    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    axios.post(`/hotels/${hotel.id}/images`, formData)
      .then(response => {
        setFiles([]);

        getImages();
      })
      .catch(error => console.log(error)) // TODO: Handle error
      .finally(() => setUploadLoading(false));
  }

  useEffect(() => {
    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteImage = (imageId: number) => {
    axios.delete(`/hotels/${hotel.id}/images/${imageId}`)
      .then(response => {
        getImages();
      })
      .catch(error => console.log(error))
  }

  const previews = images.map((file, index) => {
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
      <Modal size={"auto"} opened={opened} onClose={() => close(false)} title="Images preview">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Grid>
            <Grid.Col span={6}>
              {images.length > 0 ? (
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
            </Grid.Col>

            <Grid.Col span={6}>
              <DashboardHotelFormUpload onUpload={handleFilesUpload} loading={uploadLoading}/>

              <Group mt={10} position={"right"}>
                <Button disabled={!files.length} loading={uploadLoading} onClick={uploadFiles}>Upload</Button>
              </Group>
            </Grid.Col>
          </Grid>
        )}
      </Modal>
    </>
  )
}

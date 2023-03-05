import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Hotel} from "../types";
import axios from "axios";
import {Alert, Box, Button, Container, Grid, Group, Image, Text} from "@mantine/core";
import {HotelBookForm} from "../components/hotels/hotel-book-form";
import {useDisclosure} from "@mantine/hooks";
import {HotelImagesPreview} from "../components/hotels/hotel-images-preview";

export default function HotelDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openedImagesPreview, {open: openImagesPreview, close: closeImagesPreview}] = useDisclosure(false);

  const firstImage = hotel?.images[0] ?? null;
  const otherImages = hotel?.images.slice(1, 5) ?? [];

  const getHotel = () => {
    setLoading(true);

    axios.get(`/hotels/${params.id}`)
      .then((response) => {
        setHotel(response.data);
      })
      .catch((error) => {
        setHotel(null);
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getHotel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => {
    navigate(-1);
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!hotel) {
    return (
      <Container mt={30}>
        <Alert>
          <Group position={"apart"}>
            <Text weight={"bold"}>Hotel not found</Text>
            <Button onClick={goBack} variant={"light"}>Go back</Button>
          </Group>
        </Alert>
      </Container>
    )
  }

  return (
    <>
      <Container mt={30} mb={30}>
        <Box>
          <Text mb={5} weight={"bold"} size={"xl"}>{hotel.name}</Text>
          <Text size={"md"}>{hotel.location}</Text>
        </Box>

        <Grid grow mt={30} mb={30} sx={{height: "100%"}}>
          {!hotel.images.length ? (
            <Grid.Col span={12}>
              <Alert>No images found</Alert>
            </Grid.Col>
          ) : (
            <Grid.Col p={0} span={6} h={"100%"}>
              <Image
                src={`http://localhost:3000/hotels/${hotel.id}/images/${firstImage?.id}`}
                alt={hotel.name}
                height={"100%"}
                width={"100%"}
              />
            </Grid.Col>
          )}

          {otherImages.length > 0 && (
            <Grid.Col span={6}>
              <Grid>
                {otherImages.map((image) => (
                  <Grid.Col key={image.id} span={6} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Image
                      src={`http://localhost:3000/hotels/${hotel.id}/images/${image.id}`}
                      alt={hotel.name}
                      height={150}
                      width={200}
                    />
                  </Grid.Col>
                ))}
                {hotel.images.length > 5 && (
                  <Grid.Col span={12}>
                    <Group position={"right"}>
                      <Button onClick={openImagesPreview} variant={"light"}>Show all images</Button>
                    </Group>
                  </Grid.Col>
                )}
              </Grid>
            </Grid.Col>
          )}
        </Grid>

        <Grid>
          <Grid.Col span={6}>
            <Text mt={5} mb={5} weight={"bold"} size={"lg"}>Description</Text>
            <Text size={"md"}>{hotel.description}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <HotelBookForm hotel={hotel} getHotel={getHotel}/>
          </Grid.Col>
        </Grid>

        <HotelImagesPreview hotel={hotel} opened={openedImagesPreview} close={closeImagesPreview}/>
      </Container>
    </>
  )
}
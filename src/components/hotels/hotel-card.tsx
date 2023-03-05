import {Hotel} from "../../types";
import {Card, Image, Text, Button, Group} from '@mantine/core';
import {Carousel} from "@mantine/carousel";
import {NavLink} from "react-router-dom";

interface Props {
  hotel: Hotel
}

export const HotelCard = ({hotel}: Props) => {
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Carousel w={"100%"} mx="auto" withIndicators slideSize={"100%"} height={200}>
            {!hotel.images.length ? (
              <Carousel.Slide>
                <Image
                  src={'https://via.placeholder.com/720x160'}
                  height={200}
                  width={"100%"}
                  alt="Norway"
                />
              </Carousel.Slide>
            ) : (
              hotel.images.map((image) => (
                <Carousel.Slide key={image.id}>
                  <Image
                    src={`http://localhost:3000/hotels/${hotel.id}/images/${image.id}`}
                    height={200}
                    width={"100%"}
                    alt={image.originalName}
                  />
                </Carousel.Slide>
              ))
            )}
          </Carousel>

        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={"bold"}>{hotel.name}</Text>
        </Group>

        <Text size="sm" color="dimmed" truncate>
          {hotel.description}
        </Text>

        <Button component={NavLink} to={`/hotels/${hotel.id}`} variant="light" color="blue" fullWidth mt="md" radius="md">
          View more
        </Button>
      </Card>
    </>
  )
}
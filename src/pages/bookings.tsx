import {Alert, Box, Button, Center, Container, Grid, Image, Text} from "@mantine/core";
import useAuth from "../hooks/useAuth";
import {useEffect} from "react";
import {Booking} from "../types";
import {formatDate} from "../utils/dates";
import {NavLink} from "react-router-dom";

export default function Bookings() {
  const {whoami, user, loading} = useAuth();

  useEffect(() => {
    whoami();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  const getImageUrl = (booking: Booking) => {
    if (booking.hotel.images.length === 0) {
      return 'https://via.placeholder.com/300x200?text=No+image';
    } else {
      return `http://localhost:3000/hotels/${booking.hotel.id}/images/${booking.hotel.images[0].id}`;
    }
  }

  return (
    <Container mt={30} mb={30}>
      <Center mb={30}>
        <Text weight={"bold"} size={"xl"}>My bookings</Text>
      </Center>

      {user && user.bookings.length === 0 && (
        <Alert>You have no bookings yet</Alert>
      )}

      {user && user.bookings.length > 0 && (
        <>
          {user.bookings.map((booking) => (
            <Box
              key={booking.id}
              sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                borderRadius: theme.radius.md,
                cursor: "pointer",
              })}
            >
              <Grid>
                <Grid.Col span={3}>
                  <Image
                    src={getImageUrl(booking)}
                    alt={"hotel image"}
                    height={100}
                    width={"100%"}
                    radius={"md"}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text weight={"bold"}>{booking.hotel.name}</Text>
                  <Text>{booking.hotel.location}</Text>
                  <Text>Start date: {formatDate(booking.startDate)}</Text>
                  <Text>End date: {formatDate(booking.endDate)}</Text>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Center maw={400} h={100} mx="auto">
                    <Button component={NavLink} to={`/hotels/${booking.hotel.id}`} variant={"light"}>View more</Button>
                  </Center>
                </Grid.Col>
              </Grid>
            </Box>
          ))}
        </>
      )}
    </Container>
  )
}
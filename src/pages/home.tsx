import {Alert, Container, Grid, SimpleGrid} from "@mantine/core";
import {useEffect, useState} from "react";
import {Hotel} from "../types";
import axios from "axios";
import {HotelCard} from "../components/hotels/hotel-card";

export default function Home() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getHotels = () => {
    setLoading(true);
    axios.get('/hotels')
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getHotels();
  }, []);

  if (loading) return <div>Loading...</div>

  return (
    <Container mt={40} mb={40} size={"xl"}>
      {!hotels.length ? (
        <Alert>No hotels found</Alert>
      ) : (
        <Grid>
          {hotels.map((hotel) => (
            <Grid.Col key={hotel.id} xl={3} md={4} sm={6} xs={12}>
              <HotelCard hotel={hotel}/>
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Container>
  )
}
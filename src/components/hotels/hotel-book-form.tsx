import {Box, Button, Card, Grid, Group, Text} from "@mantine/core";
import {DateInput, DatePicker} from "@mantine/dates";
import {useState} from "react";
import {Hotel} from "../../types";
import axios from "axios";

interface Props {
  hotel: Hotel;
  getHotel: () => void;
}

export const HotelBookForm = ({hotel, getHotel}: Props) => {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [loading, setLoading] = useState<boolean>(false);

  const bookHotel = () => {
    setLoading(true);

    axios.post(`/hotels/${hotel.id}/bookings`, {
      startDate: value[0],
      endDate: value[1]
    })
      .then((response) => {
        // TODO: Show success message
        getHotel();
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
    <Card shadow={"sm"} padding="lg" radius="md" withBorder>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={"bold"} size={"lg"}>Book date</Text>
      </Group>

      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Grid>
          <Grid.Col span={6}>
            <DateInput
              disabled
              value={value[0]}
              placeholder="Start date"
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <DateInput
              disabled
              value={value[1]}
              placeholder="End date"
            />
          </Grid.Col>

          <Grid.Col mt={10} span={12} sx={{display: 'flex', justifyContent: 'center'}}>
            <DatePicker type="range" value={value} onChange={setValue}/>
          </Grid.Col>
        </Grid>
      </Box>

      <Button onClick={bookHotel} fullWidth mt={30} loading={loading}>
        Book now
      </Button>
    </Card>
  )
}
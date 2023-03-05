import {Hotel} from "../../types";
import {Box, Grid, Image, Modal} from "@mantine/core";

interface Props {
  hotel: Hotel;
  opened: boolean;
  close: () => void;
}

export const HotelImagesPreview = ({hotel, opened, close}: Props) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Images preview"
      fullScreen
      transitionProps={{transition: 'fade', duration: 200}}
    >
      <Grid>
        {hotel.images.map((image, index) => (
          <Grid.Col key={index} xs={12} sm={6} md={4} lg={4}>
            <Box display={"flex"} sx={{alignItems: "center"}}>
              <Image
                sx={{zIndex: 0}}
                src={`http://localhost:3000/hotels/${hotel.id}/images/${image.id}`}
                alt={hotel.name}
                height={360}
                width={"100%"}
              />
            </Box>
          </Grid.Col>
        ))}
      </Grid>
    </Modal>
  )
}
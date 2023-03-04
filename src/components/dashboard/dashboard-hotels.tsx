import {Hotel} from "../../types";
import {useEffect, useState} from "react";
import axios from "axios";
import {ActionIcon, Badge, Box, Button, Center, Group, Popover, Table, Text} from "@mantine/core";
import {Edit, InfoCircle, Trash} from "tabler-icons-react";
import {useDisclosure} from "@mantine/hooks";
import {DashboardHotelForm} from "./dashboard-hotel-form";
import {DashboardHotelImagesPreview} from "./dashboard-hotel-images-preview";

interface Props {
  refreshStats: (withLoading: boolean) => void;
}

export const DashboardHotels = ({refreshStats}: Props) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openedHotelForm, {open: openHotelForm, close: closeHotelForm}] = useDisclosure(false);
  const [openedImagesPreview, {open: openImagesPreview, close: closeImagesPreview}] = useDisclosure(false);
  const [openedDeleteConfirm, setOpenedDeleteConfirm] = useState<boolean>(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    getHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getHotels = (withLoading: boolean = true) => {
    setLoading(withLoading);

    axios.get('/hotels')
      .then(response => {
        setHotels(response.data);

        refreshStats(false);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  const handleUpdate = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    openHotelForm();
  }

  const unselectHotel = () => {
    setSelectedHotel(null);
  }

  const openDeleteConfirm = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setOpenedDeleteConfirm(true);
  }

  const closeDeleteConfirm = () => {
    setSelectedHotel(null);
    setOpenedDeleteConfirm(false);
  }

  const confirmDelete = () => {
    if (!selectedHotel) {
      return closeDeleteConfirm();
    }

    axios.delete(`/hotels/${selectedHotel.id}`)
      .then(response => {
        // TODO: Show success message
        getHotels();
      })
      .catch(error => console.log(error))
      .finally(() => closeDeleteConfirm())
  }

  const handleOpenImagesPreview = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    openImagesPreview();
  }

  const handleCloseImagesPreview = (withLoading: boolean = true) => {
    unselectHotel();
    closeImagesPreview();
    getHotels(withLoading);
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Box mt={30}>
      <Button fullWidth mb={30} onClick={openHotelForm}>
        Add new hotel
      </Button>
      <Table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Description</th>
          <th align={"center"}>Images</th>
          <th align={"center"}>Actions</th>
        </tr>
        </thead>
        <tbody>
        {hotels.map((hotel) => (
          <tr key={hotel.id}>
            <td>{hotel.name}</td>
            <td>{hotel.location}</td>
            <td>{hotel.description}</td>
            <td align={"center"}>
              <Button variant={"subtle"} onClick={() => handleOpenImagesPreview(hotel)}>
                <Badge>
                  {hotel.images.length}
                </Badge>
              </Button>
            </td>
            <td>
              <Center>
                <ActionIcon color={"blue"} onClick={() => handleUpdate(hotel)}>
                  <Edit size={18}/>
                </ActionIcon>
                <Popover width={250} position="bottom" withArrow shadow="md"
                         opened={openedDeleteConfirm && selectedHotel?.id === hotel.id}
                         onChange={setOpenedDeleteConfirm}>
                  <Popover.Target>
                    <ActionIcon color={"red"} onClick={() => openDeleteConfirm(hotel)}>
                      <Trash size={18}/>
                    </ActionIcon>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Box mb={5} display={"flex"} sx={{alignItems: "center"}}>
                      <InfoCircle color={"red"}/>
                      <Text ml={5} weight={"bold"} size={"sm"}>Delete hotel</Text>
                    </Box>
                    <Text mb={10}>Are you sure you want to delete this hotel?</Text>

                    <Group position={"right"}>
                      <Button size={"xs"} variant={"default"} compact
                              onClick={() => closeDeleteConfirm()}>Cancel</Button>
                      <Button size={"xs"} variant={"filled"} compact
                              onClick={() => confirmDelete()}>Confirm</Button>
                    </Group>
                  </Popover.Dropdown>
                </Popover>
              </Center>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>

      <DashboardHotelForm opened={openedHotelForm} close={closeHotelForm} getHotels={getHotels} hotel={selectedHotel}
                          unselectHotel={unselectHotel}/>

      {selectedHotel && (
        <DashboardHotelImagesPreview opened={openedImagesPreview} close={handleCloseImagesPreview} hotel={selectedHotel}/>
      )}
    </Box>
  );
}
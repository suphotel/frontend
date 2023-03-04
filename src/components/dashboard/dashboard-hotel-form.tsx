import {Alert, Box, Button, Group, Modal, Textarea, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {CreateOrUpdateData, Hotel} from "../../types";
import axios, {AxiosError} from "axios";
import {useEffect, useState} from "react";
import {DashboardHotelFormUpload} from "./dashboard-hotel-form-upload";

interface Props {
  opened: boolean;
  close: () => void;
  getHotels: () => void;
  hotel?: Hotel | null;
  unselectHotel: () => void;
}

export const DashboardHotelForm = ({opened, close, getHotels, hotel, unselectHotel}: Props) => {
  const isCreating = !hotel;

  const [error, setError] = useState<AxiosError<any> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  const form = useForm<CreateOrUpdateData>({
    initialValues: {
      name: '',
      location: '',
      description: '',
    },
  });

  useEffect(() => {
    if (hotel) {
      form.setValues({
        name: hotel.name,
        location: hotel.location,
        description: hotel.description,
      });
    } else {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotel])

  const handleClose = () => {
    close();
    form.reset();
    setError(null);
    unselectHotel();
    getHotels();
  }

  const handleSimpleClose = () => {
    close();
    form.reset();
    setError(null);
    unselectHotel();
  }

  const handleFilesUpload = (files: File[]) => {
    setFiles(files);
  }

  const uploadFiles = (hotelId: number) => {
    setUploadLoading(true);

    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    axios.post(`/hotels/${hotelId}/images`, formData)
      .then(response => {
        handleClose();
      })
      .catch(error => console.log(error)) // TODO: Handle error
      .finally(() => setUploadLoading(false));
  }

  const handleSubmit = (values: CreateOrUpdateData) => {
    setLoading(true);

    if (isCreating) {
      axios.post('/hotels', values)
        .then(response => {
          // TODO: Show success message
          if (files.length > 0) {
            uploadFiles(response.data.id);
          } else {
            handleClose();
          }
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    } else {
      axios.put(`/hotels/${hotel.id}`, values)
        .then(response => {
          // TODO: Show success message
          console.log(response);

          handleClose();
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }
  }

  const formTitle = isCreating ? 'Add hotel' : 'Edit hotel';

  return (
    <>
      <Modal opened={opened} onClose={handleSimpleClose} title={formTitle}>
        <form onSubmit={form.onSubmit((values: CreateOrUpdateData) => handleSubmit(values))}>
          {(error) && (
            <Alert mb={25} color="red">
              {error.response?.data.message}
            </Alert>
          )}

          <TextInput mb={10} label="Name" placeholder="Four Seasons" type='text'
                     required={isCreating} {...form.getInputProps('name')} />
          <TextInput mb={10} label="Location" placeholder="Geneva" type='text'
                     required={isCreating} {...form.getInputProps('location')} />
          <Textarea label="Description" placeholder="Hotel description.." autosize
                    required={isCreating} {...form.getInputProps('description')} />

          {isCreating && opened && (
            <Box mt={20}>
              <DashboardHotelFormUpload onUpload={handleFilesUpload} loading={uploadLoading}/>
            </Box>
          )}

          <Group position={"right"}>
            <Button variant={"default"} type='button' onClick={handleSimpleClose} mt="xl">
              Close
            </Button>
            <Button type='submit' mt="xl" loading={loading}>
              Save
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
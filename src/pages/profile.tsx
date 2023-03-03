import {TextInput, Button, Divider, Group, Text, Modal, Container} from "@mantine/core";
import { useForm } from "@mantine/form";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import {UpdateUserData} from "../types";
import axios from "axios";

export default function Profile() {
  const [destroyConfirmOpened, setDestroyConfirmOpened] = useState<boolean>(false);
  const {user, logout} = useAuth();

  const form = useForm<UpdateUserData>({
    initialValues: {
      pseudo: user.pseudo,
      email: user.email
    },
  });

  const handleUpdate = (values: UpdateUserData) => {
    // TODO: handle profile update with api
  }

  const destroy = () => {
    axios.delete('/auth/delete-my-account')
      .then(response => {
        // TODO: show success message
        logout();
      })
      .catch(error => {
        // TODO: show error message
        console.log('error', error)
      })
  }

  const openDestroyConfirmModal = () => {
    setDestroyConfirmOpened(true);
  }

  const closeDestroyConfirmModal = () => {
    setDestroyConfirmOpened(false);
  }

  return (
    <Container mt={30} mb={30}>
      <h2 style={{marginTop: 0}}>Profile</h2>

      <form onSubmit={form.onSubmit((values: UpdateUserData) => handleUpdate(values))}>
        <TextInput styles={{label: {fontWeight: 'bold'}}} label="Pseudo" placeholder="you" mt="md" {...form.getInputProps('pseudo')} />
        <TextInput styles={{label: {fontWeight: 'bold'}}} disabled={true} label="Email address" placeholder="new@suphotel.dev" mt="md" {...form.getInputProps('email')} />
        <Divider mt={32} />

        <Group>
          <Button fullWidth type='submit' mt="xl">
            Save changes
          </Button>
        </Group>

        <Divider mt={32} />

        <Group mt={32} position="apart">
          <div>
            <Text style={{fontWeight: 'bold'}}>Delete account</Text>
            <Text size="xs">This action cannot be undone.</Text>
          </div>
          <Button variant={"subtle"} color={"red"} onClick={openDestroyConfirmModal}>Delete account...</Button>
        </Group>
      </form>

      <Modal
        opened={destroyConfirmOpened}
        withCloseButton={false}
        onClose={closeDestroyConfirmModal}
        title="Are your sur to want delete your account?"
      >
        <Group position="right">
          <Button variant={"outline"} color={"red"} onClick={closeDestroyConfirmModal}>Cancel</Button>
          <Button onClick={destroy}>Confirm</Button>
        </Group>
      </Modal>
    </Container>
  )
}
import {Role, User} from "../../../types";
import {useForm} from "@mantine/form";
import {useEffect, useState} from "react";
import {Alert, Box, Button, Group, Modal, Select} from "@mantine/core";
import axios, {AxiosError} from "axios";

interface Props {
  opened: boolean;
  close: () => void;
  getUsers: () => void;
  user: User;
  unselectUser: () => void;
}

interface FormValues {
  role: string;
}

export const DashboardUsersForm = ({user, opened, close, getUsers, unselectUser}: Props) => {
  const [error, setError] = useState<AxiosError<any> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const roleData = Object.values(Role).map((role) => ({
    value: role,
    label: role,
  }));

  const form = useForm<FormValues>({
    initialValues: {
      role: '',
    },
  })

  useEffect(() => {
    form.setValues({
      role: user.role,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = (values: FormValues) => {
    setLoading(true);

    axios.put(`/users/${user.id}`, values)
      .then(response => {
        // TODO: show success message
        unselectUser();
        close();
        getUsers();
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }

  return (
    <Modal opened={opened} onClose={close} title={"Update user"}>
      <form onSubmit={form.onSubmit((values: FormValues) => handleSubmit(values))}>
        {(error) && (
          <Alert mb={25} color="red">
            {error.response?.data.message}
          </Alert>
        )}

        <Select
          label="Role"
          placeholder="User"
          data={roleData}
          {...form.getInputProps('role')}
        />

        <Group position={"right"}>
          <Button variant={"default"} type='button' onClick={close} mt="xl">
            Close
          </Button>
          <Button disabled={!form.isValid()} type='submit' mt="xl" loading={loading}>
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  )
}
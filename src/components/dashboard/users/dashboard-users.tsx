import React, {useEffect, useState} from "react";
import {User} from "../../../types";
import axios from "axios";
import {ActionIcon, Alert, Badge, Box, Center, Table} from "@mantine/core";
import {Edit} from "tabler-icons-react";
import {useDisclosure} from "@mantine/hooks";
import {DashboardUsersForm} from "./dashboard-users-form";

interface Props {
  refreshStats: (withLoading: boolean) => void;
}

export const DashboardUsers = ({refreshStats}: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openedUserForm, {open: openUserForm, close: closeUserForm}] = useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getUsers = () => {
    setLoading(true);

    axios.get('/users')
      .then(response => {
        setUsers(response.data);

        refreshStats(false);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  const handleOpenUserForm = (user: User) => {
    setSelectedUser(user);
    openUserForm();
  }

  const unselectUser = () => {
    setSelectedUser(null);
  }

  return (
    <Box mt={30}>
      {!users.length ? (
        <Alert>No users found</Alert>
      ) : (
        <Table>
          <thead>
          <tr>
            <th>Email</th>
            <th>Pseudo</th>
            <th>Role</th>
            <th style={{textAlign: 'center'}}>Actions</th>
          </tr>
          </thead>
          <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.pseudo}</td>
              <td>
                <Badge>
                  {user.role}
                </Badge>
              </td>
              <td align={"center"}>
                <Center>
                  <ActionIcon color={"blue"} onClick={() => handleOpenUserForm(user)}>
                    <Edit size={18}/>
                  </ActionIcon>
                </Center>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      )}

      {selectedUser && (
        <DashboardUsersForm opened={openedUserForm} close={closeUserForm} getUsers={getUsers} user={selectedUser}
                            unselectUser={unselectUser}/>
      )}
    </Box>
  )
}
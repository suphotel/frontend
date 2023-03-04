import {Tabs, Container} from "@mantine/core";
import {useEffect, useState} from "react";
import {BuildingWarehouse, User} from "tabler-icons-react";
import {DashboardStats} from "../components/dashboard/dashboard-stats";
import {DashboardHotels} from "../components/dashboard/dashboard-hotels";
import {Stats} from "../types";
import axios from "axios";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<string>("hotels");
  const [stats, setStates] = useState<Stats>({usersCount: 0, bookingsCount: 0, hotelsCount: 0});
  const [statsLoading, setStatsLoading] = useState<boolean>(false);

  const getStats = () => {
    setStatsLoading(true);

    axios.get('/stats')
      .then(response => {
        setStates(response.data as Stats);
      })
      .catch(error => console.log(error))
      .finally(() => setStatsLoading(false));
  }

  useEffect(() => {
    getStats();
  }, []);

  const handleTabChange = (tab: string) => {
    if (tab === "hotels") {
      setActiveTab(tab)
    } else if (tab === "users") {
      setActiveTab(tab)
    }
  }

  if (statsLoading) {
    return <div>Loading...</div>
  }

  return (
    <Container mt={30} mb={30}>
      <h2 style={{marginTop: 0}}>Dashboard</h2>

      <DashboardStats stats={stats}/>

      <Tabs mt={30} sx={{body: {width: '100%'}}} variant={"default"} orientation="horizontal" value={activeTab}
            onTabChange={handleTabChange}>
        <Tabs.List grow>
          <Tabs.Tab icon={<BuildingWarehouse size={16}/>} value={"hotels"}>
            Hotels
          </Tabs.Tab>
          <Tabs.Tab icon={<User size={16}/>} value={"users"}>
            Users
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={"hotels"}>
          <DashboardHotels/>
        </Tabs.Panel>

        <Tabs.Panel value={"users"}>
          Users
        </Tabs.Panel>
      </Tabs>
    </Container>
  )
}
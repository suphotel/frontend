import {Tabs, Container} from "@mantine/core";
import {useEffect, useState} from "react";
import {BuildingWarehouse, User} from "tabler-icons-react";
import {DashboardStats} from "../components/dashboard/dashboard-stats";
import {DashboardHotels} from "../components/dashboard/hotels/dashboard-hotels";
import {Stats} from "../types";
import axios from "axios";
import {DashboardUsers} from "../components/dashboard/users/dashboard-users";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<string>("hotels");
  const [stats, setStates] = useState<Stats>({usersCount: 0, bookingsCount: 0, hotelsCount: 0});
  const [statsLoading, setStatsLoading] = useState<boolean>(false);

  const [hotelsRefreshKey, setHotelsRefreshKey] = useState<number>(0);
  const [usersRefreshKey, setUsersRefreshKey] = useState<number>(0);

  const getStats = (withLoading: boolean = true) => {
    setStatsLoading(withLoading);

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
      setActiveTab(tab);
      setHotelsRefreshKey(hotelsRefreshKey + 1);
    } else if (tab === "users") {
      setActiveTab(tab);
      setUsersRefreshKey(usersRefreshKey + 1);
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
          <DashboardHotels key={hotelsRefreshKey} refreshStats={getStats}/>
        </Tabs.Panel>

        <Tabs.Panel value={"users"}>
          <DashboardUsers key={usersRefreshKey} refreshStats={getStats} />
        </Tabs.Panel>
      </Tabs>
    </Container>
  )
}
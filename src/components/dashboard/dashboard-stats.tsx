import { createStyles, Group, Paper, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
import { useEffect, useState } from 'react';
import {BrandBooking, BuildingWarehouse, Users} from 'tabler-icons-react';
import {Stats} from "../../types";

const useStyles = createStyles((theme) => ({
  root: {
    // @ts-ignore
    padding: theme.spacing.xl * 1.5,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface Props {
  stats: Stats;
}

export const DashboardStats = ({ stats }: Props) => {
  const { classes, theme} = useStyles();
  const [statsArr, setStatsArr] = useState<any[]>([]);

  useEffect(() => {
    setStatsArr([
      {title: 'Number of users', icon: <Users size={28} />, value: stats.usersCount},
      {title: 'Number of hotels', icon: <BuildingWarehouse size={28} />, value: stats.hotelsCount},
      {title: 'Number of bookings', icon: <BrandBooking size={28} />, value: stats.bookingsCount},
    ]);
  }, [stats])

  return (
    <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {statsArr.map((stat, idx) => (
        <div key={idx}>
          <Paper withBorder p="md" radius="md">
            <Group position="apart">
              <div>
                <Text
                  color="dimmed"
                  transform="uppercase"
                  weight={700}
                  size="xs"
                  className={classes.label}
                >
                  {stat.title}
                </Text>
                <Text weight={700} size="xl">
                  {stat.value}
                </Text>
              </div>
              <ThemeIcon
                color="gray"
                variant="light"
                sx={{ color: theme.colors.blue[8]}}
                size={38}
                radius="md"
              >
                {stat.icon}
              </ThemeIcon>
            </Group>
          </Paper>
        </div>
      ))}
    </SimpleGrid>
  )
}
import * as React from "react";
import Box from "@mui/joy/Box";
import Avatar from "@mui/joy/Avatar";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import { OrderClass } from "@/models/schema/Order";
import { getOrders } from "@/app/order/create/_actions";
import User from "@peterkapena/user_auth/src/models/User";
import { useRouter } from "next/navigation";

type OrderListProps = {
  userId: string;
};

export default function OrderList({ userId }: OrderListProps) {
  const { push } = useRouter();
  const [data, setData] = React.useState<{ order: OrderClass; user: User }[]>();

  async function fetchOrders() {
    const strOrders = await getOrders(userId);
    const orders: { order: OrderClass; user: User }[] = JSON.parse(strOrders);
    setData(orders);
  }
  React.useEffect(() => {
    fetchOrders();
  }, []);
  console.log(data);
  return (
    <Box sx={{ display: { xs: "block", sm: "block" } }}>
      {data &&
        data.map((datum) => (
          <List
            key={datum.order._id?.toString()}
            size="sm"
            sx={{
              "--ListItem-paddingX": 0,
            }}
          >
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <ListItemContent
                sx={{ display: "flex", gap: 2, alignItems: "start" }}
              >
                <ListItemDecorator>
                  <Avatar size="sm"></Avatar>
                </ListItemDecorator>
                <div>
                  <Typography fontWeight={600} gutterBottom>
                    {datum.order.literature}
                  </Typography>
                  <Typography level="body-xs" gutterBottom>
                    {datum.user.username} | {datum.user.email}
                  </Typography>
                  <Typography level="body-xs" gutterBottom></Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 0.5,
                      mb: 1,
                    }}
                  >
                    <Typography level="body-xs">
                      {datum.order.when_created &&
                        new Date(
                          datum.order.when_created?.toString()
                        ).toLocaleString()}
                    </Typography>
                    <Typography level="body-xs">&bull;</Typography>
                    <Typography level="body-xs">
                      {datum.order._id?.toString()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Link
                      level="body-sm"
                      component="button"
                      onClick={() =>
                        push("order/edit/" + (datum.order._id || ""))
                      }
                    >
                      view
                    </Link>
                  </Box>
                </div>
              </ListItemContent>
            </ListItem>
            <ListDivider />
          </List>
        ))}
    </Box>
  );
}

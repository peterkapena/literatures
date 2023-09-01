import List from "@mui/joy/List";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Box, Grid } from "@mui/joy";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { OrderClass } from "@/models/schema/Order";
import { useRouter } from "next/navigation";
import { _delete, getOrders } from "@/app/order/create/_actions";
import AlertDialogModal from "./Alert";
import OrderCard from "./OrderCard";

export async function generateStaticParams() {
  const strOrders = await getOrders();
  const orders: OrderClass[] = JSON.parse(strOrders);

  return orders.map((o) => ({
    id: o._id,
  }));
}

export default function ExampleIOSList() {
  const { data: session } = useSession();
  const [data, setData] = useState<OrderClass[]>();
  const { push } = useRouter();
  const [orderIdToDelete, setOrderIdToDelete] = useState("");

  async function fetchOrders() {
    const strOrders = await getOrders((session as any)?.id);
    const orders: OrderClass[] = JSON.parse(strOrders);
    setData(orders);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Sheet variant="soft" sx={{ p: 2, borderRadius: "sm" }}>
      {orderIdToDelete && (
        <AlertDialogModal
          onYes={() => {
            _delete(orderIdToDelete).then(async () => {
              fetchOrders();
              setOrderIdToDelete("");
            });
          }}
          onClose={() => {
            setOrderIdToDelete("");
            // console.log("close");
          }}
          message="Are you sure you want to delete?"
        ></AlertDialogModal>
      )}
      <Typography
        level="h3"
        fontSize="xl2"
        fontWeight="xl"
        id="ios-example-demo"
        mb={3}
      >
        Orders
      </Typography>
      <List
        aria-labelledby="ios-example-demo"
        sx={(theme) => ({
          "& ul": {
            "--List-gap": "0px",
            bgcolor: "background.surface",
            '& > li:first-child > [role="button"]': {
              borderTopRightRadius: "var(--List-radius)",
              borderTopLeftRadius: "var(--List-radius)",
            },
            '& > li:last-child > [role="button"]': {
              borderBottomRightRadius: "var(--List-radius)",
              borderBottomLeftRadius: "var(--List-radius)",
            },
          },
          "--List-radius": "5px",
          "--List-gap": "1rem",
          "--ListDivider-gap": "0px",
          "--ListItem-paddingY": "0.1rem",
          // override global variant tokens
          "--joy-palette-neutral-plainHoverBg": "rgba(0 0 0 / 0.08)",
          "--joy-palette-neutral-plainActiveBg": "rgba(0 0 0 / 0.12)",
          [theme.getColorSchemeSelector("light")]: {
            "--joy-palette-divider": "rgba(0 0 0 / 0.08)",
          },
          [theme.getColorSchemeSelector("dark")]: {
            "--joy-palette-neutral-plainHoverBg": "rgba(255 255 255 / 0.1)",
            "--joy-palette-neutral-plainActiveBg": "rgba(255 255 255 / 0.16)",
          },
        })}
      >
        {data && data?.length > 0 ? (
          <>
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ flexGrow: 1 }}>
              {data.map((d, i) => (
                <Grid key={i} xs={12} sm={6} md={4} lg={3}>
                  <OrderCard
                    order={d}
                    onDelete={() => {
                      if (d._id) setOrderIdToDelete(d._id?.toString());
                    }}
                    onEdit={() => {
                      push("order/edit/" + d._id?.toString());
                    }}
                  ></OrderCard>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Box>
            <Typography level="body-lg">No orders done yet!</Typography>
            <Typography level="title-sm">
              Use the button above to submit one!
            </Typography>
          </Box>
        )}
      </List>
    </Sheet>
  );
}

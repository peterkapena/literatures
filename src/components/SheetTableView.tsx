import List from "@mui/joy/List";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Button } from "@mui/joy";
import { Box } from "@mui/joy";
import { SetStateAction } from "react";
import { OrderClass } from "@/models/schema/Order";
import { _delete } from "@/app/order/create/_actions";
import AlertDialogModal from "./Alert";
import OrderCard from "./OrderCard";
import { Delete, Info } from "@mui/icons-material";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context";


export function SheetTableView(orderIdToDelete: string, fetchOrders: () => Promise<void>, setOrderIdToDelete: { (value: SetStateAction<string>): void; (arg0: string | String): void; }, data: OrderClass[] | undefined, push: { (href: string, options?: NavigateOptions | undefined): void; (arg0: string): void; }) {
  return <Sheet variant="soft" sx={{ p: 2, borderRadius: "sm" }}>
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
        "--List-radius": "2px",
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
      {data && data.length > 0 ? (
        <>
          {data.map((order, index) => (
            <Box key={order._id}>
              <OrderCard
                order={order}
                onDelete={() => setOrderIdToDelete(order._id || "")} />

              <Button
                onClick={() => {
                  setOrderIdToDelete(order._id || "");
                }}
                variant="outlined"
                color="danger"
                size="sm"
                startDecorator={<Delete color="action" />}
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  push("order/edit/" + (order._id || ""));
                }}
                variant="solid"
                size="sm"
                color="success"
                startDecorator={<Info />}
              >
                Edit
              </Button>
              {index !== data.length - 1 && <Box sx={{ height: "1rem" }} />}
            </Box>
          ))}
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
  </Sheet>;
}

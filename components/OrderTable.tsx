import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Delete } from "@mui/icons-material";
import { Box, IconButton } from "@mui/joy";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { OrderClass } from "@/models/schema/Order";
import { useRouter } from "next/navigation";
import { getOrders } from "@/app/order/create/_actions";

export async function generateStaticParams() {
  const posts = await fetch("https://.../posts").then((res) => res.json());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function ExampleIOSList() {
  const { data: session } = useSession();
  const [data, setData] = useState<OrderClass[]>();
  const router = useRouter();

  useEffect(() => {
    (async function () {
      const strOrders = await getOrders(session?.id);
      const orders: OrderClass[] = JSON.parse(strOrders);
      setData(orders);
      // console.log(session?.id);
    })();
  }, []);

  return (
    <Sheet variant="soft" sx={{ p: 2, borderRadius: "sm" }}>
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
        {data ? (
          <>
            {data.map((d, i) => (
              <ListItem nested key={i}>
                <ListItemButton
                  sx={{ borderRadius: 5 }}
                  onClick={() => {
                    router.push("order/edit/" + d._id?.toString());
                  }}
                >
                  <List
                    aria-label="Personal info"
                    sx={{ "--ListItemDecorator-size": "72px" }}
                  >
                    <ListItem
                      sx={{ py: 1 }}
                      endAction={
                        <IconButton
                          aria-label="Delete"
                          size="sm"
                          color="danger"
                        >
                          <Delete />
                        </IconButton>
                      }
                    >
                      <div>
                        <Typography fontSize="xl">{d.literature}</Typography>
                        {d.when_created?.toString() && (
                          <Typography fontSize="xs">
                            {new Date(
                              d.when_created?.toString()
                            ).toLocaleString()}
                          </Typography>
                        )}
                      </div>
                    </ListItem>

                    <ListDivider inset="startContent" />
                    {d.notes && (
                      <ListItem>
                        <ListItemContent>{d.notes}</ListItemContent>
                      </ListItem>
                    )}
                  </List>
                </ListItemButton>
              </ListItem>
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
    </Sheet>
  );
}

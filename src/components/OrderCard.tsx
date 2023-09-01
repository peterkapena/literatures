import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Typography from "@mui/joy/Typography";
import { OrderClass } from "@/models/schema/Order";
import { Delete, Info } from "@mui/icons-material";

type OrderCardProps = {
  order: OrderClass;
  onDelete: () => void;
  onEdit: () => void;
};
export default function OrderCard({ order, onDelete, onEdit }: OrderCardProps) {
  return (
    <Card variant="plain">
      <Box sx={{ width: "100%" }}>
        <Typography
          level="title-lg"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "4",
            WebkitBoxOrient: "vertical",
          }}
        >
          {order.literature}
        </Typography>
        <Typography level="body-sm">
          {order.when_created &&
            new Date(order.when_created?.toString()).toLocaleString()}
        </Typography>
      </Box>

      <CardContent>
        <Box sx={{ height: "150px", width: "100%" }}>
          <Typography
            level="body-md"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "4",
              WebkitBoxOrient: "vertical",
            }}
          >
            {order.notes}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography level="body-xs">Quantity:</Typography>
            <Typography fontSize="lg" fontWeight="lg">
              {+order.quantity}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions
        buttonFlex="0 1 120px"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button
          onClick={onDelete}
          variant="outlined"
          color="danger"
          size="sm"
          startDecorator={<Delete color="action" />}
        ></Button>
        <Button
          onClick={onEdit}
          variant="solid"
          size="sm"
          color="success"
          startDecorator={<Info />}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}

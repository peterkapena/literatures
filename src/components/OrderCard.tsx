import * as React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { OrderClass } from "@/models/schema/Order";



type OrderCardProps = {
  order: OrderClass;
  onDelete: () => void;
  onEdit: () => void;
};
export default function OrderCard({ order}: OrderCardProps) {
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
        <Box sx={{ height: "100px", width: "100%" }}>
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
    </Card>
  );
}

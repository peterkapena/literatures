import { useEffect, useState } from "react";
import { OrderClass } from "@/models/schema/Order";
import { useRouter } from "next/navigation";
import { getOrders } from "@/app/order/create/_actions";
import { SheetTableView } from "./SheetTableView";

export async function generateStaticParams() {
  const strOrders = await getOrders();
  const orders: OrderClass[] = JSON.parse(strOrders);

  return orders.map((o) => ({
    id: o._id,
  }));
}

type OrderTableProps = {
  userId: string;
};
export default function OrderTable({ userId }: OrderTableProps) {
  const [data, setData] = useState<OrderClass[]>();
  const { push } = useRouter();
  const [orderIdToDelete, setOrderIdToDelete] = useState("");

  async function fetchOrders() {
    const strOrders = await getOrders(userId);
    const orders: OrderClass[] = JSON.parse(strOrders);
    setData(orders);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return SheetTableView(
    orderIdToDelete,
    fetchOrders,
    setOrderIdToDelete,
    data,
    push
  );
}

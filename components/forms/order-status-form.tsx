"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { updateOrderStatus } from "@/lib/actions/order-actions";
import { OrderStatusFormValues, orderStatusSchema } from "@/validations/order";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface OrderStatusFormProps {
  orderId: string | undefined;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  orderTimelineStatus: string[];
}

const statusLists = [
  { label: "Processing", value: "Processing" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled", value: "Cancelled" },
];

const OrderStatusForm = ({
  orderId,
  status,
  orderTimelineStatus,
}: OrderStatusFormProps) => {
  console.log("orderId", orderId);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<OrderStatusFormValues>({
    resolver: zodResolver(orderStatusSchema),
    defaultValues: orderId
      ? {
          status: status,
        }
      : {
          status: undefined,
        },
  });

  const onSubmit = async (data: OrderStatusFormValues) => {
    console.log("Form submitted", data);
    // Handle form submission logic here
    setIsLoading(true);
    try {
      if (orderId) {
        // check if the status is already in the order timeline
        const isAlreadyDone = orderTimelineStatus?.includes(data.status);
        if (isAlreadyDone) {
          toast.error("Status already in timeline");
          return;
        }
        // Update existing book
        const result = await updateOrderStatus(orderId, data.status);
        if (result.success) {
          toast.success("Oder Status Updated successfully");
        } else {
          toast.error(result.error?.message || "Failed to update book");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center gap-2 w-full">
          <span className="text-sm font-medium">Status:</span>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusLists?.map((statusItem) => {
                      const isAlreadyDone = statusItem.value === status;
                      return (
                        <SelectItem
                          disabled={isAlreadyDone}
                          key={statusItem.value}
                          value={statusItem.value}
                        >
                          {statusItem?.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit" size="sm">
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default OrderStatusForm;

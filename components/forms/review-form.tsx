"use client";
import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { bookReviewSchema } from "@/validations/review";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Rating } from "../ui/rating";
import { useAuth } from "@clerk/nextjs";
import { createBookReview } from "@/lib/actions/review-actions";
import { usePathname } from "next/navigation";

interface BookReviewsFormProps {
  bookId: string | undefined;
}

const ReviewForm = ({ bookId }: BookReviewsFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  const { userId } = useAuth();

  const form = useForm<z.infer<typeof bookReviewSchema>>({
    resolver: zodResolver(bookReviewSchema),
    defaultValues: {
      rating: 0,
      content: "",
    },
  });

  const characterCount = form.watch("content")?.length || 0;

  async function onSubmit(values: z.infer<typeof bookReviewSchema>) {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await createBookReview({
        ...values,
        bookId: bookId,
        userId: userId as string,
        path: pathname,
      });

      if (response.success) {
        console.log(values);
        toast.success("Review submitted successfully!");
      } else {
        toast.error(response.error?.message || "Failed to create book review");
      }

      form.reset();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the review");
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  py-10">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Rating value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                How would you rate your overall experience?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us what you liked or didn't like about our product..."
                  className="resize-none min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription className="flex justify-between">
                <span>Share your honest opinion about your experience</span>
                <span
                  className={`${characterCount > 450 ? "text-amber-500" : ""} ${characterCount > 500 ? "text-red-500" : ""}`}
                >
                  {characterCount}/500
                </span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </Form>
  );
};
export default ReviewForm;

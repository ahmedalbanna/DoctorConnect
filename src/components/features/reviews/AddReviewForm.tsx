"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

const reviewFormSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  comment: z.string().min(10, { message: "Comment must be at least 10 characters." }).max(500, { message: "Comment cannot exceed 500 characters." }),
});

interface AddReviewFormProps {
  doctorId: string;
}

export function AddReviewForm({ doctorId }: AddReviewFormProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  function onSubmit(values: z.infer<typeof reviewFormSchema>) {
    // Simulate API call
    console.log({ ...values, doctorId });
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
    form.reset();
    // In a real app, you would likely re-fetch reviews or update the local state
  }

  const currentRating = form.watch("rating");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Rating</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-7 h-7 cursor-pointer transition-colors
                        ${(hoverRating || currentRating) >= star ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground opacity-50'}
                      `}
                      onClick={() => form.setValue("rating", star, { shouldValidate: true })}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your experience with this doctor..."
                  className="resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
          Submit Review
        </Button>
      </form>
    </Form>
  );
}

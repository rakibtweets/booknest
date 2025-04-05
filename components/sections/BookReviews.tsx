"use client";

import type React from "react";

import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      avatar: "https://placehold.co/40x40",
      initials: "SJ",
    },
    rating: 5,
    date: "March 15, 2023",
    title: "Absolutely life-changing",
    content:
      "This book completely changed my perspective on life. The concept of the library between life and death is so thought-provoking. I couldn't put it down and finished it in one sitting.",
    helpful: 42,
    verified: true,
  },
  {
    id: "2",
    user: {
      name: "Michael Chen",
      avatar: "https://placehold.co/40x40",
      initials: "MC",
    },
    rating: 4,
    date: "February 3, 2023",
    title: "Beautifully written",
    content:
      "Matt Haig has a way with words that makes even the most fantastical concepts feel real and relatable. While I found some parts a bit predictable, the overall message of the book is powerful.",
    helpful: 18,
    verified: true,
  },
  {
    id: "3",
    user: {
      name: "Emma Wilson",
      avatar: "https://placehold.co/40x40",
      initials: "EW",
    },
    rating: 3,
    date: "January 20, 2023",
    title: "Good but not great",
    content:
      "The premise is interesting, but I felt the execution could have been better. Some of the alternate lives felt rushed and underdeveloped. Still, it was an enjoyable read with some meaningful insights.",
    helpful: 7,
    verified: false,
  },
];

interface BookReviewsProps {
  bookId: string;
}

export default function BookReviews({ bookId }: BookReviewsProps) {
  const [reviews] = useState(mockReviews);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the review to an API
    console.log({ bookId, rating, review: newReview });
    setNewReview("");
    setRating(0);
  };

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

        {reviews.map((review) => (
          <div key={review.id} className="mb-6">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={review.user.avatar} alt={review.user.name} />
                <AvatarFallback>{review.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="font-medium">{review.user.name}</h4>
                  {review.verified && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 fill-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {review.date}
                  </span>
                </div>
                <h5 className="font-medium mt-2">{review.title}</h5>
                <p className="text-sm mt-1">{review.content}</p>
                <div className="flex items-center mt-2">
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </div>
            <Separator className="mt-4" />
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        <form onSubmit={handleSubmitReview}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="review" className="block text-sm font-medium mb-2">
              Your Review
            </label>
            <Textarea
              id="review"
              placeholder="Share your thoughts about this book..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              rows={4}
            />
          </div>
          <Button type="submit" disabled={rating === 0 || !newReview.trim()}>
            Submit Review
          </Button>
        </form>
      </div>
    </div>
  );
}

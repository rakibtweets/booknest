import { BookOpen, Users, Award, Globe } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About BookNest</h1>
          <p className="text-xl text-muted-foreground">
            Your premier destination for books, knowledge, and literary
            adventures
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <BookOpen className="w-8 h-8 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="text-muted-foreground">
                  To make quality books accessible to everyone, fostering a love
                  for reading and learning across all communities.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Users className="w-8 h-8 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Our Community</h3>
                <p className="text-muted-foreground">
                  Join millions of book lovers who trust BookNest for their
                  reading needs, from bestsellers to rare finds.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Award className="w-8 h-8 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Quality Guarantee
                </h3>
                <p className="text-muted-foreground">
                  Every book is carefully curated and quality-checked to ensure
                  you receive exactly what you expect.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Globe className="w-8 h-8 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                <p className="text-muted-foreground">
                  We ship worldwide and support multiple languages, making
                  literature accessible across borders.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Founded in 2020, BookNest began as a small independent bookstore
            with a big dream: to connect readers with the perfect books for
            their journey. What started as a local initiative has grown into a
            global platform serving book enthusiasts worldwide.
          </p>
          <p className="text-muted-foreground">
            Today, we partner with publishers, authors, and distributors
            globally to offer an extensive catalog of books across all genres,
            languages, and formats. Our commitment to customer satisfaction and
            literary excellence remains at the heart of everything we do.
          </p>
        </div>

        <div className="text-center">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

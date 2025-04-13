"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MultiSelect } from "@/components/ui/multi-select";
import { createAuthor, updateAuthor } from "@/lib/actions/author-actions";
import { toast } from "sonner";
import { AuthorFormValues, authorSchema } from "@/validations/author";

interface AuthorFormProps {
  initialData?: AuthorFormValues & { _id?: string };
  genres: string[];
}

export function AuthorForm({ initialData, genres }: AuthorFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [awards, setAwards] = useState<string[]>(initialData?.awards || []);
  const [newAward, setNewAward] = useState("");

  const form = useForm<AuthorFormValues>({
    resolver: zodResolver(authorSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          awards: awards,
        }
      : {
          name: "",
          bio: "",
          image: "",
          coverImage: "",
          birthDate: "",
          deathDate: "",
          birthPlace: "",
          website: "",
          email: "",
          genres: [],
          awards: [],
          featured: false,
        },
  });

  const onSubmit = async (data: AuthorFormValues) => {
    setIsLoading(true);
    try {
      // Include awards from state
      const formData = {
        ...data,
        awards,
      };

      if (initialData?._id) {
        // Update existing author
        const result = await updateAuthor({
          _id: initialData._id,
          ...formData,
        });
        if (result.success) {
          toast.success("The author has been updated successfully.");
          router.push("/admin/authors");
        } else {
          toast.error(result.error?.message || "Failed to update author");
        }
      } else {
        // Create new author
        const result = await createAuthor(formData);
        if (result.success) {
          toast.success("The author has been created successfully.");
          router.push("/admin/authors");
        } else {
          toast.error(result.error?.message || "Failed to create author");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const addAward = () => {
    if (newAward.trim() && !awards.includes(newAward.trim())) {
      setAwards([...awards, newAward.trim()]);
      setNewAward("");
    }
  };

  const removeAward = (award: string) => {
    setAwards(awards.filter((a) => a !== award));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Author name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Paste image URL here" {...field} />
                </FormControl>
                <FormDescription>
                  URL for the author's profile picture
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image URL (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Paste cover image URL here" {...field} />
                </FormControl>
                <FormDescription>
                  URL for the author's cover/banner image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth Date (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="dd/mm/year" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deathDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Death Date (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="dd/mm/year" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthPlace"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth Place (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="New York, USA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormDescription>
                  Author's personal or official website
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="author@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genres"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genres</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={genres.map((genre) => ({
                      label: genre,
                      value: genre,
                    }))}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select genres"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Author biography"
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Awards (Optional)</FormLabel>
          <div className="flex flex-wrap gap-2 mt-2 mb-4">
            {awards.map((award) => (
              <Badge key={award} variant="secondary" className="gap-1">
                {award}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeAward(award)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {award}</span>
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add award"
              value={newAward}
              onChange={(e) => setNewAward(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addAward();
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addAward}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Featured</FormLabel>
                <FormDescription>
                  This author will appear in featured sections
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/authors")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button className="cursor-pointer" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Update Author" : "Create Author"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

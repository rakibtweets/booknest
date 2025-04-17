"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { publisherSchema, PublisherFormValues } from "@/validations/publisher";
import {
  createPublisher,
  updatePublisher,
} from "@/lib/actions/publisher-actions";
import { toast } from "sonner";
import { IPublisher } from "@/database/publisher.model";

interface PublisherFormProps {
  initialData?: IPublisher;
}

export function PublisherForm({ initialData }: PublisherFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imprints, setImprints] = useState<string[]>(
    initialData?.imprints || []
  );
  const [newImprint, setNewImprint] = useState("");

  const form = useForm<PublisherFormValues>({
    resolver: zodResolver(publisherSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          imprints: imprints,
        }
      : {
          name: "",
          logo: "",
          description: "",
          longDescription: "",
          founded: 0,
          headquarters: "",
          website: "",
          email: "",
          phone: "",
          imprints: [],
          featured: false,
        },
  });

  const onSubmit = async (data: PublisherFormValues) => {
    setIsLoading(true);
    try {
      // Include imprints from state
      const formData = {
        ...data,
        imprints,
      };

      if (initialData?._id) {
        // Update existing publisher
        const result = await updatePublisher({
          _id: initialData._id,
          ...formData,
        });
        if (result.success) {
          toast.success("The publisher has been updated successfully.");
          router.push("/admin/publishers");
        } else {
          toast.error(result.error?.message || "Failed to update publisher");
        }
      } else {
        // Create new publisher
        const result = await createPublisher(formData);
        if (result.success) {
          toast.success("The publisher has been created successfully.");
          router.push("/admin/publishers");
        } else {
          toast.error(result.error?.message || "Failed to create publisher");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const addImprint = () => {
    if (newImprint.trim() && !imprints.includes(newImprint.trim())) {
      setImprints([...imprints, newImprint.trim()]);
      setNewImprint("");
    }
  };

  const removeImprint = (imprint: string) => {
    setImprints(imprints.filter((i) => i !== imprint));
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
                  <Input placeholder="Publisher name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo URL</FormLabel>
                <FormControl>
                  <Input placeholder="paste logo url here" {...field} />
                </FormControl>
                <FormDescription>URL for the publisher's logo</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="founded"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Founded Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter founded year"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseInt(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="headquarters"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Headquarters</FormLabel>
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
                  <Input placeholder="contact@publisher.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (123) 456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Short publisher description"
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A brief description of the publisher (displayed in listings)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="longDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Long Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed publisher description"
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A more detailed description (displayed on the publisher's page)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Imprints (Optional)</FormLabel>
          <div className="flex flex-wrap gap-2 mt-2 mb-4">
            {imprints.map((imprint) => (
              <Badge key={imprint} variant="secondary" className="gap-1">
                {imprint}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeImprint(imprint)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {imprint}</span>
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add imprint"
              value={newImprint}
              onChange={(e) => setNewImprint(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addImprint();
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addImprint}
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
                  This publisher will appear in featured sections
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/publishers")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button className="cursor-pointer" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Update Publisher" : "Create Publisher"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

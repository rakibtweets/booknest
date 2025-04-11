import { createUser, deleteUser, updateUser } from "@/lib/actions/user-actions";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    // Handle to event
    if (eventType === "user.created") {
      // get user data
      const { id, email_addresses, image_url, first_name, last_name } =
        evt.data;
      console.log("user.created", {
        id,
        email_addresses,
        image_url,
        first_name,
        last_name,
      });

      // create a server action to create a user in the database

      const mongoUser = await createUser({
        clerkId: id,
        name: `${first_name} ${last_name ? ` ${last_name}` : ""}`,
        email: email_addresses[0].email_address,
        picture: image_url,
        roles: ["user"],
      });
      console.log("mongodb", mongoUser);

      return NextResponse.json({ messsage: "OK", user: mongoUser });
    }

    if (eventType === "user.updated") {
      // get user data
      const { id, email_addresses, image_url, first_name, last_name } =
        evt.data;
      console.log("user.created", {
        id,
        email_addresses,
        image_url,
        first_name,
        last_name,
      });

      // create a server action to create a user in the database

      const mongoUser = await updateUser({
        clerkId: id,
        updateData: {
          name: `${first_name} ${last_name ? ` ${last_name}` : ""}`,
          email: email_addresses[0].email_address,
          picture: image_url,
        },
      });

      return NextResponse.json({ messsage: "OK", user: mongoUser });
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data;
      const deletedUser = await deleteUser({ clerkId: id! });

      return NextResponse.json({ messsage: "OK", user: deletedUser });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}

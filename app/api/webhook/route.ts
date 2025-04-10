/* eslint-disable camelcase */

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user-actions";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  // todo: add webhook secret to .env.local
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const eventType = evt.type;
  console.log("POST  eventType:", { eventType });

  // Handle to event
  if (eventType === "user.created") {
    // get user data
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;

    // create a server action to create a user in the database

    const mongoUser = await createUser({
      clerkId: id,
      name: `${first_name} ${last_name ? ` ${last_name}` : ""}`,
      email: email_addresses[0].email_address,
      picture: image_url,
      roles: ["user"],
    });

    return NextResponse.json({ messsage: "OK", user: mongoUser });
  }

  if (eventType === "user.updated") {
    // get user data
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;

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

  return NextResponse.json({ messsage: "OK" });
}

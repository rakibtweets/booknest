import { clerkClient } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextResponse } from "next/server";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user-actions";
import { Roles } from "@/types/global";

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
    // console.log("Webhook payload:", evt.data);
    // Handle to event
    if (eventType === "user.created") {
      const client = await clerkClient();
      // get user data
      const { id, email_addresses, image_url, first_name, last_name } =
        evt.data;

      const isAdminEmail =
        email_addresses[0].email_address === process.env.ADMIN_EMAIL;

      // create a server action to create a user in the database

      const { success, data } = await createUser({
        clerkId: id,
        name: `${first_name} ${last_name ? ` ${last_name}` : ""}`,
        email: email_addresses[0].email_address,
        picture: image_url,
        roles: isAdminEmail ? ["admin", "user"] : ["user"],
      });

      if (success && data?.user) {
        // ✅ Only update Clerk if metadata differs
        const existingRoles = evt.data.public_metadata?.roles || [];
        const newRoles: Roles[] = isAdminEmail ? ["admin", "user"] : ["user"];
        if (JSON.stringify(existingRoles) !== JSON.stringify(newRoles)) {
          await client.users.updateUser(data.user.clerkId, {
            publicMetadata: {
              roles: newRoles,
            },
          });
        }
      }

      return NextResponse.json({ messsage: "OK", user: data?.user });
    }

    if (eventType === "user.updated") {
      const client = await clerkClient();
      // get user data
      const { id, email_addresses, image_url, first_name, last_name } =
        evt.data;
      const isAdminEmail =
        email_addresses[0].email_address === process.env.ADMIN_EMAIL;

      // create a server action to create a user in the database

      const { success, data } = await updateUser({
        clerkId: id,
        updateData: {
          name: `${first_name} ${last_name ? ` ${last_name}` : ""}`,
          email: email_addresses[0].email_address,
          picture: image_url,
          roles: isAdminEmail ? ["admin", "user"] : ["user"],
        },
      });

      if (success && data?.user) {
        // ✅ Prevent infinite loop by checking before updating Clerk
        const existingRoles = evt.data.public_metadata?.roles || [];
        const newRoles: Roles[] = isAdminEmail ? ["admin", "user"] : ["user"];
        if (JSON.stringify(existingRoles) !== JSON.stringify(newRoles)) {
          await client.users.updateUser(data.user.clerkId, {
            publicMetadata: { roles: newRoles },
          });
        }
      }

      return NextResponse.json({ messsage: "OK", user: data?.user });
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

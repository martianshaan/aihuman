/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from "@/server/db";

export const POST = async (req: Request) => {
    const { data } = await req.json();

    console.log('clerk webhook received', data);
    
    const email = data?.email_addresses?.[0]?.email_address || null;
    const firstName = data?.first_name || null;
    const lastName = data?.last_name || null;
    const imageUrl = data?.image_url || null;
    const id = data?.id || null;

    if (!id || !email) {
        console.error("Missing required fields: id or email");
        return new Response('Invalid data', { status: 400 });
    }

    try {
        await db.user.upsert({
            where: { id },
            update: { email, firstName, lastName, imageUrl },
            create: { id, email, firstName, lastName, imageUrl },
        });
        console.log('user created');
        return new Response('webhook received', { status: 200 });
    } catch (error) {
        console.error("Error upserting user:", error);
        return new Response('Database error', { status: 500 });
    }
};

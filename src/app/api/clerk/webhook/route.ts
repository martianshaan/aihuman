/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { db } from "@/server/db";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const POST = async (req: Request) => {
    const { data } = await req.json();

    console.log('clerk webhook received', data);
    const email = data.email_addresses[0].email_address;
    const firstName = data.first_name;
    const lastName = data.last_name;
    const imageUrl = data.image_url;
    const id = data.id

    await db.user.create({
        data: {
            id: id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            imageUrl: imageUrl
        }
    })

    return new Response('webhook received', { status: 200 })
}
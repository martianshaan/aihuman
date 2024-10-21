import { getAccountDetails, getAurinkoToken } from "@/lib/aurinko";
import { auth } from "@clerk/nextjs/server"
import { type NextRequest, NextResponse } from "next/server";
import { db } from '@/server/db';

export const GET = async (req: NextRequest) => {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    console.log('userid', userId);
    console.log('users', await db.user.findMany());

    const existingUser = await db.user.findUnique({ where: { id: userId } });
    if (!existingUser) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const params = req.nextUrl.searchParams;
    const status = params.get('status');

    if (status != 'success') return NextResponse.json({ message: 'Failed to link account' }, { status: 400 });

    const code = params.get('code');
    if (!code) return NextResponse.json({ message: 'No code provided' }, { status: 400 });

    const token = await getAurinkoToken(code);
    if (!token) return NextResponse.json({ message: "Failed to exchange code for access token" }, { status: 400 });

    const accountDetails = await getAccountDetails(token.accessToken);
    console.log('acdetails', accountDetails);




    try {
        await db.account.upsert({
            where: { id: token.accountId.toString() },
            create: {
                id: token.accountId.toString(),
                userId,
                accessToken: token.accessToken,
                emailAddress: accountDetails.email,
                name: accountDetails.name,
            },
            update: {
                accessToken: token.accessToken,
            },
        });
    } catch (error) {
        console.error('Error updating account:', error);
        return NextResponse.json({ message: 'Database error' }, { status: 500 });
    }

    return NextResponse.redirect(new URL('/mail', req.url));
};

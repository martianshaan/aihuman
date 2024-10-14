'use server'

import { auth } from '@clerk/nextjs/server'
import React from 'react'

const getAurinkoAuthUrl = async (serviceType: 'Google' | 'Office365') => {
    const { userId } = await auth()

    if (!userId) throw new Error('Unauthorized');

    // const params = new URLSearchParams({
    //     clientId: process.env.AURINKO_CLIENT_ID as string,
    //     serviceType,
    //     scope: 'Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All ',
    //     responseType: 'code',
    //     returnUrl: `${process.env.NEXT_PUBLIC_URL}/api/aurinko/callback`,
    // })
    const params = new URLSearchParams({
        clientId: process.env.AURINKO_CLIENT_ID as string,
        serviceType,
        scopes: 'Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All',
        responseType: 'code',
        returnUrl: `${process.env.NEXT_PUBLIC_URL}/api/aurinko/callback`,
    });

    console.log('link:')
    console.log(`https://api.aurinko.io/v1/auth/authorize?${params.toString()}`);
    return `https://api.aurinko.io/v1/auth/authorize?${params.toString()}`;
}

export default getAurinkoAuthUrl
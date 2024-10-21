
import { Button } from "@/components/ui/button";
import { LinkAccountButton } from '../components/linkAccountButton'
import { auth } from "@clerk/nextjs/server";
import { UserDetails } from "@/components/user-details";
import { UserButton } from "@clerk/nextjs";


export default async function Home() {
  const info = auth();
  console.log('info', info);

  return (
    <div>
      <h1 className="text-red-400">Hello SHAAN</h1>
      <Button>Hello</Button>
      <LinkAccountButton />
      <UserButton />
      <UserDetails />
    </div>
  );
}

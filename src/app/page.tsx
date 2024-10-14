import { Button } from "@/components/ui/button";
import { LinkAccountButton } from '../components/linkAccountButton'

export default async function Home() {

  return (
    <div>
      <h1 className="text-red-400">Hello SHAAN</h1>
      <Button>Hello</Button>
      <LinkAccountButton />
    </div>
  );
}

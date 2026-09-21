import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-24">
      <Empty className="w-full border">
        <EmptyHeader>
          <EmptyTitle>Playbook not found</EmptyTitle>
          <EmptyDescription>
            That route is not one of the 23 poteto-mode playbooks.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button nativeButton={false} render={<Link href="/" />}>
            Back to the index
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

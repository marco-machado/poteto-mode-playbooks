import { cn } from "@/lib/utils";

export function RichInline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={className}>
      <Inline text={text} />
    </span>
  );
}

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-medium text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={index}
              className="rounded-md bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

function Block({ text }: { text: string }) {
  const lines = text.split("\n");
  const nodes: React.ReactNode[] = [];
  let list: string[] = [];

  const flushList = () => {
    if (list.length === 0) return;
    nodes.push(
      <ul
        key={`list-${nodes.length}`}
        className="flex flex-col gap-1.5 pl-5 text-muted-foreground"
      >
        {list.map((item, index) => (
          <li key={index} className="list-disc">
            <Inline text={item} />
          </li>
        ))}
      </ul>
    );
    list = [];
  };

  for (const line of lines) {
    const bullet = line.match(/^\s*-\s+(.*)$/);
    if (bullet) {
      list.push(bullet[1]);
      continue;
    }
    flushList();
    if (line.trim() === "") continue;
    nodes.push(
      <p key={`p-${nodes.length}`} className="text-pretty leading-relaxed">
        <Inline text={line.trim()} />
      </p>
    );
  }
  flushList();
  return <>{nodes}</>;
}

export function RichText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  if (!text.trim()) return null;
  const paragraphs = text.split(/\n\n+/);
  return (
    <div className={cn("flex flex-col gap-3 text-sm text-muted-foreground md:text-[0.95rem]", className)}>
      {paragraphs.map((paragraph, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Block text={paragraph} />
        </div>
      ))}
    </div>
  );
}

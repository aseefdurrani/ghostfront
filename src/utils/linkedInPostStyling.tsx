// Define custom styles for LinkedIn post components

const componentsStyle = {
  p: ({ node, ...props }: { node?: unknown; [key: string]: any }) => (
    <p className="mb-4" {...props} />
  ),
  ul: ({ node, ...props }: { node?: unknown; [key: string]: any }) => (
    <ul className="mb-4 list-inside list-disc" {...props} />
  ),
  ol: ({ node, ...props }: { node?: unknown; [key: string]: any }) => (
    <ol className="mb-4 list-inside list-decimal" {...props} />
  ),
  li: ({
    node,
    children,
    ...props
  }: {
    node?: unknown;
    [key: string]: any;
  }) => {
    const [firstChild, ...rest] = children as React.ReactNode[];
    return (
      <li className="mb-2" {...props}>
        <span className="inline">{firstChild} </span>
        {rest.length > 0 && <span className="inline">{rest}</span>}
      </li>
    );
  },
  h1: ({ node, ...props }: { node?: unknown; [key: string]: any }) => (
    <h1 className="mb-4 text-2xl font-bold" {...props} />
  ),
  h2: ({ node, ...props }: { node?: unknown; [key: string]: any }) => (
    <h2 className="mb-3 text-xl font-bold" {...props} />
  ),
  h3: ({ node, ...props }: { node?: unknown; [key: string]: any }) => (
    <h3 className="mb-2 text-lg font-bold" {...props} />
  ),
  strong: ({ node, ...props }: { node?: unknown; [key: string]: any }) => (
    <strong className="font-bold" {...props} />
  ),
  em: ({ node, ...props }: { node?: unknown; [key: string]: any }) => (
    <em className="italic" {...props} />
  ),
};

export { componentsStyle };

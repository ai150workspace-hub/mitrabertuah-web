import type { MDXComponents } from "mdx/types";

// Wajib ada di root project supaya @next/mdx berfungsi di App Router.
// Styling disamakan dengan tipografi situs (font-heading untuk judul).
const components: MDXComponents = {
  h1: (props) => <h1 className="font-heading text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props) => <h2 className="font-heading text-2xl font-bold mt-8 mb-3" {...props} />,
  h3: (props) => <h3 className="font-heading text-xl font-bold mt-6 mb-2" {...props} />,
  p: (props) => <p className="mt-4 leading-relaxed text-foreground" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc pl-6 space-y-1" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal pl-6 space-y-1" {...props} />,
  a: (props) => <a className="text-primary underline underline-offset-2" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

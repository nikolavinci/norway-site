export function generateStaticParams() {
  return [
    { slug: '0' },
    { slug: '1' },
    { slug: '2' },
  ];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

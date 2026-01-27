// Root layout - locale-specific layouts handle the full HTML structure
// This file is required by Next.js but delegates to [locale]/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

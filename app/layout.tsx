import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This is a minimal root layout - the actual layout with providers
  // is in app/[locale]/layout.tsx
  return children;
}

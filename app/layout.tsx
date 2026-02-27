export const metadata = {
  title: "Trade Report System",
  description: "Professional trading report generator"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

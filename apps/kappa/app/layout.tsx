import './global.css';
import { HeaderUser } from '../components/header-user';
import Link from 'next/link';

export const metadata = {
  title: 'KAPPA',
  description: 'Generated by create-nx-workspace',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="h-32 p-8 flex justify-between items-center bg-cover bg-[url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf')]">
          <div className="font-mono text-3xl">
            <span className=" text-white px-4">
              <Link href="/">WargoX</Link>
            </span>
          </div>
          <div>
            <HeaderUser />
          </div>
        </nav>
        <main className="flex flex-col gap-8 pt-8 container mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}

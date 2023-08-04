import Link from 'next/link';
export default async function Page() {
  await new Promise((r) => setTimeout(r, 2000));
  return (
    <div>
      This is the page <Link href="/">Go back</Link>
    </div>
  );
}

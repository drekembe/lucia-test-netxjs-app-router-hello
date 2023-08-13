export async function Comments() {
  await new Promise((r) => setTimeout(r, 1000));
  return (
    <ul>
      <li>Hello there</li>
      <li>Going on</li>
      <li>OK</li>
    </ul>
  );
}

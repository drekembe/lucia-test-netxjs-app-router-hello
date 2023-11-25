import { requireUser } from '../../util';
import { queue } from '../../schema';
import { db } from '../../db';
import { eq, and } from 'drizzle-orm';

export default async function Page() {
  const me = await requireUser();
  const myQueues = db
    .select()
    .from(queue)
    .where(and(eq(queue.ownerUserId, me.userId), eq(queue.isDeleted, 0)))
    .all();

  if (myQueues.length === 0) {
    return <div>You have no queues</div>;
  }

  return (
    <div>
      <ul>
        {myQueues.map((queue) => (
          <li key={queue.id}>{queue.name}</li>
        ))}
      </ul>
    </div>
  );
}

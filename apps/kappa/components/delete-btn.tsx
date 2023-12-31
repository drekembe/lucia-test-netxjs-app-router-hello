'use client';

import React, { useTransition } from 'react';

export function DeleteButton(props: {
  id: number;
  onClick: (n: number) => void;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      disabled={isPending}
      className="bg-white text-sm inline-block uppercase rounded outline-offset-4 border border-pink-600 text-pink-600 p-2 hover:bg-pink-600 hover:text-white transition-all disabled:bg-pink-600 disabled:text-white disabled:animate-pulse"
      onClick={() => startTransition(() => props.onClick(props.id))}
    >
      Del
    </button>
  );
}

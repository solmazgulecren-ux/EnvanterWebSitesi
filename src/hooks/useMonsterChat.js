import { useEffect, useState } from 'react';

export function useMonsterChat(active) {
  const [chatting, setChatting] = useState(false);

  useEffect(() => {
    if (!active) {
      setChatting(false);
      return undefined;
    }

    let endTimeout;

    const runChat = () => {
      setChatting(true);
      endTimeout = setTimeout(() => setChatting(false), 2800);
    };

    const initial = setTimeout(runChat, 4500);
    const interval = setInterval(runChat, 8000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
      clearTimeout(endTimeout);
      setChatting(false);
    };
  }, [active]);

  return chatting;
}

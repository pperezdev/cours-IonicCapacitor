import { useState } from 'react';
import { useIonViewWillEnter } from '@ionic/react';
import { getMessages, Message } from '../data/messages';

export const useHome = () => {
  // Fallback robuste : si `useIonViewWillEnter` ne se déclenche pas (selon structure/navigation),
  // on affiche quand même immédiatement les données locales.
  const [messages, setMessages] = useState<Message[]>(() => getMessages());

  useIonViewWillEnter(() => {
    setMessages(getMessages());
  });

  const onRefresh = (e: CustomEvent) => {
    // Simule un refresh asynchrone (ex: appel API)
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return { messages, onRefresh };
};


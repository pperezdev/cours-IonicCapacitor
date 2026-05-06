import { useEffect, useState } from 'react';
import { useIonViewWillEnter } from '@ionic/react';
import { useParams } from 'react-router';
import { Message, getMessage } from '../data/messages';

export const useViewMessage = () => {
  const params = useParams<{ id: string }>();

  // Fallback robuste : init immédiat (si l'affichage arrive avant le cycle Ionic).
  const initialId = params.id ? parseInt(params.id, 10) : NaN;
  const [message, setMessage] = useState<Message | undefined>(() => {
    if (Number.isNaN(initialId)) return undefined;
    return getMessage(initialId);
  });

  useEffect(() => {
    const id = params.id ? parseInt(params.id, 10) : NaN;
    setMessage(Number.isNaN(id) ? undefined : getMessage(id));
  }, [params.id]);

  useIonViewWillEnter(() => {
    const id = params.id ? parseInt(params.id, 10) : NaN;
    setMessage(Number.isNaN(id) ? undefined : getMessage(id));
  });

  return { message };
};


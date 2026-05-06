import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonButtons,
} from '@ionic/react';
import MessageListItem from '../components/MessageListItem';
import { Message } from '../data/messages';
import { MenuToggleButton } from '../components/AppMenu';

type HomeViewProps = {
  messages: Message[];
  onRefresh: (e: CustomEvent) => void;
};

const HomeView: React.FC<HomeViewProps> = ({ messages, onRefresh }) => {
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <MenuToggleButton />
          </IonButtons>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={onRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <IonList>
          {messages.map((m) => (
            <MessageListItem key={m.id} message={m} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomeView;


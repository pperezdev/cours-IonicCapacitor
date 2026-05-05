import { IonAvatar, IonItem, IonLabel, IonNote, IonIcon } from '@ionic/react';
import { GitPerson } from '../domain/models/gitdata.model';
import { personOutline, personAddOutline } from 'ionicons/icons';
import './GitBaseListItem.css';


const GitPersonItem = ({ person }: { person: GitPerson }) => {
  return (
    <IonItem id="git-base-list-item" href={`https://github.com/${person.login}`} target="_blank" rel="noopener noreferrer" detail={false}>
      <IonAvatar slot="start">
        <img src={person.avatar_url} alt={person.name} />
      </IonAvatar>
      <IonLabel className="ion-text-wrap">
        <h2>
          <span className="name">{person.login}</span>
          <span className="stats">
            <IonNote><IonIcon icon={personOutline} /> {person.followers}</IonNote>
            <IonNote><IonIcon icon={personAddOutline} /> {person.following}</IonNote>
          </span>
        </h2>
        <h3>{person.bio}</h3>
        <p>{person.location}</p>
      </IonLabel>
    </IonItem>
  );
};

export default GitPersonItem;
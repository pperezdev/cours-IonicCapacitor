import { GitDataWithLanguages } from '../domain/models/gitdata.model';

import { IonItem, IonLabel, IonNote, IonIcon } from '@ionic/react';
import { starOutline, gitBranchOutline, eyeOutline } from 'ionicons/icons';

import './GitBaseListItem.css';

interface GitBaseListItemProps {
  repo: GitDataWithLanguages;
}

const GitBaseListItem: React.FC<GitBaseListItemProps> = ({ repo }) => {
  const totalLanguageSize = repo.languages.reduce((total, language) => total + language.size, 0);
  const languagesWithPercentages = repo.languages.map((language) => ({
    ...language,
    percentage: totalLanguageSize > 0 ? (language.size / totalLanguageSize) * 100 : 0,
  }));

  return (
    <IonItem id="git-base-list-item" href={`https://github.com/${repo.owner.login}/${repo.name}`} target="_blank" rel="noopener noreferrer" detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {repo.name}
          <span className="stats">
            <IonNote><IonIcon icon={starOutline} /> {repo.stargazers_count}</IonNote>
            <IonNote><IonIcon icon={gitBranchOutline} /> {repo.forks_count}</IonNote>
            <IonNote><IonIcon icon={eyeOutline} /> {repo.watchers_count}</IonNote>
          </span>
        </h2>
        <h3><b>Description:</b> {repo.description ? repo.description : <i>No description</i>}</h3>
        <div className="languages-bar" aria-label="Répartition des langages">
          {languagesWithPercentages.map((language) => (
            <span
              key={`${repo.name}-${language.name}-bar`}
              className="language-segment"
              title={`${language.name} ${language.percentage.toFixed(1)}%`}
              aria-label={`${language.name} ${language.percentage.toFixed(1)}%`}
              style={{
                width: `${language.percentage}%`,
                backgroundColor: language.color,
              }}
            />
          ))}
        </div>
        {languagesWithPercentages.map((language) => (
          <IonNote key={`${repo.name}-${language.name}-legend`} className="language-note">
            <span className="language-color-dot" style={{ backgroundColor: language.color }} />
            {language.name} {language.percentage.toFixed(1)}%
          </IonNote>

        ))}
        <span className="date">
          <IonNote>Created at: {repo.created_at}</IonNote>
        </span>
      </IonLabel>
    </IonItem>
  );
};

export default GitBaseListItem;
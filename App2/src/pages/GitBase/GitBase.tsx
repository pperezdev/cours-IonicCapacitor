import useGitBase from '../../hooks/useGitBase';
import GitPersonItem from '../../components/GitPersonItem';
import { useCallback, useEffect } from 'react';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonRefresher, 
  IonRefresherContent, 
  IonList,
  useIonAlert,
} from '@ionic/react';
import GitBaseListItem from '../../components/GitBaseListItem';
import './GitBase.css';
import SearchBar from '../../components/SearchBar';

const GitBase = () => {
  const { defaultUsername, gitData, fetchData } = useGitBase();
  const [presentAlert] = useIonAlert();

  const handleFetchData = useCallback(async (usernameParam?: string) => {
    const result = await fetchData(usernameParam);

    if (result.status === 'empty_username') {
      await presentAlert({
        header: 'Nom requis',
        message: 'Veuillez saisir un nom utilisateur GitHub.',
        buttons: ['OK'],
      });
      return;
    }

    if (result.status === 'rate_limit') {
      await presentAlert({
        header: 'Limite API GitHub atteinte',
        message: `Reessaie dans ${result.timeLeft}. Reset: ${result.info.resetDate}. Resource: ${result.info.resource}`,
        buttons: ['OK'],
      });
      return;
    }

    if (result.status === 'error') {
      await presentAlert({
        header: 'Erreur',
        message: 'Impossible de recuperer les repositories pour le moment.',
        buttons: ['OK'],
      });
    }
  }, [fetchData, presentAlert]);

  const refresh = async (e: CustomEvent) => {
    e.detail.complete();
  };

  useEffect(() => {
    if(defaultUsername && defaultUsername.trim() !== '') {
      handleFetchData(defaultUsername);
    }
  }, [defaultUsername, handleFetchData]);

  return (
    <IonPage id="git-base-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className="git-base-fixed-panel">
        <SearchBar defaultValue={defaultUsername} onResearch={handleFetchData} placeholder="Ex: pperezdev" label="GitHub username" />
        {gitData.length > 0 && <GitPersonItem person={gitData[0].owner} />}
      </div>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Repositories
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {gitData.map(repo => <GitBaseListItem key={repo.name} repo={repo} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default GitBase;
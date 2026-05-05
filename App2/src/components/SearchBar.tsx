import { IonItem, IonInput, IonButton } from '@ionic/react';
import { useState, useCallback } from 'react';

interface SearchBarProps {
  onResearch: (searchText: string) => void;
  defaultValue? : string;
  placeholder?: string;
  label?: string;
}


const SearchBar = ({ defaultValue, onResearch, placeholder, label }: SearchBarProps) => {
  const [searchText, setSearchText] = useState(defaultValue ?? '');
  
  const handleChangeSearchText = (e: CustomEvent) => {
    setSearchText(e.detail.value ?? '');
  };

  const handleResearch = useCallback(() => {
    onResearch(searchText);
  }, [searchText, onResearch]);

  return (
    <IonItem>
      <IonInput
        label={label}
        labelPlacement="stacked"
        value={searchText}
        placeholder={placeholder}
        onIonInput={handleChangeSearchText}
        clearInput
      />
      <IonButton slot="end" onClick={handleResearch}>
        Research
      </IonButton>
    </IonItem>
  );
};

export default SearchBar;
import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectName } from '../../services/user';

export const AppHeader: FC = () => {
  const userName = useSelector(selectName);
  return <AppHeaderUI userName={userName} />;
};

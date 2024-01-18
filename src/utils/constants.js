import { Dimensions } from 'react-native';

export const CONTENT_TYPE = 'application/json';

export const screenWidth = Math.round(Dimensions.get('window').width);
export const screenHeight = Math.round(Dimensions.get('window').height);

export const SENTRY_DSN =
  'https://ccb47a8214fe44059a948e1eea4e8c17@glitch.mld-recette.fr/8';

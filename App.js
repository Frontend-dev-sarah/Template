import App from './src/AppContainer';
import * as Sentry from 'sentry-expo';
import { SENTRY_DSN } from './src/utils/constants';

Sentry.init({
  dsn: SENTRY_DSN,
  enableInExpoDevelopment: false,
});

/** Fonction de test: Vérifier si les logs remontent sur https://glitch.mld-recette.fr/ */
// throw new Error(`Congratulations ! It's a successful app simulation crash [ idNumber = ${Math.random()} ]`);

export default App;

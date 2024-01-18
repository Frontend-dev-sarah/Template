// this file is used to choose env variable according to the Expo release channel
import Constants from 'expo-constants';

const API_URL = {
  staging: 'https://testdev',
  prod: 'https://testprod',
};

const getEnvUrl = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return API_URL.staging;
  } else if (env?.startsWith('staging')) {
    return API_URL.staging;
  } else if (env?.startsWith('prod')) {
    return API_URL.prod;
  } else {
    return API_URL.staging;
  }
};

export default getEnvUrl;

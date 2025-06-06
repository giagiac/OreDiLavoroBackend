import prompts from 'prompts';
import removeAllDbPropertyGeneration from './scripts/property-generation-scripts/remove-all-db';
import removeDocumentPropertyGeneration from './scripts/property-generation-scripts/remove-document';
import removeRelationalPropertyGeneration from './scripts/property-generation-scripts/remove-relational';
import removeAppleAuth from './scripts/remove-auth-apple';
import removeFacebookAuth from './scripts/remove-auth-facebook';
import removeGoogleAuth from './scripts/remove-auth-google';
import removeTwitterAuth from './scripts/remove-auth-twitter';
import removeInstallScripts from './scripts/remove-install-scripts';
import removeMongoDb from './scripts/remove-mongodb';
import removePostgreSql from './scripts/remove-postgresql';
import removeAllDbResourceGeneration from './scripts/resource-generation-scripts/remove-all-db';
import removeDocumentResourceGeneration from './scripts/resource-generation-scripts/remove-document';
import removeRelationalResourceGeneration from './scripts/resource-generation-scripts/remove-relational';

(async () => {
  const response = await prompts(
    [
      {
        type: 'select',
        name: 'database',
        message: 'Which database do you want to use?',
        choices: [
          { title: 'PostgreSQL and MongoDB', value: 'pg-mongo' },
          { title: 'PostgreSQL', value: 'pg' },
          { title: 'MongoDB', value: 'mongo' },
        ],
      },
      {
        type: 'confirm',
        name: 'isAuthFacebook',
        message: 'Include Facebook auth?',
        initial: true,
      },
      {
        type: 'confirm',
        name: 'isAuthGoogle',
        message: 'Include Google auth?',
        initial: true,
      },
      {
        type: 'confirm',
        name: 'isAuthTwitter',
        message: 'Include Twitter auth?',
        initial: true,
      },
      {
        type: 'confirm',
        name: 'isAuthApple',
        message: 'Include Apple auth?',
        initial: true,
      },
    ],
    {
      onCancel() {
        process.exit(1);
      },
    },
  );

  if (response.database === 'pg-mongo') {
    removeRelationalResourceGeneration();
    removeDocumentResourceGeneration();
    removeDocumentPropertyGeneration();
    removeRelationalPropertyGeneration();
  }

  if (response.database === 'mongo') {
    removePostgreSql();
    removeRelationalResourceGeneration();
    removeRelationalPropertyGeneration();
    removeAllDbResourceGeneration();
    removeAllDbPropertyGeneration();
  }

  if (response.database === 'pg') {
    removeMongoDb();
    removeDocumentResourceGeneration();
    removeDocumentPropertyGeneration();
    removeAllDbResourceGeneration();
    removeAllDbPropertyGeneration();
  }

  if (!response.isAuthFacebook) {
    removeFacebookAuth();
  }

  if (!response.isAuthGoogle) {
    removeGoogleAuth();
  }

  if (!response.isAuthTwitter) {
    removeTwitterAuth();
  }

  if (!response.isAuthApple) {
    removeAppleAuth();
  }

  removeInstallScripts();
  process.exit(0);
})();

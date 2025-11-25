import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha';
import { createGithubSecretsAction } from './actions/createGithubSecretsAction';

export const scaffolderModuleGithubSecrets = createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'github-secrets',
  register(reg) {
    reg.registerInit({
      deps: {
        scaffolder: scaffolderActionsExtensionPoint,
        logger: coreServices.logger,
      },
      async init({ scaffolder, logger }) {
        logger.info('Registering github:repo:secrets action');
        const action = createGithubSecretsAction();
        if (action) {
          scaffolder.addActions(action);
        } else {
          logger.error('Failed to create github:repo:secrets:quay action');
        }
      },
    });
  },
});

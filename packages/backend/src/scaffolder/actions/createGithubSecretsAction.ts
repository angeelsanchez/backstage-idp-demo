import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { Octokit } from '@octokit/rest';
import sodium from 'libsodium-wrappers';

export function createGithubSecretsAction() {
  return createTemplateAction({
    id: 'github:repo:secrets:quay',
    description: 'Creates Quay.io credentials secrets in a GitHub repository',
    schema: {
      input: {
        owner: z => z.string({ description: 'The owner of the repository' }),
        repo: z => z.string({ description: 'The name of the repository' }),
      },
    },
    async handler(ctx) {
      const { owner, repo } = ctx.input as { owner: string; repo: string };
      const token = process.env.GITHUB_TOKEN;
      const quayUsername = process.env.QUAY_USERNAME;
      const quayPassword = process.env.QUAY_PASSWORD;

      if (!token) {
        throw new Error('GITHUB_TOKEN environment variable is not set');
      }

      if (!quayUsername || !quayPassword) {
        ctx.logger.warn('QUAY_USERNAME or QUAY_PASSWORD not set, secrets may be empty');
      }

      const secrets: Record<string, string> = {
        QUAY_USERNAME: quayUsername ?? '',
        QUAY_PASSWORD: quayPassword ?? '',
      };

      ctx.logger.info(`Creating secrets for ${owner}/${repo}`);

      const octokit = new Octokit({ auth: token });

      const { data: publicKey } = await octokit.actions.getRepoPublicKey({
        owner,
        repo,
      });

      await sodium.ready;

      for (const [name, value] of Object.entries(secrets)) {
        const messageBytes = Buffer.from(value);
        const keyBytes = Buffer.from(publicKey.key, 'base64');
        const encryptedBytes = sodium.crypto_box_seal(messageBytes, keyBytes);
        const encryptedValue = Buffer.from(encryptedBytes).toString('base64');

        await octokit.actions.createOrUpdateRepoSecret({
          owner,
          repo,
          secret_name: name,
          encrypted_value: encryptedValue,
          key_id: publicKey.key_id,
        });

        ctx.logger.info(`Created secret: ${name}`);
      }

      ctx.logger.info(`Successfully created ${Object.keys(secrets).length} secrets`);
    },
  });
}

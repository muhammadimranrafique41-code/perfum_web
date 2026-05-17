import nextConfig from 'eslint-config-next'
import tsPlugin from 'typescript-eslint'

const config = [
  ...nextConfig,
  {
    plugins: {
      '@typescript-eslint': tsPlugin.plugin,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
]

export default config

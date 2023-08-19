yarn -v  # current: 3.5.1 not: 1.x.x
yarn set version berry
yarn dlx @yarnpkg/sdks vscode

yarn add @yarnpkg/pnpify
yarn pnpify prisma generate
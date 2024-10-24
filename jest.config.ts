import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  transform: {},
  moduleNameMapper: {
    '(.+)\\.js': '$1'
  }
}

export default config

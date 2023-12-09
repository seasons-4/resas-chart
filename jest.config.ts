import nextJest from 'next/jest.js'
import { pathsToModuleNameMapper } from 'ts-jest'

import { compilerOptions } from './tsconfig.json'

import type { Config } from '@jest/types'

const createJestConfig = nextJest({
  dir: './'
})

/**
 * Next公式ドキュメントに記載されているJestの設定を参考にカスタマイズ
 * https://nextjs.org/docs/architecture/nextjs-compiler#jest
 */
const customJestConfig: Config.InitialOptions = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  testEnvironment: 'jest-environment-jsdom'
}

export default createJestConfig(customJestConfig)

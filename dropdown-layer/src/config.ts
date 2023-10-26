import { type ImmutableObject } from 'seamless-immutable'

export interface Config {
  exampleConfigProperty: string
  filterField: string
}

export type IMConfig = ImmutableObject<Config>

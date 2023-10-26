import { ImmutableObject } from 'seamless-immutable'

export interface Config {
  exampleConfigProperty: string
  zoomToLayer: boolean
}

export type IMConfig = ImmutableObject<Config>

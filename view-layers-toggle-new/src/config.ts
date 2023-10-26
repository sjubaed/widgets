import { ImmutableObject } from 'seamless-immutable'

export interface Config {
  exampleConfigProperty: string
  layerUrls: Array<string>;
}

export type IMConfig = ImmutableObject<Config>

import { HttpFile } from './httpFile';
import { ExecuteHook, OnRequestHook, OnStreaming, OnResponseHook, ResponseLoggingHook } from './httpFileHooks';
import { Request } from './httpRequest';
import { HttpResponse } from './httpResponse';
import { HttpSymbol } from './httpSymbol';
import { TestResult } from './testResult';
import { Variables } from './variables';

export interface ProcessedHttpRegion {
  request?: Request;
  response?: HttpResponse;
  symbol: HttpSymbol;
  metaData: Record<string, string | undefined | true>;
  testResults?: Array<TestResult>;
  responseRefs?: Array<string>;
}

export interface HttpRegion extends ProcessedHttpRegion {
  variablesPerEnv: Record<string, Variables>;
  dependentsPerEnv: Record<string, Array<{ httpRegion: HttpRegion; httpFile: HttpFile }>>;
  hooks: {
    execute: ExecuteHook;
    onRequest: OnRequestHook;
    onStreaming: OnStreaming;
    onResponse: OnResponseHook;
    responseLogging: ResponseLoggingHook;
  };
}

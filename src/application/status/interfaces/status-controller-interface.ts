import { HealthResponse } from './health-response-interface';

export interface StatusController {
  health: () => Promise<HealthResponse>;
}

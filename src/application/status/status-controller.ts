import {
  HealthResponse,
  StatusController as IStatusController,
} from './interfaces';

export class StatusController implements IStatusController {
  health(): Promise<HealthResponse> {
    return Promise.resolve({
      health: 'Ok',
    });
  }
}

import { TestBed } from '@angular/core/testing';

import { SlackService } from './slack.service';

describe('SlackServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlackService = TestBed.get(SlackService);
    expect(service).toBeTruthy();
  });
});

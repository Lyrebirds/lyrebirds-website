import { ContactMessage } from './slack-message';

describe('SlackMessage', () => {
  it('should create an instance', () => {
    expect(new ContactMessage()).toBeTruthy();
  });
});

process.env.GOOGLEID = 'test-id';
process.env.GOOGLESECRET = 'test-secret';
process.env.GMAIL = 'test@example.com';
process.env.PASSWORD = 'password';
process.env.CLIENTID = 'clientid';
process.env.CLIENTSECRET = 'clientsecret';
process.env.REFRESHTOKEN = 'token';
process.env.MAIL_SERVER = 'smtp.example.com';

import request from 'supertest';

let app;
beforeAll(async () => {
  app = (await import('../app.js')).default;
});

describe('GET /health', () => {
  it('responds with status ok', async () => {
    await request(app)
      .get('/health')
      .expect('Content-Type', /json/)
      .expect(200, { status: 'ok' });
  });
});

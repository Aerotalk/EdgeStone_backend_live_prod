const request = require('supertest');
const config = require('./config');

describe('Production Reliability & Load Check', () => {
    // Increase timeout for load testing
    jest.setTimeout(30000);

    it('should handle 50 concurrent requests to the health endpoint without failing', async () => {
        const numRequests = 50;
        const requests = [];

        for (let i = 0; i < numRequests; i++) {
            requests.push(request(config.baseURL).get('/'));
        }

        const responses = await Promise.all(requests);

        let successCount = 0;
        responses.forEach(response => {
            if (response.status === 200 && response.body.status === 'OK') {
                successCount++;
            }
        });

        expect(successCount).toBe(numRequests);
    });

    it('should handle sequential requests with consistent response times', async () => {
        const numRequests = 10;
        const maxAcceptableTimeMs = 2000; // 2 seconds per request max (allows for network latency)

        for (let i = 0; i < numRequests; i++) {
            const start = Date.now();
            const response = await request(config.baseURL).get('/');
            const duration = Date.now() - start;

            expect(response.status).toBe(200);
            expect(duration).toBeLessThan(maxAcceptableTimeMs);
        }
    });
});

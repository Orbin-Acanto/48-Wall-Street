import { initBotId } from 'botid/client/core';

// Paths and methods must match the public form requests exactly.
initBotId({
  protect: [
    { path: '/api/contact-form', method: 'POST' },
    { path: '/api/rfp', method: 'POST' },
    { path: '/api/rental', method: 'POST' },
    { path: '/api/chat', method: 'POST' },
  ],
});

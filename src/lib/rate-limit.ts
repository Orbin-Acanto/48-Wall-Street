import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Contact-form throttle: 10 accepted submissions per IP, then a one hour
 * cooldown.
 *
 * The window is deliberately generous because the key is an IP address, and a
 * whole office, hotel or conference floor can share one. Callers must only
 * count a request once it has passed validation — charging a visitor for a
 * mistyped email or a failed captcha would lock them out for mistakes.
 */
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  analytics: true,
  prefix: '@upstash/ratelimit',
});

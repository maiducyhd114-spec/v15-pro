
import { RateLimiterMemory } from 'rate-limiter-flexible';

const points = Number(process.env.RATE_POINTS || 60);
const duration = Number(process.env.RATE_DURATION || 60);
const limiter = new RateLimiterMemory({ points, duration });

export async function limitByIp(req, res) {
  const key = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'ip') + ':' + (req.url || '');
  try {
    await limiter.consume(key);
    return true;
  } catch (e) {
    res.status(429).json({ error: 'Too many requests' });
    return false;
  }
}

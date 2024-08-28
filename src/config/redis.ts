import Redis from 'ioredis';
import env from '../validations/env';

const redis = new Redis(env.EXTERNAL_REDIS);

export default redis;

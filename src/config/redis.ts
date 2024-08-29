import Redis from 'ioredis';
import env from '../validations/env';

let redis: Redis;
if (env.ENV === 'production') {
    redis = new Redis(env.EXTERNAL_REDIS);
} else {
    redis = new Redis();
}

// const redis = new Redis();

export default redis;

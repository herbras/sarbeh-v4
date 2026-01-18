import type { ExecutionContext } from '@cloudflare/workers-types';

// Import the server entry point from React Router build
import handler from '../build/server/nodejs_eyJydW50aW1lIjoibm9kZWpzIn0/index.js';

export default {
  async fetch(
    request: Request,
    env: any,
    ctx: ExecutionContext
  ): Promise<Response> {
    try {
      // Use the React Router server handler
      return await handler.default(request, {
        env,
        ctx,
        waitUntil: ctx.waitUntil.bind(ctx),
        passThroughOnException: ctx.passThroughOnException.bind(ctx),
      });
    } catch (error) {
      console.error('Worker error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
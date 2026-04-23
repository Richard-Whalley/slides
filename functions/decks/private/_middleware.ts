interface Env {
  BASIC_AUTH_USER: string;
  BASIC_AUTH_PASS: string;
}

export const onRequest: PagesFunction<Env> = async ({ request, env, next }) => {
  const header = request.headers.get('Authorization');

  if (header?.startsWith('Basic ')) {
    const [user, pass] = atob(header.slice(6)).split(':');
    if (user === env.BASIC_AUTH_USER && pass === env.BASIC_AUTH_PASS) {
      return next();
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Private decks"' },
  });
};

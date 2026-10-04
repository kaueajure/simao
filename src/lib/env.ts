import 'server-only';
// Read server configuration at runtime, including when a built app changes environment.
export function optionalEnv(name: string): string | undefined {
  return process.env[name];
}
export function configured() {
  return Boolean(
    optionalEnv('NEXT_PUBLIC_SUPABASE_URL') && optionalEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'),
  );
}
export function googleLoginEnabled() {
  return process.env.GOOGLE_OAUTH_ENABLED === 'true';
}
export function requiredEnv(name: string): string {
  const value = optionalEnv(name);
  if (!value) throw new Error('CONFIGURATION_REQUIRED');
  return value;
}
export function appUrl() {
  return new URL(optionalEnv('NEXT_PUBLIC_APP_URL') || 'http://localhost:3000').origin;
}
export const secureCookies = () => new URL(appUrl()).protocol === 'https:';

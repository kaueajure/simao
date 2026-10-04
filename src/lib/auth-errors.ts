import type { ActionState } from './types';
import { safeError } from './errors';

// Never return provider messages: they can contain email addresses or reveal account existence.
export function authError(error: unknown): ActionState {
  const code = error && typeof error === 'object' && 'code' in error ? error.code : undefined;
  const status = error && typeof error === 'object' && 'status' in error ? error.status : undefined;
  if (status === 429 || code === 'over_email_send_rate_limit' || code === 'over_request_rate_limit')
    return {
      error: 'Você fez muitas tentativas. Aguarde alguns minutos antes de tentar novamente.',
    };
  if (code === 'invalid_credentials') return { error: 'E-mail ou senha incorretos.' };
  if (code === 'email_not_confirmed')
    return { error: 'Confirme seu e-mail pelo link recebido antes de entrar.' };
  if (code === 'email_provider_disabled' || code === 'signup_disabled')
    return {
      error: 'O acesso por e-mail ainda não está disponível. Entre em contato com a administração.',
    };
  if (code === 'weak_password')
    return { error: 'Escolha uma senha mais forte, com letras, números e símbolos.' };
  if (code === 'same_password') return { error: 'Escolha uma senha diferente da atual.' };
  if (code === 'session_not_found' || code === 'refresh_token_not_found')
    return { error: 'O acesso expirou. Solicite outro link de recuperação.' };
  return safeError(error);
}

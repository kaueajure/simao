import Link from 'next/link';
import { ActionForm } from '@/components/action-form';
import { EmailField } from '@/components/auth-fields';
import { requestPasswordReset } from '@/server/password-auth';
import { configured } from '@/lib/env';

export const metadata = { title: 'Recuperar acesso', robots: { index: false, follow: false } };
export default async function Recover({
  searchParams,
}: {
  searchParams: Promise<{ motivo?: string }>;
}) {
  const { motivo } = await searchParams;
  return (
    <main id="conteudo" className="auth-page wrap">
      <p className="eyebrow">Volte para suas descobertas</p>
      <h1>Esqueceu a senha?</h1>
      <p className="lead small">
        Informe seu e-mail para receber um link e escolher uma nova senha.
      </p>
      {motivo === 'link_expirado' ? (
        <p className="notice error" role="alert">
          Este link é inválido ou expirou. Solicite um novo abaixo.
        </p>
      ) : null}
      {!configured() ? (
        <p className="notice" role="status">
          A recuperação ficará disponível após configurar a conexão com o serviço.
        </p>
      ) : null}
      <ActionForm
        action={requestPasswordReset}
        label="Enviar link de recuperação"
        pendingLabel="Enviando…"
        disabled={!configured()}
      >
        <EmailField />
      </ActionForm>
      <p className="auth-links">
        <Link href="/entrar">Voltar para entrar</Link>
      </p>
    </main>
  );
}

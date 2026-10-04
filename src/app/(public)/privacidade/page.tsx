import Link from 'next/link';
export const metadata = { title: 'Privacidade', alternates: { canonical: '/privacidade' } };
export default function Privacy() {
  const contact = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  return (
    <main id="conteudo" className="legal-page wrap">
      <p className="eyebrow">Atualizado em 4 de outubro de 2026</p>
      <h1>Privacidade</h1>
      <p>
        Usamos o Supabase para autenticar sua conta por e-mail e senha ou, quando disponível, pelo
        Google. As senhas são gerenciadas pelo Supabase e não ficam nas tabelas da comunidade. O
        e-mail da conta não é mostrado publicamente.
      </p>
      <h2>Dados usados pelo serviço</h2>
      <p>
        Seu nome de exibição, nome de usuário, foto escolhida e cidade principal compõem seu perfil.
        Pedidos, indicações, resoluções e recompensas são registrados para oferecer o serviço e
        manter a integridade da pontuação.
      </p>
      <p>
        Antes da revelação, os locais indicados por outras pessoas ficam privados. Depois da
        resolução, o local confirmado pode ser consultado como descoberta histórica. A administração
        pode consultar denúncias e logs de ações para moderação.
      </p>
      <h2>Fornecedores e cookies</h2>
      <p>
        O Supabase processa autenticação e banco de dados. O Google fornece login opcional e dados
        dos estabelecimentos. Cookies essenciais mantêm sua sessão. Contamos visitas e ações
        importantes de forma agregada, sem ferramentas de publicidade ou rastreamento entre sites.
        Para reduzir abuso nesses contadores, usamos uma fingerprint técnica temporária, sem
        armazenar o endereço IP bruto.
      </p>
      <p>
        Buscas e identificadores de estabelecimentos são enviados ao Google Maps Platform para
        identificar os locais. Consulte a{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Política de Privacidade do Google
        </a>
        .
      </p>
      <h2>Seus direitos</h2>
      <p>
        Você pode alterar seu perfil na aplicação e solicitar acesso, correção, anonimização ou
        exclusão dos seus dados ao responsável pelo serviço. Registros necessários à integridade do
        histórico podem ser conservados conforme a legislação aplicável, sem divulgar dados pessoais
        desnecessários.
      </p>
      {contact ? (
        <p>
          Contato: <a href={'mailto:' + contact}>{contact}</a>.
        </p>
      ) : (
        <p>
          O canal de contato do responsável pelo serviço será informado antes da abertura ao
          público.
        </p>
      )}
      <Link href="/" className="text-link">
        Voltar ao início
      </Link>
    </main>
  );
}

# Arquitetura MVVM

Este projeto segue o padrão **MVVM (Model-View-ViewModel)** com organização por features.

## Estrutura

```
src/
├── features/
│   ├── auth/
│   │   ├── login.view.tsx           # Componente visual puro
│   │   ├── use-login.model.tsx      # Hook com lógica de negócio
│   │   └── login.view-model.tsx     # Conecta Model e View
│   ├── dashboard/
│   ├── categories/
│   └── transactions/
├── graphql/         # Queries e Mutations GraphQL
├── config/          # Configurações (Apollo Client, etc)
├── types/           # TypeScript interfaces
└── utils/           # Utilitários compartilhados
```

## Padrões

### Nomenclatura
- **Arquivos**: kebab-case.tsx (ex: `login.view.tsx`)
- **Componentes**: PascalCase (ex: `LoginView`)
- **Hooks**: camelCase com prefixo `use` (ex: `useLoginModel`)

### Organização por Feature
Cada feature é auto-contida com seus próprios:
- **Model**: Lógica de negócio
- **View**: Componente visual
- **ViewModel**: Conecta Model e View

## Camadas

### Model (use-*.model.tsx)
Hook customizado que contém toda a **lógica de negócio**:
- Chamadas GraphQL
- Manipulação de dados
- Regras de negócio
- Acesso ao localStorage
- Estado interno (loading, error)

**Exemplo**: `use-login.model.tsx`
```typescript
export const useLoginModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (input: LoginInput) => {
    setIsLoading(true);
    // Lógica de login com GraphQL
    const { data } = await apolloClient.mutate({...});
    setIsLoading(false);
    return data;
  };

  return { login, isLoading, error };
};
```

### View (*.view.tsx)
Componente React **puramente visual**:
- Recebe dados via props
- Renderiza UI
- Emite eventos via callbacks
- **NÃO contém lógica de negócio**
- **NÃO usa hooks (exceto useState local para UI)**

**Exemplo**: `login.view.tsx`
```typescript
interface LoginViewProps {
  isLoading: boolean;
  error: string | null;
  onSubmit: (email: string, password: string) => void;
}

export function LoginView({ isLoading, error, onSubmit }: LoginViewProps) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // Extrai dados e chama onSubmit
    }}>
      {/* JSX */}
    </form>
  );
}
```

### ViewModel (*.view-model.tsx)
Componente que **conecta Model e View**:
- Usa o hook do Model
- Implementa handlers de eventos
- Injeta props na View
- Gerencia navegação e side effects

**Exemplo**: `login.view-model.tsx`
```typescript
export function LoginViewModel() {
  const { login, isLoading, error } = useLoginModel();
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    const result = await login({ email, password });
    if (result) {
      navigate('/dashboard');
    }
  };

  return (
    <LoginView
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
    />
  );
}
```

## Fluxo de Dados

```
User Interaction (View)
    ↓
Event Handler (ViewModel)
    ↓
Model Hook (lógica de negócio)
    ↓
GraphQL (Backend API)
    ↓
Model retorna dados
    ↓
ViewModel injeta via props
    ↓
View renderiza
```

## Exemplo Completo

```
src/features/auth/
├── login.view.tsx          # UI pura
├── use-login.model.tsx     # Lógica de negócio
└── login.view-model.tsx    # Conecta tudo
```

**Uso no App**:
```typescript
import { LoginViewModel } from '@/features/auth/login.view-model';

function App() {
  return <LoginViewModel />;
}
```

## Vantagens

1. **Organização por Feature**: Tudo relacionado está junto
2. **Separação de Responsabilidades**: Cada camada tem propósito claro
3. **Testabilidade**: Models podem ser testados isoladamente
4. **Reusabilidade**: Views são componentes puros
5. **Manutenibilidade**: Mudanças localizadas por feature
6. **TypeScript**: Tipagem forte com interfaces de props

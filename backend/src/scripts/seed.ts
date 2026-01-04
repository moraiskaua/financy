import { prisma } from '../config/database';
import { hashPassword } from '../utils/auth';

async function main() {
  const email = 'demo@financy.com';
  const password = await hashPassword('demo123');

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: 'Demo',
      email,
      password,
    },
  });

  const categoriesData = [
    { name: 'Alimentação', description: 'Restaurantes, delivery e refeições', icon: 'food', color: 'blue' },
    { name: 'Transporte', description: 'Gasolina, transporte público e viagens', icon: 'car', color: 'purple' },
    { name: 'Mercado', description: 'Compras de supermercado e mantimentos', icon: 'shopping', color: 'orange' },
    { name: 'Investimento', description: 'Aplicações e retornos financeiros', icon: 'briefcase', color: 'green' },
    { name: 'Entretenimento', description: 'Cinema, jogos e lazer', icon: 'ticket', color: 'pink' },
    { name: 'Utilidades', description: 'Energia, água, internet e telefone', icon: 'home', color: 'yellow' },
    { name: 'Salário', description: 'Renda mensal e bonificações', icon: 'briefcase', color: 'green' },
    { name: 'Saúde', description: 'Medicamentos, consultas e exames', icon: 'heart', color: 'red' },
  ];

  for (const c of categoriesData) {
    await prisma.category.upsert({
      where: { name_userId: { name: c.name, userId: user.id } },
      update: {
        description: c.description,
        icon: c.icon,
        color: c.color,
      },
      create: {
        name: c.name,
        description: c.description,
        icon: c.icon,
        color: c.color,
        userId: user.id,
      },
    });
  }

  const categories = await prisma.category.findMany({ where: { userId: user.id } });
  const byName = Object.fromEntries(categories.map((c) => [c.name, c]));

  await prisma.transaction.deleteMany({ where: { userId: user.id } });

  const now = new Date();
  function daysAgo(n: number) {
    const d = new Date(now);
    d.setDate(d.getDate() - n);
    return d;
  }

  const transactionsData = [
    { description: 'Jantar no Restaurante', amount: 89.5, type: 'saida', category: 'Alimentação', days: 35 },
    { description: 'Posto de Gasolina', amount: 100, type: 'saida', category: 'Transporte', days: 34 },
    { description: 'Compras no Mercado', amount: 156.8, type: 'saida', category: 'Mercado', days: 33 },
    { description: 'Retorno de Investimento', amount: 340.25, type: 'entrada', category: 'Investimento', days: 31 },
    { description: 'Aluguel', amount: 1700, type: 'saida', category: 'Utilidades', days: 30 },
    { description: 'Freelance', amount: 2500, type: 'entrada', category: 'Salário', days: 29 },
    { description: 'Compras Jantar', amount: 150, type: 'saida', category: 'Mercado', days: 28 },
    { description: 'Cinema', amount: 88, type: 'saida', category: 'Entretenimento', days: 27 },
    { description: 'Plano de Saúde', amount: 420, type: 'saida', category: 'Saúde', days: 26 },
    { description: 'Conta de Luz', amount: 240.5, type: 'saida', category: 'Utilidades', days: 25 },
    { description: 'Salário', amount: 4800, type: 'entrada', category: 'Salário', days: 24 },
    { description: 'Internet', amount: 120, type: 'saida', category: 'Utilidades', days: 23 },
    { description: 'Supermercado', amount: 286.7, type: 'saida', category: 'Mercado', days: 22 },
    { description: 'Streaming', amount: 50, type: 'saida', category: 'Entretenimento', days: 21 },
    { description: 'Rendimento CDI', amount: 39.4, type: 'entrada', category: 'Investimento', days: 20 },
    { description: 'Táxi', amount: 35.2, type: 'saida', category: 'Transporte', days: 19 },
    { description: 'Almoço', amount: 45.9, type: 'saida', category: 'Alimentação', days: 18 },
    { description: 'Consulta Médica', amount: 280, type: 'saida', category: 'Saúde', days: 17 },
    { description: 'Bônus', amount: 600, type: 'entrada', category: 'Salário', days: 15 },
    { description: 'Padaria', amount: 26.4, type: 'saida', category: 'Alimentação', days: 14 },
    { description: 'Uber', amount: 22.7, type: 'saida', category: 'Transporte', days: 13 },
    { description: 'Feira', amount: 98.1, type: 'saida', category: 'Mercado', days: 12 },
    { description: 'Cinema 3D', amount: 74, type: 'saida', category: 'Entretenimento', days: 11 },
    { description: 'Energia', amount: 210, type: 'saida', category: 'Utilidades', days: 10 },
    { description: 'Aplicação Tesouro', amount: 300, type: 'entrada', category: 'Investimento', days: 9 },
    { description: 'Médico', amount: 310, type: 'saida', category: 'Saúde', days: 8 },
    { description: 'Supermercado Extra', amount: 126.5, type: 'saida', category: 'Mercado', days: 7 },
    { description: 'Lanche', amount: 32.9, type: 'saida', category: 'Alimentação', days: 6 },
    { description: 'Ônibus', amount: 9.8, type: 'saida', category: 'Transporte', days: 5 },
  ];

  for (const t of transactionsData) {
    const categoryId = byName[t.category]?.id;
    if (!categoryId) continue;
    await prisma.transaction.create({
      data: {
        description: t.description,
        amount: t.amount,
        type: t.type,
        categoryId,
        userId: user.id,
        createdAt: daysAgo(t.days),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

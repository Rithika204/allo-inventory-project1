# Allo Inventory Reservation System

## Run Steps

```bash
npm install
```

Create `.env`:

```env
DATABASE_URL="your_supabase_postgres_url"
```

Run migration:

```bash
npx prisma migrate dev --name init
```

Seed database:

```bash
npx prisma db seed
```

Run app:

```bash
npm run dev
```

## Tech Stack

- Next.js 15
- Prisma
- PostgreSQL
- Tailwind CSS

## Concurrency Handling

The reservation endpoint uses PostgreSQL row locking:

```sql
SELECT ... FOR UPDATE
```

inside a transaction to prevent overselling.

## Expiry Handling

A cleanup API releases expired reservations.
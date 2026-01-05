#!/bin/sh
set -e

echo "🚀 Starting Financy Backend..."

# Wait a bit for the filesystem to be ready
sleep 2

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ ERROR: DATABASE_URL is not set"
  exit 1
fi

echo "📊 Database URL: $DATABASE_URL"

# Export DATABASE_URL for Prisma CLI
export DATABASE_URL

# Extract the database file path from DATABASE_URL (remove 'file:' prefix)
DB_PATH=$(echo $DATABASE_URL | sed 's/^file://')

# Check if database exists
if [ ! -f "$DB_PATH" ]; then
  echo "📦 Database not found. Creating and initializing..."

  # Create the database directory if it doesn't exist
  mkdir -p $(dirname "$DB_PATH")

  # Run prisma db push to create tables
  echo "🔄 Creating database schema..."
  npx prisma db push --accept-data-loss

  echo "✅ Database created successfully"
else
  echo "✅ Database already exists"
fi

# Start the server
echo "🎯 Starting GraphQL server..."
exec node dist/main.js

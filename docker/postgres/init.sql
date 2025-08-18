-- HASH 2K25 Database Initialization Script
-- This script runs when the PostgreSQL container starts for the first time

-- Create the main database if it doesn't exist
SELECT 'CREATE DATABASE hash2k25'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'hash2k25')\gexec

-- Connect to the hash2k25 database
\c hash2k25;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Set timezone
SET timezone = 'UTC';

-- Create indexes for better performance (Prisma will create the tables)
-- These will be applied after Prisma migrations run

-- Note: The actual table creation is handled by Prisma migrations
-- This file is primarily for database setup and initial configuration

-- Log successful initialization
DO $$
BEGIN
    RAISE NOTICE 'HASH 2K25 database initialized successfully';
END $$;

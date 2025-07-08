#!/usr/bin/env node

/**
 * Migration script to add darkColor field to kanban_columns table
 * Run this script to apply the database changes for darkColor support
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting database migration for darkColor field...');

try {
  // Change to backend directory
  process.chdir(__dirname);
  
  console.log('📁 Current directory:', process.cwd());
  
  // Run Prisma migration
  console.log('🔄 Running Prisma migration...');
  execSync('npx prisma migrate dev --name add-dark-color-to-columns', { 
    stdio: 'inherit',
    cwd: __dirname 
  });
  
  // Generate Prisma client
  console.log('🔄 Generating Prisma client...');
  execSync('npx prisma generate', { 
    stdio: 'inherit',
    cwd: __dirname 
  });
  
  console.log('✅ Migration completed successfully!');
  console.log('');
  console.log('📋 What was done:');
  console.log('  ✅ Added darkColor field to kanban_columns table');
  console.log('  ✅ Updated Prisma client');
  console.log('  ✅ Database schema is now up to date');
  console.log('');
  console.log('🎯 Next steps:');
  console.log('  1. Restart your backend server');
  console.log('  2. Test creating a new board with custom colors');
  console.log('  3. Verify theme switching works correctly');
  
} catch (error) {
  console.error('❌ Migration failed:', error.message);
  console.error('');
  console.error('🔧 Troubleshooting:');
  console.error('  1. Make sure you are in the backend directory');
  console.error('  2. Check that DATABASE_URL is set correctly');
  console.error('  3. Ensure the database is running and accessible');
  console.error('  4. Try running the commands manually:');
  console.error('     npx prisma migrate dev --name add-dark-color-to-columns');
  console.error('     npx prisma generate');
  
  process.exit(1);
}
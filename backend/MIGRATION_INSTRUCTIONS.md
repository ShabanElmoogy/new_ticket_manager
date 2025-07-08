# Database Migration Instructions for DarkColor Field

## Quick Migration (Recommended)

Run the automated migration script:

```bash
cd backend
node run-migration.js
```

## Manual Migration Steps

If the automated script doesn't work, follow these manual steps:

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Run Prisma Migration
```bash
npx prisma migrate dev --name add-dark-color-to-columns
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Restart Backend Server
```bash
npm run dev
# or
yarn dev
```

## Verification Steps

### 1. Check Database Schema
The `kanban_columns` table should now have a `darkColor` column:

```sql
DESCRIBE kanban_columns;
-- Should show darkColor VARCHAR(191) NULL
```

### 2. Test API Endpoints

#### Create Board with Colors
```bash
curl -X POST http://localhost:5000/api/kanban/boards \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Board",
    "description": "Testing dark colors",
    "columns": [
      {
        "name": "To Do",
        "color": "#e3f2fd",
        "darkColor": "#0d47a1"
      }
    ]
  }'
```

#### Update Column Colors
```bash
curl -X PUT http://localhost:5000/api/kanban/columns/{columnId} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Column",
    "color": "#fff3e0",
    "darkColor": "#e65100"
  }'
```

### 3. Frontend Testing

1. **Create New Board:**
   - Open the Create Board dialog
   - Select different colors from the MUI palette
   - Verify both light and dark colors are saved

2. **Theme Switching:**
   - Switch between light and dark themes
   - Verify column colors change appropriately
   - Check that contrast is maintained

3. **Board Settings:**
   - Edit existing board columns
   - Update colors and verify changes persist
   - Test with custom color picker

## Expected Database Changes

### Before Migration
```sql
CREATE TABLE `kanban_columns` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `description` VARCHAR(191) NULL,
  `color` VARCHAR(191) NULL,
  `position` INTEGER NOT NULL,
  `wipLimit` INTEGER NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  `boardId` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id`)
);
```

### After Migration
```sql
CREATE TABLE `kanban_columns` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `description` VARCHAR(191) NULL,
  `color` VARCHAR(191) NULL,
  `darkColor` VARCHAR(191) NULL,  -- ✅ NEW FIELD
  `position` INTEGER NOT NULL,
  `wipLimit` INTEGER NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  `boardId` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id`)
);
```

## Troubleshooting

### Migration Fails
```bash
# Reset and try again
npx prisma migrate reset
npx prisma migrate dev --name add-dark-color-to-columns
```

### Database Connection Issues
```bash
# Check database connection
npx prisma db pull
```

### Client Generation Issues
```bash
# Force regenerate client
rm -rf node_modules/.prisma
npx prisma generate
```

### Existing Data
If you have existing boards, they will have `darkColor` as `NULL`. The frontend will handle this gracefully by auto-generating dark colors.

## Post-Migration Checklist

- [ ] Database migration completed successfully
- [ ] Prisma client regenerated
- [ ] Backend server restarted
- [ ] Can create boards with custom colors
- [ ] Can update column colors
- [ ] Theme switching works correctly
- [ ] No console errors in frontend
- [ ] API responses include `darkColor` field

## Rollback (If Needed)

If you need to rollback the migration:

```bash
# This will remove the darkColor column
npx prisma migrate reset
# Then run migrations up to the previous state
npx prisma migrate deploy
```

**Note:** This will lose any data in the `darkColor` column.
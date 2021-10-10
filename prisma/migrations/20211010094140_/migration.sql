/*
  Warnings:

  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "route_points" ALTER COLUMN "radius" SET DEFAULT 50,
ALTER COLUMN "radius" SET DATA TYPE REAL;

-- AlterTable
ALTER TABLE "routes" ALTER COLUMN "asphalt" SET DEFAULT 0,
ALTER COLUMN "asphalt" SET DATA TYPE REAL,
ALTER COLUMN "unpaved" SET DEFAULT 0,
ALTER COLUMN "unpaved" SET DATA TYPE REAL,
ALTER COLUMN "cobblestone" SET DEFAULT 0,
ALTER COLUMN "cobblestone" SET DATA TYPE REAL,
ALTER COLUMN "unknown" SET DEFAULT 0,
ALTER COLUMN "unknown" SET DATA TYPE REAL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;

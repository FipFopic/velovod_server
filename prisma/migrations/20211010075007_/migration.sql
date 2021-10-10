-- DropIndex
DROP INDEX "points_by_user_id_key";

-- DropIndex
DROP INDEX "routes_by_user_id_key";

-- AlterTable
ALTER TABLE "routes" ALTER COLUMN "confirm_date" DROP NOT NULL;

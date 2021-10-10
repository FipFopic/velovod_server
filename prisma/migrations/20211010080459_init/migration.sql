/*
  Warnings:

  - You are about to drop the column `point_id` on the `route_points` table. All the data in the column will be lost.
  - You are about to drop the `points` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `latitude` to the `route_points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `route_points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `route_points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `route_points` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "points" DROP CONSTRAINT "points_by_user_id_fkey";

-- DropForeignKey
ALTER TABLE "route_points" DROP CONSTRAINT "route_points_point_id_fkey";

-- AlterTable
ALTER TABLE "route_points" DROP COLUMN "point_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "latitude" INTEGER NOT NULL,
ADD COLUMN     "longitude" INTEGER NOT NULL,
ADD COLUMN     "palceId" INTEGER,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "radius" INTEGER NOT NULL DEFAULT 50,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "points";

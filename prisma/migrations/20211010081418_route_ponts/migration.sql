/*
  Warnings:

  - A unique constraint covering the columns `[by_user_id]` on the table `route_points` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `by_user_id` to the `route_points` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "route_points" ADD COLUMN     "by_user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "route_points_by_user_id_key" ON "route_points"("by_user_id");

-- AddForeignKey
ALTER TABLE "route_points" ADD CONSTRAINT "route_points_by_user_id_fkey" FOREIGN KEY ("by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

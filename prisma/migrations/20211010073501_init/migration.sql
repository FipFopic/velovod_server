-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVED', 'FROZEN', 'BLOCKED');

-- CreateEnum
CREATE TYPE "RouteStatus" AS ENUM ('NOT_CONFIRMED', 'MODERATION', 'CONFIRMED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "RouteType" AS ENUM ('LITE', 'NORMAL', 'HEAVY');

-- CreateEnum
CREATE TYPE "PointStatus" AS ENUM ('ACTIVED', 'BLOCKED');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT E'ACTIVED',
    "refresh_token" TEXT,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "vk_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "mobile_phone" TEXT,
    "birthday" TIMESTAMP(3),
    "email_confirm" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statistics" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routes" (
    "id" SERIAL NOT NULL,
    "status" "RouteStatus" NOT NULL DEFAULT E'NOT_CONFIRMED',
    "type" "RouteType" NOT NULL DEFAULT E'LITE',
    "photo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "polyne" TEXT,
    "duration" INTEGER NOT NULL,
    "distance" INTEGER NOT NULL DEFAULT 0,
    "asphalt" INTEGER NOT NULL DEFAULT 0,
    "unpaved" INTEGER NOT NULL DEFAULT 0,
    "cobblestone" INTEGER NOT NULL DEFAULT 0,
    "unknown" INTEGER NOT NULL DEFAULT 0,
    "placeId" INTEGER,
    "by_user_id" INTEGER NOT NULL,
    "confirm_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route_points" (
    "id" SERIAL NOT NULL,
    "status" "PointStatus" NOT NULL DEFAULT E'ACTIVED',
    "route_id" INTEGER NOT NULL,
    "point_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "route_points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "points" (
    "id" SERIAL NOT NULL,
    "status" "PointStatus" NOT NULL DEFAULT E'ACTIVED',
    "photo" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "radius" INTEGER NOT NULL DEFAULT 50,
    "palceId" INTEGER,
    "by_user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "points_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_vk_id_key" ON "users"("vk_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "statistics_profile_id_key" ON "statistics"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "routes_by_user_id_key" ON "routes"("by_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "points_by_user_id_key" ON "points"("by_user_id");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statistics" ADD CONSTRAINT "statistics_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_by_user_id_fkey" FOREIGN KEY ("by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_points" ADD CONSTRAINT "route_points_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_points" ADD CONSTRAINT "route_points_point_id_fkey" FOREIGN KEY ("point_id") REFERENCES "points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "points" ADD CONSTRAINT "points_by_user_id_fkey" FOREIGN KEY ("by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

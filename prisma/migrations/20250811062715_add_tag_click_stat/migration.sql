-- CreateTable
CREATE TABLE "TagClickStat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tagName" TEXT NOT NULL,
    "weekStart" DATETIME NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE INDEX "TagClickStat_weekStart_count_idx" ON "TagClickStat"("weekStart", "count");

-- CreateIndex
CREATE UNIQUE INDEX "TagClickStat_tagName_weekStart_key" ON "TagClickStat"("tagName", "weekStart");

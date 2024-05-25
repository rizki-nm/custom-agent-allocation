-- CreateTable
CREATE TABLE "queues" (
    "room_id" TEXT NOT NULL,
    "resolved" BOOLEAN NOT NULL,
    "agent_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "queues_room_id_key" ON "queues"("room_id");

-- AddForeignKey
ALTER TABLE "queues" ADD CONSTRAINT "queues_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agents"("agent_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "queues" DROP CONSTRAINT "queues_agent_id_fkey";

-- AlterTable
ALTER TABLE "queues" ALTER COLUMN "agent_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "queues" ADD CONSTRAINT "queues_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agents"("agent_id") ON DELETE SET NULL ON UPDATE CASCADE;

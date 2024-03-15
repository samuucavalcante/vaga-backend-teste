import QueueBull, { Queue as QueueBullType } from "bull";
import { dotenv } from "config/dotenv";
import * as jobs from "jobs/index";

type QueueModel = {
  bull: QueueBullType;
  queueName: string;
  handle: (data: any) => Promise<void>;
};

export class Queue {
  private queues: QueueModel[] = [];

  constructor() {
    this.queues = Object.values(jobs).map((job) => {
      return {
        bull: new QueueBull(job.key, {
          redis: {
            port: dotenv.REDIS_PORT,
            host: dotenv.REDIS_HOST,
          },
        }),
        handle: job.handle,
        queueName: job.key,
      };
    });
  }

  public add(queueName: string, data: any) {
    const queue = this.queues.find(
      (queue) => queue.queueName === queueName,
    ) as QueueModel;

    queue.bull.add(data);
  }

  public process() {
    return this.queues.forEach(async (queue) => {
      await queue.bull.process((job, done) => {
        queue.handle(job.data);
        done();
      });
    });
  }
}

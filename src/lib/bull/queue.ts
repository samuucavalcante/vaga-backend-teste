import QueueBull, { Queue as QueueBullType } from "bull";
import * as jobs from "jobs/index";

type QueueModel = {
  bull: QueueBullType;
  queueName: string;
  handle: (data: any) => Promise<void>;
};

export class Queue {
  private queues: QueueModel[] = [];

  constructor() {
    Object.values(jobs).forEach((Job) => {
      const instanceOfJob = new Job();

      this.queues.push({
        bull: new QueueBull(instanceOfJob.key),
        handle: instanceOfJob.handle,
        queueName: instanceOfJob.key,
      });
    });
  }

  public add(queueName: string, data: any) {
    const queue = this.queues.find(
      (queue) => queue.queueName === queueName,
    ) as QueueModel;

    const dataToString = JSON.stringify(data);

    return queue.bull.add(dataToString);
  }

  public async process() {
    return this.queues.forEach((queue) => {
      queue.bull.process((job) => {
        const dataToJson = JSON.parse(job.data);
        queue.handle(dataToJson);
      });
    });
  }
}

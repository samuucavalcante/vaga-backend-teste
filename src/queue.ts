import { Queue } from "lib/bull/queue";

const queue = new Queue();
console.info(`processId [${process.pid}] -> Queue`);

queue.process();

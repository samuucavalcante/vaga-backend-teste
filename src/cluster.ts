import cluster from "node:cluster";
import os from "node:os";

if (cluster.isPrimary) {
  const cpus = os.cpus();

  (async () => await import("./server"))();

  for (let i = 0; i < cpus.length; i++) {
    cluster.fork();
  }
}

if (cluster.isWorker) {
  (async () => await import("./queue"))();
}

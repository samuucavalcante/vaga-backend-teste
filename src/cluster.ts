import cluster from "node:cluster";
import os from "node:os";

const cpus = os.cpus();
if (cluster.isPrimary) {
  (async () => await import("./server"))();

  for (const _cpu of cpus) {
    cluster.fork();
  }
} else {
  (async () => await import("./queue"))();
}

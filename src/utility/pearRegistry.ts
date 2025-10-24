// src/utility/pearClient.ts
// @ts-ignore - Module declarations via global.d.ts
import Corestore from "corestore";
// @ts-ignore - Module declarations via global.d.ts
import Hyperdrive from "hyperdrive";

export type PearClient = {
  corestore: Corestore;
  hyperdrive: Hyperdrive;
};

let cached: PearClient | null = null;

export function initPearClient(): PearClient {
  if (!cached) {
    const corestore = new Corestore(Pear.config.storage);
    const hyperdrive = new Hyperdrive(corestore);

    cached = { corestore, hyperdrive };
  }
  return cached;
}

export function getPearClient(): PearClient {
  if (!cached) {
    throw new Error(
      "Pear client not initialized. Call initPearClient() first."
    );
  }
  return cached;
}

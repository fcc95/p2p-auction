// Corestore module declaration
declare module "corestore" {
  interface CorestoreOptions {
    storage?: string;
    name?: string;
  }

  interface Corestore {
    ready(): Promise<void>;
    close(): Promise<void>;
    get(name: string, options?: CorestoreOptions): any;
    replicate(isInitiator?: boolean): any;
  }

  class Corestore {
    constructor(storage: string, options?: CorestoreOptions);
    ready(): Promise<void>;
    close(): Promise<void>;
    get(name: string, options?: CorestoreOptions): any;
    replicate(isInitiator?: boolean): any;
  }

  export = Corestore;
}

// Hyperdrive module declaration
declare module "hyperdrive" {
  interface HyperdriveOptions {
    sparse?: boolean;
    sparseMetadata?: boolean;
  }

  interface Hyperdrive {
    ready(): Promise<void>;
    close(): Promise<void>;
    exists(path: string): Promise<boolean>;
    get(path: string): Promise<Buffer>;
    put(path: string, data: Buffer): Promise<void>;
    watch(path: string): AsyncIterable<any>;
    replicate(isInitiator?: boolean): any;
  }

  class Hyperdrive {
    constructor(corestore: any, options?: HyperdriveOptions);
    ready(): Promise<void>;
    close(): Promise<void>;
    exists(path: string): Promise<boolean>;
    get(path: string): Promise<Buffer>;
    put(path: string, data: Buffer): Promise<void>;
    watch(path: string): AsyncIterable<any>;
    replicate(isInitiator?: boolean): any;
  }

  export = Hyperdrive;
}

// Pear runtime global types
interface PearRuntime {
  teardown: (callback: () => void | Promise<void>) => void;
  versions: any;
  config: any;
}

declare global {
  interface Window {
    Pear?: PearRuntime;
  }

  // Global Pear variable for runtime environment
  const Pear: PearRuntime;
}

export {};

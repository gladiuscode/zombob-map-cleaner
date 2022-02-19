import {
  Database, OPEN_READWRITE,
} from 'sqlite3';

class DatabaseService {
  private instance?: Database;
  private readonly _path: string;

  constructor(path: string) {
    this._path = path;
  }

  async open() {
    this.instance = await new Promise<Database>((resolve, reject) => {
      const db = new Database(this._path, OPEN_READWRITE, err => err && reject(err));
      resolve(db);
    });
  }

  async close() {
    if (!this.instance) {
      throw new Error('Database must be initialized');
    }

    await new Promise<void>((resolve, reject) => {
      this.instance!.close(err => err && reject(err));
      resolve();
    });
  }

  async runQuery<T>(query: string, params?: unknown[]) {
    if (!this.instance) {
      throw new Error('Database must be initialized');
    }
    return new Promise<T[]>((resolve, reject) => {
      try {
        const callback = () => {
          const resultsHandler = <T>(error: Error, rows: T[]) => {
            error && reject(error);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-mixed-spaces-and-tabs
		    resolve(rows);
          };
		this.instance!.all(query, params, resultsHandler);
        };
		this.instance!.serialize(callback);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default DatabaseService;

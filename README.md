# @subsquid/duckdb-store

This package provides CSV and Parquet based database access to squid mapping.

## Usage example

```ts
const Transfers = new Table('transfers', {
    blockNumber: types.int,
    timestamp: types.timestamp,
    extrinsicHash: {type: types.string, nullable: true},
    from: types.string,
    to: types.string,
    amount: types.bigint,
})

const db = new CsvDatabase([Transfers], {
    dest: `./data`,
    chunkSize: 10,
    updateInterval: 100_000,
})

processor.run(db, async (ctx) => {
    let transfersData = getTransfers(ctx)
    ctx.store.write(Transfers, transfersData)
})
```
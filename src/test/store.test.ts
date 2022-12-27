import {CsvDatabase, ParquetDatabase} from '../database'
import {Table, TableRecord} from '../table'
import {List, Struct, types} from '../table'

describe('Store', function () {
    let table = new Table('test', {
        string: types.string,
        tinyInt: types.tinyInt,
        smallInt: types.smallInt,
        int: types.int,
        bigInt: types.bigInt,
        hugeInt: types.hugeInt,
        uTinyInt: types.uTinyInt,
        uSmallInt: types.uSmallInt,
        uInt: types.uInt,
        uBigInt: types.uBigInt,
        float: types.float,
        double: types.double,
        boolean: types.boolean,
        timestamp: types.timestamp,
        timestampz: types.timestampz,
        nullableString: {type: types.string, nullable: true},
        list: List(types.string),
        struct: Struct({
            foo: types.string,
            bar: types.int,
        }),
    })

    type Record = TableRecord<typeof table>

    let record1: Record = {
        string: 'string',
        tinyInt: 1,
        smallInt: 2,
        int: 3,
        bigInt: 4n,
        hugeInt: 5n,
        uTinyInt: 1,
        uSmallInt: 2,
        uInt: 3,
        uBigInt: 4n,
        float: 0.1,
        double: 0.1,
        boolean: true,
        timestamp: new Date(),
        timestampz: new Date(),
        nullableString: null,
        list: ['a', 'b', 'c'],
        struct: {
            foo: 'foo',
            bar: 0,
        },
    }

    let record2: Record = {
        string: 'string',
        tinyInt: 100,
        smallInt: 2456,
        int: 34684631,
        bigInt: 448468676564n,
        hugeInt: 170141183460469231731687303715884105727n,
        uTinyInt: 255,
        uSmallInt: 65535,
        uInt: 4294967295,
        uBigInt: 477864764646465n,
        float: 0.1111111111111,
        double: 0.11111111111111111,
        boolean: true,
        timestamp: new Date(),
        timestampz: new Date(),
        nullableString: null,
        list: ['a', 'b', 'c'],
        struct: {
            foo: 'foo',
            bar: 0,
        },
    }

    it('csv', async function () {
        let db = new CsvDatabase([table], {dest: './src/test/data'})
        await db.connect()
        await db.transact(0, 0, async (store) => {
            await store.write(table, [record1, record2])
        })
        await db.outputTables('./')
        await db.close()
    })

    it('parquet', async function () {
        let db = new ParquetDatabase([table], {dest: './src/test/data'})
        await db.connect()
        await db.transact(0, 0, async (store) => {
            await store.write(table, [record1, record2])
        })
        await db.outputTables('./')
        await db.close()
    })
})

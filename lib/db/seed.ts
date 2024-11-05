import db from ".";
import { sampleProducts } from "./pgdata/products";
// import { sampleUsers } from "./pgdata/users";
import { products, users } from "./schema";

function isTuple<T extends any>(array: T[]): array is [T, ...T[]] {
  return array.length > 0;
}

const main = async () => {
  console.log("-----------Seeding started ------------");
  try {
    const batchQ = sampleProducts.map((a) => db.insert(products).values(a));
    if (isTuple(batchQ)) {
      await db.transaction(async (trx) => {
        for (const query of batchQ) {
          await trx.execute(query);
        }
      });
    }
    console.log("-----------Seeding finished ------------");
  } catch (e) {
    console.log("-----------Seeding failed ------------");
    console.log(e);
  }
};

main();

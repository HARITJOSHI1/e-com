import db from ".";
import { sampleProducts } from "./pgdata/products";
import { sampleUsers } from "./pgdata/users";
import { addresses } from "./pgdata/address";
import { shippingAddress, billingAddress } from "./schema";
// import { products, users } from "./schema";

function isTuple<T extends any>(array: T[]): array is [T, ...T[]] {
  return array.length > 0;
}

const main = async () => {
  console.log("-----------Seeding started ------------");
  try {
    const batchQ = [db.insert(billingAddress).values(addresses)];
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

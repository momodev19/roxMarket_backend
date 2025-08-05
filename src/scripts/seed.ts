import { PrismaClient } from "@prisma/client";
import { ITEM_TYPE_IDS, ITEM_TYPE_NAMES } from "../constants/itemTypes";
import {
  MINING,
  GATHERING,
  FISHING,
  CRAFTING,
  EQUIPMENT_CULTIVATION,
} from "../constants/items";
const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.itemPrice.deleteMany();
  await prisma.item.deleteMany();
  await prisma.itemType.deleteMany();
}

async function seedItemTypes() {
  const itemTypesData = Object.entries(ITEM_TYPE_IDS).map(([key, id]) => ({
    id,
    name: ITEM_TYPE_NAMES[id as keyof typeof ITEM_TYPE_NAMES], // match name by id
  }));

  return await Promise.all(
    itemTypesData.map(({ id, name }) =>
      prisma.itemType.create({
        data: { id, name },
      })
    )
  );
}

async function seedItems(itemTypes: { id: number; name: string }[]) {
  const map: number[] = [];
  let itemData: string[] = [];

  for (const type of itemTypes) {
    switch (type.id) {
      case ITEM_TYPE_IDS.MINING:
        itemData = [...MINING];
        break;

      case ITEM_TYPE_IDS.GATHERING:
        itemData = [...GATHERING];
        break;

      case ITEM_TYPE_IDS.FISHING:
        itemData = [...FISHING];
        break;

      case ITEM_TYPE_IDS.CRAFTING:
        itemData = [...CRAFTING];
        break;

      case ITEM_TYPE_IDS.EQUIPMENT_CULTIVATION:
        itemData = [...EQUIPMENT_CULTIVATION];
        break;

      default:
        throw new Error(`Missing ItemType: ${type.name}`);
    }

    for (const item of itemData) {
      const created = await prisma.item.create({
        data: {
          name: item,
          typeId: type.id,
        },
      });

      map.push(created.id);
    }
  }

  return map;
}

async function seedItemPrices(itemsMap: number[]) {
  const today = new Date();
  const pricesData: { itemId: number; price: number; date: Date }[] = [];

  for (const item of itemsMap) {
    pricesData.push({ itemId: item, price: 0, date: today });
  }

  await prisma.itemPrice.createMany({ data: pricesData });
}

async function main() {
  await clearDatabase();
  const itemTypes = await seedItemTypes();
  const itemsMap = await seedItems(itemTypes);
  await seedItemPrices(itemsMap);

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

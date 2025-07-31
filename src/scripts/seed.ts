import { PrismaClient } from "@prisma/client";
import { itemTypeIds, itemTypeNames } from "../constants/itemTypes";
const prisma = new PrismaClient();

// Ragnarok X Items
const itemsData = [
  { name: "Lv. 1 Upgrading Metal", typeName: "Mining" },
  { name: "Lv. 1 Muspellium", typeName: "Mining" },
  { name: "Pumpkin", typeName: "Gathering" },
  { name: "Wheat", typeName: "Gathering" },
  { name: "Water Weed", typeName: "Fishing" },
  { name: "Giant Tiger Prawn", typeName: "Fishing" },
  { name: "STR Stone I", typeName: "Crafting" },
  { name: "AGI Stone I", typeName: "Crafting" },
  { name: "Phracon I", typeName: "Equipment Cultivation" },
  { name: "Carnium I", typeName: "Equipment Cultivation" },
];

async function clearDatabase() {
  await prisma.itemPrice.deleteMany();
  await prisma.item.deleteMany();
  await prisma.itemType.deleteMany();
}

async function seedItemTypes() {
  const itemTypesData = Object.entries(itemTypeIds).map(([key, id]) => ({
    id,
    name: itemTypeNames[id as keyof typeof itemTypeNames], // match name by id
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
  const map: Record<string, number> = {};

  for (const item of itemsData) {
    const type = itemTypes.find((t) => t.name === item.typeName);
    if (!type) throw new Error(`Missing ItemType: ${item.typeName}`);

    const created = await prisma.item.create({
      data: {
        name: item.name,
        typeId: type.id,
      },
    });

    map[item.name] = created.id;
  }

  return map;
}

async function seedItemPrices(itemsMap: Record<string, number>) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const pricesData = [
    { itemId: itemsMap["Lv. 1 Upgrading Metal"], price: 100, date: yesterday },
    { itemId: itemsMap["Lv. 1 Upgrading Metal"], price: 110, date: today },
    { itemId: itemsMap["Lv. 1 Muspellium"], price: 500, date: yesterday },
    { itemId: itemsMap["Lv. 1 Muspellium"], price: 520, date: today },
    { itemId: itemsMap["Pumpkin"], price: 50, date: yesterday },
    { itemId: itemsMap["Pumpkin"], price: 55, date: today },
    { itemId: itemsMap["Wheat"], price: 30, date: yesterday },
    { itemId: itemsMap["Wheat"], price: 35, date: today },
    { itemId: itemsMap["Water Weed"], price: 80, date: yesterday },
    { itemId: itemsMap["Water Weed"], price: 85, date: today },
    { itemId: itemsMap["Giant Tiger Prawn"], price: 90, date: yesterday },
    { itemId: itemsMap["Giant Tiger Prawn"], price: 95, date: today },
    { itemId: itemsMap["STR Stone I"], price: 200, date: yesterday },
    { itemId: itemsMap["STR Stone I"], price: 210, date: today },
    { itemId: itemsMap["AGI Stone I"], price: 180, date: yesterday },
    { itemId: itemsMap["AGI Stone I"], price: 185, date: today },
    { itemId: itemsMap["Phracon I"], price: 500, date: yesterday },
    { itemId: itemsMap["Phracon I"], price: 520, date: today },
    { itemId: itemsMap["Carnium I"], price: 1000, date: yesterday },
    { itemId: itemsMap["Carnium I"], price: 1020, date: today },
  ];

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

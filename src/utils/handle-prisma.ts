// This file contains utility functions for handling Prisma operations with error management.

/**
 *
 * @param promise - A promise that resolves to a Prisma operation result
 * @param contextMessage - A message to include in case of an error
 * @returns The result of the Prisma operation or throws an error
 *
 * @throws Will throw an error if the item is not found or if there is a database error
 */
export async function handlePrisma<T>(
  promise: Promise<T>,
  contextMessage: string
): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${contextMessage}: ${error.message}`);
    }
    throw new Error(`${contextMessage}: Unknown error`);
  }
}

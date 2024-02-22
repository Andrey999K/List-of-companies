const includesItem = <T extends { id: number }>(mass: Array<T>, item: T): boolean => mass.some(c => c.id === item.id);

export default includesItem;

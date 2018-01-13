const renameSortKey = (oldKey: string, newKey: string) => {
  return (sort: any): any => {
    return Object.keys(sort).reduce((result, sortKey) => {
      const sortValue = sort[sortKey];
      if (sortKey === oldKey) {
        return {
          ...result,
          [newKey]: sortValue,
        };
      }
      result[sortKey] = sortValue;
      return result;
    }, {} as any);
  };
};

export default renameSortKey;

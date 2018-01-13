import parseFilterKey from './parseFilterKey';

export default parseFilterKey('id', (id: any) => {
  return { _id: id };
});

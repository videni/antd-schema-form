import isPlainObject from 'lodash-es/isPlainObject';

/**
 * object对象，格式化成表单需要的值
 * @param { object } obj: 对象
 * @param { string } basicId: 前置id
 */
function getObjectFromValue(obj: object, basicId?: string): object {
  let value: object = {};

  for (const key in obj) {
    const item: any = obj[key];

    if (isPlainObject(item) && !item._isAMomentObject) {
      const bid: string = basicId ? `${ basicId }/${ key }/properties` : `${ key }/properties`;
      const result: object = getObjectFromValue(item, bid);

      value = { ...value, ...result };
    } else {
      value[basicId ? `${ basicId }/${ key }` : key] = item;
    }
  }

  return value;
}

export default getObjectFromValue;
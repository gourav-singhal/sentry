import flatMap from 'lodash/flatMap';

export function filterItems(items, inputValue) {
  return items.filter(
    item =>
      (item.searchKey || `${item.value} ${item.label}`)
        .toLowerCase()
        .indexOf(inputValue.toLowerCase()) > -1
  );
}

export function filterGroupedItems(groups, inputValue) {
  return groups
    .map(group => ({
      ...group,
      items: this.filterItems(group.items, inputValue),
    }))
    .filter(group => group.items.length > 0);
}

export function filterGroupedItems(groups, inputValue) {
  return groups
    .map(group => ({
      ...group,
      items: this.filterItems(group.items, inputValue),
    }))
    .filter(group => group.items.length > 0);
}

export function autoCompleteFilter(items, inputValue) {
  let itemCount = 0;

  if (!items) {
    return [];
  }

  if (items[0] && items[0].items) {
    //if the first item has children, we assume it is a group
    return flatMap(this.filterGroupedItems(items, inputValue), item => {
      const groupItems = item.items.map(groupedItem => ({
        ...groupedItem,
        index: itemCount++,
      }));

      // Make sure we don't add the group label to list of items
      // if we try to hide it, otherwise it will render if the list
      // is using virtualized rows (because of fixed row heights)
      if (item.hideGroupLabel) {
        return groupItems;
      }

      return [{...item, groupLabel: true}, ...groupItems];
    });
  }

  return this.filterItems(items, inputValue).map((item, index) => ({...item, index}));
}

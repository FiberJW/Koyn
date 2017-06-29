import _sortBy from "lodash/sortBy";

export const SORT_TYPES = {
  marketCap: "marketCap",
  change: "change"
};

export const sortByType = (priceList, sortBy) => {
  switch (sortBy) {
    case SORT_TYPES.marketCap:
      return _sortBy(priceList, x => -x.marketCap);
    case SORT_TYPES.change:
      return _sortBy(priceList, x => -Math.abs(x.change));
    default:
      return priceList;
  }
};

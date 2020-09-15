import React from 'react';
import styled from '@emotion/styled';
import {AutoSizer, List as ReactVirtualizedList, ListRowProps} from 'react-virtualized';

import {Item, ItemSize, GetItemArgs} from './types';
import Row from './row';

type Props = {
  // flat item array | grouped item array
  items: Array<Item>;

  /**
   * Max height of dropdown menu. Units are assumed as `px`
   */
  maxHeight: number;

  // The highlight index according the search
  highlightedIndex: number;
  getItemProps: (args: GetItemArgs) => void;

  /**
   * Search field's input value
   */
  inputValue: string;

  /**
   * Callback for when dropdown menu is being scrolled
   */
  onScroll?: () => void;

  /**
   * If you use grouping with virtualizedHeight, the labels will be that height unless specified here
   */
  virtualizedLabelHeight?: number;

  /**
   * Supplying this height will force the dropdown menu to be a virtualized list.
   * This is very useful (and probably required) if you have a large list. e.g. Project selector with many projects.
   *
   * Currently, our implementation of the virtualized list requires a fixed height.
   */
  virtualizedHeight?: number;

  /**
   * Size for dropdown items
   */
  itemSize?: ItemSize;
};

function getHeight(
  items: Array<Item>,
  maxHeight: number,
  virtualizedHeight: number,
  virtualizedLabelHeight?: number
) {
  const minHeight = virtualizedLabelHeight
    ? items.reduce(
        (a, r) => a + (r.groupLabel ? virtualizedLabelHeight : virtualizedHeight),
        0
      )
    : items.length * virtualizedHeight;
  return Math.min(minHeight, maxHeight);
}

const List = ({
  virtualizedHeight,
  virtualizedLabelHeight,
  onScroll,
  items,
  itemSize,
  highlightedIndex,
  inputValue,
  getItemProps,
  maxHeight,
  ...props
}: Props) => {
  if (virtualizedHeight) {
    return (
      <AutoSizer disableHeight>
        {({width}) => (
          <StyledList
            width={width}
            height={getHeight(
              items,
              maxHeight,
              virtualizedHeight,
              virtualizedLabelHeight
            )}
            onScroll={onScroll}
            rowCount={items.length}
            rowHeight={({index}) =>
              items[index].groupLabel && virtualizedLabelHeight
                ? virtualizedLabelHeight
                : virtualizedHeight
            }
            rowRenderer={({key, index, style}: ListRowProps) => (
              <Row
                key={key}
                item={items[index]}
                index={index}
                style={style}
                itemSize={itemSize}
                highlightedIndex={highlightedIndex}
                inputValue={inputValue}
                getItemProps={getItemProps}
                {...props}
              />
            )}
          />
        )}
      </AutoSizer>
    );
  }

  return (
    <React.Fragment>
      {items.map((item, index) => (
        <Row
          key={item.value}
          item={item}
          index={index}
          itemSize={itemSize}
          highlightedIndex={highlightedIndex}
          inputValue={inputValue}
          getItemProps={getItemProps}
          {...props}
        />
      ))}
    </React.Fragment>
  );
};

export default List;

const StyledList = styled(ReactVirtualizedList)`
  outline: none;
`;

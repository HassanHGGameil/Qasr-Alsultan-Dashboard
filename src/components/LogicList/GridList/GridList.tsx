import { JSX } from "react";

type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => JSX.Element;
  emptyMessage: string;
  className?: string;
  itemClassName?: string;
};

const GridList = <T extends { slug?: string; id?: string | number }>({
  emptyMessage,
  records,
  renderItem,
  className = "",
  itemClassName = "",
}: GridListProps<T>) => {
  
  if (records.length === 0) {
    return <div className={`text-center p-4 ${className}`}>{emptyMessage}</div>;
  }

  return (
    <div className={`${className}`}>
      {records.map((record) => (
        <div
          key={record.slug || record.id || JSON.stringify(record)}
          className={itemClassName}
        >
          {renderItem(record)}
        </div>
      ))}
    </div>
  );
};

export default GridList;
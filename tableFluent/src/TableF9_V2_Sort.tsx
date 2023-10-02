import * as React from "react";
import update from "immutability-helper";
import { Card } from "./Card";
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from "@fluentui/react-icons";
import {
  PresenceBadgeStatus,
  Avatar,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  useTableFeatures,
  //   TableColumnDefinition,
  TableColumnId,
  useTableSort,
  TableCellLayout,
  //   createTableColumn,
} from "@fluentui/react-components";

import { useCallback, useState, useEffect } from "react";

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSX.Element;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: "Meeting notes", icon: <DocumentRegular /> },
    author: { label: "Max Mustermann", status: "available" },
    lastUpdated: { label: "7h ago", timestamp: 3 },
    lastUpdate: {
      label: "You edited this",
      icon: <EditRegular />,
    },
  },
  {
    file: { label: "Thursday presentation", icon: <FolderRegular /> },
    author: { label: "Erika Mustermann", status: "busy" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: "Training recording", icon: <VideoRegular /> },
    author: { label: "John Doe", status: "away" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
    author: { label: "Jane Doe", status: "offline" },
    lastUpdated: { label: "Tue at 9:30 AM", timestamp: 1 },
    lastUpdate: {
      label: "You shared this in a Teams chat",
      icon: <PeopleRegular />,
    },
  },
];

const Table_V9_V2_Sort = () => {
  const [columns, setColumns] = useState([
    {
      columnId: "file",
      compare: (a, b) => {
        return a.file.label.localeCompare(b.file.label);
      },
      text: "File",
    },
    {
      columnId: "author",
      compare: (a, b) => {
        return a.author.label.localeCompare(b.author.label);
      },
      text: "Author",
    },
    {
      columnId: "lastUpdated",
      compare: (a, b) => {
        return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
      },
      text: "Last Updated",
    },
    {
      columnId: "lastUpdate",
      compare: (a, b) => {
        return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
      },
      text: "Last Update",
    },
  ]);

  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSort({
        defaultSortState: { sortColumn: "file", sortDirection: "ascending" },
      }),
    ]
  );

  useEffect(() => {}, [columns]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setColumns((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item],
        ],
      })
    );
  }, []);

  const renderCard = useCallback(
    (card: { columnId: number; text: string }, index: number) => {
      return (
        <Card
          key={card.columnId}
          index={index}
          id={card.columnId}
          text={card.text}
          moveCard={moveCard}
        />
      );
    },
    [moveCard]
  );

  const headerSortProps = (columnId: TableColumnId) => ({
    onClick: (e: React.MouseEvent) => {
      toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

  useEffect(() => {
    console.log(rows, "INI ROWS");
  }, [rows]);

  return (
    <Table sortable aria-label="Table with sort">
      <TableHeader>
        <TableRow>
          {columns.map((column, i) => {
            console.log(column);
            return (
              <TableHeaderCell
                key={column.columnId}
                {...headerSortProps(`${column.columnId}`)}
              >
                {renderCard(column, i)}
              </TableHeaderCell>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((item) => (
          <TableRow key={item.item.file.label}>
            {columns.map((column) => {
              switch (column.columnId) {
                case "file":
                  return (
                    <TableCell>
                      <TableCellLayout media={item.item.file.icon}>
                        {item.item.file.label}
                      </TableCellLayout>
                    </TableCell>
                  );
                case "author":
                  return (
                    <TableCell>
                      <TableCellLayout
                        media={
                          <Avatar
                            aria-label={item.item.author.label}
                            name={item.item.author.label}
                            badge={{
                              status: item.item.author
                                .status as PresenceBadgeStatus,
                            }}
                          />
                        }
                      >
                        {item.item.author.label}
                      </TableCellLayout>
                    </TableCell>
                  );
                case "lastUpdated":
                  return <TableCell>{item.item.lastUpdated.label}</TableCell>;
                case "lastUpdate":
                  return (
                    <TableCell>
                      <TableCellLayout media={item.item.lastUpdate.icon}>
                        {item.item.lastUpdate.label}
                      </TableCellLayout>
                    </TableCell>
                  );
                default:
                  return null;
              }
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Table_V9_V2_Sort;

/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react'
import { useFilters, useSortBy, useTable } from 'react-table'
import { Box } from '@chakra-ui/layout'
import { BsFillCaretUpFill, BsCaretDownFill } from 'react-icons/bs'

function DefaultColumnFilter() {
  return <Box minH="30px" />
}

function Table({ columns, data }) {
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useSortBy
  )

  // Render the UI for your table
  return (
    <table {...getTableProps()} className="table-styles">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <Box
                  borderBottom="1px solid"
                  borderColor="#eef0fe"
                  py="0.75rem"
                  d="flex"
                  flexDir="row"
                  justifyContent="center"
                  fontSize="sm"
                >
                  {column.render('Header')}{' '}
                  <Box d="flex" flexDir="row" ml="1rem">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <BsCaretDownFill size="10px" />
                      ) : (
                        <BsFillCaretUpFill size="10px" />
                      )
                    ) : (
                      <Box d="flex" flexDir="column">
                        <BsFillCaretUpFill size="10px" />
                        <BsCaretDownFill size="10px" />
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </Box>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function TableWrapper({ columns, data }) {
  return <Table columns={columns} data={data} />
}

export default TableWrapper

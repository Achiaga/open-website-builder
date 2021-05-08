/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useFilters, useSortBy, useTable } from 'react-table'
import { Box } from '@chakra-ui/layout'

const Styles = styled.div`
  padding: 1rem;
  width: 100%;
  table {
    border-spacing: 0;
    border: 1px solid #eef0fe;
    width: 100%;
    tr {
      :first-child {
        th {
          background-color: #506bf0;
          color: white;
          padding-left: 0;
          padding-right: 0;
          font-weight: 500;
          font-size: 16px;
        }
      }
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #eef0fe;
      border-right: 1px solid #eef0fe;

      :first-child {
        background-color: #506bf0;
        color: white;
        font-weight: 500;
        font-size: 16px;
      }

      :last-child {
        border-right: 0;
      }
    }
  }
`

function DefaultColumnFilter() {
  return <div>Hola</div>
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
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <Box borderBottom="1px solid" borderColor="#eef0fe" py="1rem">
                  {column.render('Header')}{' '}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}
                  </span>
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
  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default TableWrapper

import { useMemo } from 'react'
import TableWrapper from './table'
import fakeData from './fake-data.json'
import { Box } from '@chakra-ui/layout'

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach((row) => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <Box
      color="white"
      bg="transparent"
      onClick={(e) => e.stopPropagation()}
      h="100%"
      d="flex"
      justifyContent="center"
      alignItems="center"
    >
      <select
        style={{
          padding: '5px 10px',
          borderRadius: '5px',
          backgroundColor: 'transparent',
        }}
        w="100%"
        bg="white"
        color="gray.500"
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Box>
  )
}

const ComparisonTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: '#',
        Cell: (instance) => instance?.cell?.value || '',
      },
      {
        Header: 'Website Builder',
        accessor: 'name',
        Cell: (instance) => instance?.cell?.value || '',
      },
      {
        Header: 'Score',
        accessor: 'score',
        Cell: (instance) => instance?.cell?.value || '',
      },
      {
        Header: 'Builder Type',
        accessor: 'type',
        Cell: (instance) => instance?.cell?.value || '',
      },
      {
        Header: 'Ease of  use',
        accessor: 'ease-of-use',
        Cell: (instance) => instance?.cell?.value || '',
      },
      {
        Header: 'Use Case',
        accessor: 'use-case',
        Cell: (instance) => instance?.cell?.value || '',
      },
      {
        Header: 'Customizable rate',
        accessor: 'customizable',
        Cell: (instance) => instance?.cell?.value || '',
      },
      {
        Header: 'Free plan',
        accessor: 'free-plan',
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: (instance) => instance?.cell?.value || '',
      },
    ],
    []
  )

  return (
    <Box minH="400px" px="4rem">
      <TableWrapper data={fakeData} columns={columns} />
    </Box>
  )
}

export default ComparisonTable

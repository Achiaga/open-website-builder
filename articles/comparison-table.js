import { useMemo } from 'react'
import TableWrapper from './table'
import fakeData from './fake-data.json'
import { Badge, Box } from '@chakra-ui/layout'

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach((row) => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

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

const pillsColorMapping = {
  'e-commerce': 'primary',
  designers: 'green',
  blogs: 'gray',
  easy: 'green',
  medium: 'gray',
  hard: 'red',
  templates: 'yellow',
  'unique design': 'blue',
}

function getPills(items) {
  const itemsList = items.split(',')
  return itemsList.map((item, index) => {
    const color = pillsColorMapping[item.toLowerCase().trim()]
    return (
      <Badge colorScheme={color} key={index} variant="solid" mr="0.3rem">
        {item}
      </Badge>
    )
  })
}

const ComparisonTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: '#',
        Cell: (instance) => {
          return instance?.row?.id || ''
        },
      },
      {
        Header: 'Website Builder',
        accessor: 'name',
        Cell: (instance) => instance?.cell?.value || '',
      },
      // {
      //   Header: 'Score',
      //   accessor: 'score',
      //   Cell: (instance) => instance?.cell?.value || '',
      //   Filter: SelectColumnFilter,
      //   filter: 'includes',
      // },

      {
        Header: 'Ease of  use',
        accessor: 'ease-of-use',
        Cell: (instance) => instance?.cell?.value || '',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Use Case',
        accessor: 'use-case',
        Cell: (instance) => {
          return getPills(instance?.cell?.value || '')
        },
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      // {
      //   Header: 'Customizable score',
      //   accessor: 'customizable',
      //   Cell: (instance) => instance?.cell?.value || '',
      //   Filter: SelectColumnFilter,
      //   filter: 'includes',
      // },
      {
        Header: 'Free plan',
        accessor: 'free-plan',
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: (instance) => instance?.cell?.value || '',
      },
      {
        Header: 'Builder Type',
        accessor: 'tags',
        Cell: (instance) => {
          return getPills(instance?.cell?.value || '')
        },
        Filter: SelectColumnFilter,
        filter: 'includes',
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

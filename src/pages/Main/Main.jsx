import { useState } from 'react'
import { Table } from 'antd'

import { TableRowModal } from '../../components/TableRowModal/TableRowModal'

import styles from './Main.module.css'

const data = [
  { id: 1, title: 'First Item', time: '2024-11-09' },
  { id: 2, title: 'Second Item', time: '2024-11-10' },
  { id: 3, title: 'Third Item', time: '2024-11-11' },
]

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
]

export const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [currentRecord, setCurrentRecord] = useState({
    id: '',
    title: '',
    time: '',
  })

  return (
    <>
      <div className={styles['wrapper']}>
        <div className={styles['table-wrapper']}>
          <h1>Services:</h1>
          <Table
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  setCurrentRecord(record)
                  setIsModalOpen(true)
                },
              }
            }}
            dataSource={data}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </div>
      </div>
      <TableRowModal
        id={currentRecord.id}
        title={currentRecord.title}
        time={currentRecord.time}
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
      />
    </>
  )
}

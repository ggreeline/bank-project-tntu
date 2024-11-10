import { Modal, Button } from 'antd'

export const TableRowModal = ({ id, title, time, onClose, isOpen }) => {
  const handleOk = () => {
    onClose()
  }

  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Back
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Get in queue
        </Button>,
      ]}
    >
      <p>{time}</p>
    </Modal>
  )
}

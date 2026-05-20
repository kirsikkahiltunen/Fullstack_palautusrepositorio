import { Alert } from '@mui/material'

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <Alert label = 'successNotification' style={{ marginTop: 10, marginBottom: 10 }} severity='success'>
      {message}
    </Alert>
  )
}

export default SuccessNotification
import { useMessage } from "../store"
const Notification = () => {
  const message = useMessage()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  if(message){
    return <div style={style}>{ message }</div>
  }
}

export default Notification
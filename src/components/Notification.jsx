
export default function Notification({ type, message }) {

  if (message === null) {
    return null
  }

  return (
    <div id="error" className={type === 'add' ? 'bg-green-700 text-lg p-5 rounded my-2' : 'bg-red-600 text-lg p-5 rounded my-2'}>
      {message}
    </div>
  )
}

import MailchimpSubscribe from 'react-mailchimp-subscribe'
import { CustomForm } from './components/CustomForm'

export function App() {
  const url = import.meta.env.VITE_MAILCHIMP_URL

  return (
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <CustomForm subscribe={subscribe} status={status} message={message} />
      )}
    />
  )
}

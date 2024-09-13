declare module 'react-mailchimp-subscribe' {
  import type { ComponentType } from 'react'

  export interface MailchimpSubscribeProps {
    url: string
    render: (args: {
      subscribe: (data: { EMAIL: string }) => void
      status: 'sending' | 'success' | 'error'
      message: string
    }) => JSX.Element
  }

  const MailchimpSubscribe: ComponentType<MailchimpSubscribeProps>

  export default MailchimpSubscribe
}

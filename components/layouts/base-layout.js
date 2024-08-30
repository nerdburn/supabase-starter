import ErrorBoundary from 'components/error-boundary'
import { Notification } from 'components/notification/'
import { SvgDefs } from 'components/svg-defs'

export const BaseLayout = ({ children }) => {
  return (
    <>
      <Notification />
      <ErrorBoundary>{children}</ErrorBoundary>
      <SvgDefs />
    </>
  )
}

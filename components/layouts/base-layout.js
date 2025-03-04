import ErrorBoundary from 'components/error-boundary'
import { Notification } from 'components/notification/'
import { TopNav } from 'components/top-nav'
import { SvgDefs } from 'components/svg-defs'

export const BaseLayout = ({ children }) => {
  return (
    <>
      <TopNav />
      <Notification />
      <ErrorBoundary>{children}</ErrorBoundary>
      <SvgDefs />
    </>
  )
}

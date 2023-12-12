import { hooks } from '@jill64/npm-demo-layout'
import { init } from '@jill64/sentry-sveltekit-cloudflare/server'

const { onHandle, onError } = init(
  'https://a7967607736103c7c5ac526bfaee277a@o4505814639312896.ingest.sentry.io/4506267288993792'
)

export const handle = onHandle(hooks)
export const handleError = onError()

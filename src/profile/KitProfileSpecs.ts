import { SpecFactory, SwaggerDocItem } from '@fangcha/router'
import { KitProfileApis } from '../apis'
import { FangchaSession } from '@fangcha/router/lib/session'

const factory = new SpecFactory('Profile')

factory.prepare(KitProfileApis.BasicProfileGet, async (ctx) => {
  const session = ctx.session as FangchaSession
  ctx.body = session.curUserInfo()
})

export const KitProfileSpecs = factory.buildSpecs()

export const KitProfileSpecDocItem: SwaggerDocItem = {
  name: 'SSO',
  pageURL: '/api-docs/v1/profile-sdk',
  specs: KitProfileSpecs,
}

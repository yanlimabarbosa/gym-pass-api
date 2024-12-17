import { Environment } from 'vitest/environments'

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    console.log('setup')

    return {
      teardown() {
        console.log('teardown')
      },
    }
  },
}

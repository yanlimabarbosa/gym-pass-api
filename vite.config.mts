import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    dir: 'src',
    // vitest-enviroment-{prisma} - whatever name inside { }
    // go to vitest-enviroment-prisma and run npm link
    // then go to root dir, and run npm link vitest-environment-prisma
  },
})

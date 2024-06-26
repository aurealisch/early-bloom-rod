import dts from 'bun-plugin-dts';

const output = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  plugins: [dts()],
});

if (!output.success) {
  console.log(output);
}

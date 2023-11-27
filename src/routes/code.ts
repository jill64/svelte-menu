export const code = ({
  noOuterClosing,
  hoverOpen,
  floating,
  transition
}: {
  noOuterClosing: boolean
  hoverOpen: boolean
  floating: boolean
  transition: boolean
}) => /*html*/ `
<script>
  import { Menu } from '@jill64/svelte-menu'
</script>

<Menu let:state ${noOuterClosing ? 'noOuterClosing ' : ''}${
  hoverOpen ? 'hoverOpen ' : ''
}${transition ? '' : 'duration={0} '}${
  floating ? 'style="display: inline;" ' : ''
}>
  <h2>Menu - {state}</h2>
  <section slot="contents" let:close ${transition ? 'transition:slide ' : ''}>
    <!-- ... -->
  </section>
</Menu>
${
  floating
    ? /*html*/ `
<style>
  section {
    position: absolute;
    top: 0;
    left: 5rem;
  }
</style>`
    : ''
}`

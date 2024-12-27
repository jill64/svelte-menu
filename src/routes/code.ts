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
  {#snippet button(phase)}
    <h2>Menu - {phase}</h2>
  {/snippet}
  {#snippet contents(close)}
    <section ${transition ? 'transition:slide ' : ''}>
      <!-- ... -->
    </section>
    <button onclick={close}>
      Close
    </button>
  {/snippet}
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

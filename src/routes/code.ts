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

{#snippet button(state)}
  <h2>Menu - {state}</h2>
{/snippet}

{#snippet menu(close)}
  <section ${transition ? 'transition:slide ' : ''}>
    <!-- ... -->
  </section>
{/snippet}

<Menu let:state ${noOuterClosing ? 'noOuterClosing ' : ''}${
  hoverOpen ? 'hoverOpen ' : ''
}${transition ? '' : 'duration={0} '}${
  floating ? 'style="display: inline;" ' : ''
} {button} {menu} />
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

<script lang="ts">
    import { Resource, invoke } from '@tauri-apps/api/core';

  let name = ''
  let greetMsg = ''

  async function greet() {
    greetMsg = await invoke('greet', { name })
  }
</script>

<button on:click={greet}>Greet me</button>
<p>{greetMsg}</p>

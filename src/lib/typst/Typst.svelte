<script lang="ts">
    import setTypst from './set-typst';

    type typstFiles = {
        [key:string]:string
    }

    const { inputs = { '/main.typ': 'mainContent' } }: { inputs: typstFiles } = $props();

    const typst = setTypst();

    $effect(()=>{
        for (const [path, content] of Object.entries(inputs)) {
            typst.addSource(path, content);
        }
    })

    async function compile(): Promise<string> {
        const compiled = (await typst.pdf({ inputs, mainFilePath: '/main.typ' }))!;
        const blob = new Blob([compiled.buffer as ArrayBuffer], { type: 'application/pdf' });
        
        return URL.createObjectURL(blob);
    }

</script>

{#await compile() then compiled}
    <iframe class="flex-1" src={compiled} frameborder="0"></iframe>
{/await}
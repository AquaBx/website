<script lang="ts">
    import setTypst from './set-typst';

    type typstFiles = {
        [key:string]:string
    }

    const { 
        inputs = { '/main.typ': 'mainContent' },
        binaryInputs = {} as { [key:string]: Uint8Array }
    }: { 
        inputs: typstFiles,
        binaryInputs?: { [key:string]: Uint8Array }
    } = $props();

    const typst = setTypst();

    let compiledUrl = $state<string | null>(null);
    let compiling = $state(false);

    $effect(() => {
        compiling = true;
        // Read inputs to register reactivity
        const currentInputs = inputs;
        const currentBinaryInputs = binaryInputs;
        
        // Add all source files to typst compiler virtual filesystem
        for (const [path, content] of Object.entries(currentInputs)) {
            typst.addSource(path, content);
        }

        // Add all binary files to typst compiler virtual filesystem
        for (const [path, content] of Object.entries(currentBinaryInputs)) {
            typst.mapShadow(path, content);
        }

        // Run pdf compilation
        typst.pdf({ inputs: currentInputs, mainFilePath: '/main.typ' }).then((compiled: any) => {
            if (compiled) {
                const blob = new Blob([compiled.buffer as ArrayBuffer], { type: 'application/pdf' });
                // Clean up previous URL to avoid memory leaks
                if (compiledUrl) {
                    URL.revokeObjectURL(compiledUrl);
                }
                compiledUrl = URL.createObjectURL(blob);
            }
            compiling = false;
        }).catch((err: any) => {
            console.error("Typst compilation error:", err);
            compiling = false;
        });
    });
</script>

<div class="flex-1 flex flex-col relative h-full w-full min-h-150 lg:min-h-full">
    {#if compiling}
        <div class="absolute inset-0 flex items-center justify-center bg-slate-50 bg-opacity-50 z-10 rounded-xl transition-all duration-300">
            <div class="flex flex-col items-center gap-3">
                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                <span class="text-sm font-medium text-slate-600">Compilation Typst en cours...</span>
            </div>
        </div>
    {/if}
    {#if compiledUrl}
        <iframe class="flex-1 w-full h-full border border-slate-200 rounded-xl shadow-lg" src={compiledUrl} title="Typst CV Preview"></iframe>
    {:else}
        <div class="flex-1 flex items-center justify-center text-slate-400 bg-slate-100 rounded-xl border border-dashed border-slate-300">
            Génération en cours...
        </div>
    {/if}
</div>
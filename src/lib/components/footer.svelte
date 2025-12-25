<script lang="ts">
	const today = new Date();
    import { m } from "$lib/paraglide/messages";
</script>

<footer class="p-8 text-white grid place-center w-full text-center gap-4 print:hidden">
	&copy; {today.getFullYear()} {m.title()}. All rights reserved.
</footer>
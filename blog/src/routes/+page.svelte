<script lang="ts">
	import type { PageData } from './$types';

	import PageHead from '$lib/components/PageHead.svelte';
	import Article from '$lib/components/Article.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
	import ArticleMeta from '$lib/components/ArticleMeta.svelte';
	import ArticleDescription from '$lib/components/ArticleDescription.svelte';

	export let data: PageData;
</script>

<PageHead title="Tim's Blog" description="A markdown blog about cybersecurity, hacking, and software development." />

<p>
	A statically generated blog for my h4x0r notes
</p>

{#each data.posts as { slug, title, author, description, date }}
	<Article>
		<ArticleTitle {slug} {title} />
		<ArticleMeta {author} {date} />
		<ArticleDescription {description} {slug} />
	</Article>
{/each}

<slot />

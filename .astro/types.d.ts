declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"post": {
"article/HTML CSS Tips & Tricks.md": {
  id: "article/HTML CSS Tips & Tricks.md",
  slug: "article/html-css-tips--tricks",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"article/JavaScript TypeScript Tips & Tricks.md": {
  id: "article/JavaScript TypeScript Tips & Tricks.md",
  slug: "article/javascript-typescript-tips--tricks",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"portfolio/Resume.md": {
  id: "portfolio/Resume.md",
  slug: "portfolio/resume",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"portfolio/skorporaal.com Build Log.md": {
  id: "portfolio/skorporaal.com Build Log.md",
  slug: "portfolio/skorporaalcom-build-log",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"portfolio/skorporaal.com.md": {
  id: "portfolio/skorporaal.com.md",
  slug: "portfolio/skorporaalcom",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Aardappelpuree van Hele Aardappels.md": {
  id: "recipe/Aardappelpuree van Hele Aardappels.md",
  slug: "recipe/aardappelpuree-van-hele-aardappels",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Andijvie-spek Stamppot.md": {
  id: "recipe/Andijvie-spek Stamppot.md",
  slug: "recipe/andijvie-spek-stamppot",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Andijvie-zalm Stamppot.md": {
  id: "recipe/Andijvie-zalm Stamppot.md",
  slug: "recipe/andijvie-zalm-stamppot",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Bakplaatgnocchi.md": {
  id: "recipe/Bakplaatgnocchi.md",
  slug: "recipe/bakplaatgnocchi",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Caesar-salade met Kip.md": {
  id: "recipe/Caesar-salade met Kip.md",
  slug: "recipe/caesar-salade-met-kip",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Champignonroomsaus.md": {
  id: "recipe/Champignonroomsaus.md",
  slug: "recipe/champignonroomsaus",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Champignonsoep.md": {
  id: "recipe/Champignonsoep.md",
  slug: "recipe/champignonsoep",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Gevulde Paprika Deconstructed.md": {
  id: "recipe/Gevulde Paprika Deconstructed.md",
  slug: "recipe/gevulde-paprika-deconstructed",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Moderne Hutspot.md": {
  id: "recipe/Moderne Hutspot.md",
  slug: "recipe/moderne-hutspot",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Parmigiana.md": {
  id: "recipe/Parmigiana.md",
  slug: "recipe/parmigiana",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Pasta Carbonara.md": {
  id: "recipe/Pasta Carbonara.md",
  slug: "recipe/pasta-carbonara",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Pasta met Worst.md": {
  id: "recipe/Pasta met Worst.md",
  slug: "recipe/pasta-met-worst",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Quesadillas.md": {
  id: "recipe/Quesadillas.md",
  slug: "recipe/quesadillas",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Saltimbocca.md": {
  id: "recipe/Saltimbocca.md",
  slug: "recipe/saltimbocca",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Schnitzel met Komkommersalade.md": {
  id: "recipe/Schnitzel met Komkommersalade.md",
  slug: "recipe/schnitzel-met-komkommersalade",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Simpele Katsu.md": {
  id: "recipe/Simpele Katsu.md",
  slug: "recipe/simpele-katsu",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Simpele Teriyaki.md": {
  id: "recipe/Simpele Teriyaki.md",
  slug: "recipe/simpele-teriyaki",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
"recipe/Tomatensaus met Stoofvlees.md": {
  id: "recipe/Tomatensaus met Stoofvlees.md",
  slug: "recipe/tomatensaus-met-stoofvlees",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}

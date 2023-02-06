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
		"article": {
"HTML CSS Tips & Tricks.md": {
  id: "HTML CSS Tips & Tricks.md",
  slug: "html-css-tips--tricks",
  body: string,
  collection: "article",
  data: any
},
"JavaScript TypeScript Tips & Tricks.md": {
  id: "JavaScript TypeScript Tips & Tricks.md",
  slug: "javascript-typescript-tips--tricks",
  body: string,
  collection: "article",
  data: any
},
},
"portfolio": {
"Resume.md": {
  id: "Resume.md",
  slug: "resume",
  body: string,
  collection: "portfolio",
  data: any
},
"skorporaal.com Build Log.md": {
  id: "skorporaal.com Build Log.md",
  slug: "skorporaalcom-build-log",
  body: string,
  collection: "portfolio",
  data: any
},
"skorporaal.com.md": {
  id: "skorporaal.com.md",
  slug: "skorporaalcom",
  body: string,
  collection: "portfolio",
  data: any
},
},
"recipe": {
"Aardappelpuree van Hele Aardappels.md": {
  id: "Aardappelpuree van Hele Aardappels.md",
  slug: "aardappelpuree-van-hele-aardappels",
  body: string,
  collection: "recipe",
  data: any
},
"Andijvie-spek Stamppot.md": {
  id: "Andijvie-spek Stamppot.md",
  slug: "andijvie-spek-stamppot",
  body: string,
  collection: "recipe",
  data: any
},
"Andijvie-zalm Stamppot.md": {
  id: "Andijvie-zalm Stamppot.md",
  slug: "andijvie-zalm-stamppot",
  body: string,
  collection: "recipe",
  data: any
},
"Bakplaatgnocchi.md": {
  id: "Bakplaatgnocchi.md",
  slug: "bakplaatgnocchi",
  body: string,
  collection: "recipe",
  data: any
},
"Caesar-salade met Kip.md": {
  id: "Caesar-salade met Kip.md",
  slug: "caesar-salade-met-kip",
  body: string,
  collection: "recipe",
  data: any
},
"Champignonroomsaus.md": {
  id: "Champignonroomsaus.md",
  slug: "champignonroomsaus",
  body: string,
  collection: "recipe",
  data: any
},
"Champignonsoep.md": {
  id: "Champignonsoep.md",
  slug: "champignonsoep",
  body: string,
  collection: "recipe",
  data: any
},
"Gevulde Paprika Deconstructed.md": {
  id: "Gevulde Paprika Deconstructed.md",
  slug: "gevulde-paprika-deconstructed",
  body: string,
  collection: "recipe",
  data: any
},
"Moderne Hutspot.md": {
  id: "Moderne Hutspot.md",
  slug: "moderne-hutspot",
  body: string,
  collection: "recipe",
  data: any
},
"Parmigiana.md": {
  id: "Parmigiana.md",
  slug: "parmigiana",
  body: string,
  collection: "recipe",
  data: any
},
"Pasta Carbonara.md": {
  id: "Pasta Carbonara.md",
  slug: "pasta-carbonara",
  body: string,
  collection: "recipe",
  data: any
},
"Pasta met Worst.md": {
  id: "Pasta met Worst.md",
  slug: "pasta-met-worst",
  body: string,
  collection: "recipe",
  data: any
},
"Quesadillas.md": {
  id: "Quesadillas.md",
  slug: "quesadillas",
  body: string,
  collection: "recipe",
  data: any
},
"Saltimbocca.md": {
  id: "Saltimbocca.md",
  slug: "saltimbocca",
  body: string,
  collection: "recipe",
  data: any
},
"Schnitzel met Komkommersalade.md": {
  id: "Schnitzel met Komkommersalade.md",
  slug: "schnitzel-met-komkommersalade",
  body: string,
  collection: "recipe",
  data: any
},
"Simpele Katsu.md": {
  id: "Simpele Katsu.md",
  slug: "simpele-katsu",
  body: string,
  collection: "recipe",
  data: any
},
"Simpele Teriyaki.md": {
  id: "Simpele Teriyaki.md",
  slug: "simpele-teriyaki",
  body: string,
  collection: "recipe",
  data: any
},
"Tomatensaus met Stoofvlees.md": {
  id: "Tomatensaus met Stoofvlees.md",
  slug: "tomatensaus-met-stoofvlees",
  body: string,
  collection: "recipe",
  data: any
},
},

	};

	type ContentConfig = never;
}

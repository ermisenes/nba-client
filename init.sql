
CREATE TABLE public.categories (
	"categoryId" uuid NOT NULL DEFAULT gen_random_uuid(),
	title text NOT NULL,
	CONSTRAINT categories_pkey PRIMARY KEY ("categoryId")
);

CREATE TABLE public.products (
	"productId" uuid NOT NULL DEFAULT gen_random_uuid(),
	description text NOT NULL,
	"listPrice" numeric NOT NULL,
	"categoryId" uuid NOT NULL,
	CONSTRAINT products_pkey PRIMARY KEY ("productId"),
	CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES categories("categoryId") ON UPDATE RESTRICT ON DELETE RESTRICT
);

ALTER TABLE public.categories
  OWNER TO postgres; 

ALTER TABLE public.products
  OWNER TO postgres;
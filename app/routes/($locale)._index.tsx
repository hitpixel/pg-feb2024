import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';

export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({featuredCollection, recommendedProducts});
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <section type="hero" className="hero_banner medium">
        <div className="hero__grid grid grid-cols-12" style={{ backgroundColor: '#e8f8fa' }}>
          <div className="flex flex-col items-center justify-center order-last col-span-12 info laptop:order-first laptop:col-span-6">
            <div className="p-4 py-10 laptop:py-0 pg-container text-container text-left">
              <h1 className="text-black">Plants Make People Happy</h1>
              <p className="my-6 text-black">
                Plants, care accessories, and more magic delivered to your door—happiness guaranteed.
              </p>
              <div className="buttons flex gap-2">
                <div>
                  <a href="/collections/live-plants" type="button" className="capitalize text-center pg-btn appearance-none bg-primary-light hover:bg-primary text-white block x-padding" data-v-2038032e="">
                    Shop Online
                  </a>
                </div>
                <div>
                  <a href="/locations" type="button" className="capitalize text-center pg-btn appearance-none bg-white text-primary-text hover:bg-common-green block x-padding" data-v-2038032e="">
                    Find a Store
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 relative image_container laptop:col-span-6">
            {/* ---- */}
            <img src="https://cdn.shopify.com/s/files/1/0588/5621/0593/files/Plantgems_Bg1.jpg?v=1706246499" width="1216" height="903" alt="Plants Make People Happy" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, 100vw" srcSet="https://cdn.shopify.com/s/files/1/0588/5621/0593/files/Plantgems_Bg1.jpg?v=1706246499" className="hero__image" />
          </div>
        </div>
      </section>

      <!-- <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} />  -->

    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery>;
}) {
  return (
    
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="recommended-products-grid">
              {products.nodes.map((product) => (
                <Link
                  key={product.id}
                  className="recommended-product"
                  to={`/products/${product.handle}`}
                >
                  <Image
                    data={product.images.nodes[0]}
                    aspectRatio="1/1"
                    sizes="(min-width: 45em) 20vw, 50vw"
                  />
                  <h4>{product.title}</h4>
                  <small>
                    <Money data={product.priceRange.minVariantPrice} />
                  </small>
                </Link>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;


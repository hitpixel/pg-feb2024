export function meta() {
    return [
      {title: 'Hydrogen'},
      {description: 'A custom storefront powered by Hydrogen'},
    ];
  }
  export default function Index() {
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
  
        <FeaturedCollection collection={data.featuredCollection} />
        <RecommendedProducts products={data.recommendedProducts} />
  
        </div>
        
  
  
  
  
  
      
    );
  }
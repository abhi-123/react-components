import { useState, useEffect, useRef } from "react";
export default function InfiniteScroll() {
  const [products, setProducts] = useState([]);
  const [limit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const senitelRef = useRef(null);

  useEffect(() => {
    const senitel = senitelRef.current;
    if (!senitel) return;

    const observer = new IntersectionObserver(
      (enteries) => {
        const entry = enteries[0];
        if (entry.isIntersecting && hasMore && !isFetching) {
          getProducts();
        }
      },
      { root: null }
    );
    observer.observe(senitel);
    return () => {
      if (senitel) observer.unobserve(senitel);
    };
  }, [skip, hasMore, isFetching]);

  async function getProducts() {
    console.log("in get products");
    try {
      if (isFetching || !hasMore) return;
      setIsFetching(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = await response.json();
      setProducts((prev) => {
        return [...prev, ...data.products];
      });
      setSkip((s) => s + data.products.length);
      setHasMore(() => {
        const newskip = skip + data.products.length;
        return newskip < data.total;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  }
  return (
    <>
    <div className="pageContainer">
      {products.map((item) => {
        return (
          <div className="productInfo">
            <div className="iamgeContainer">
              <img
                src={item.thumbnail}
                style={{ width: "10rem", height: "10rem" }}
              />
            </div>
            <div className="mediaRight">
              <label>{item.title}</label>
              <p>{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
       <p ref={senitelRef} style={{ minHeight: 1 }} />
           <div style={{ marginTop: 12 }}>
        {isFetching && <div className="loader"></div>}
      </div>
</>
  );
}

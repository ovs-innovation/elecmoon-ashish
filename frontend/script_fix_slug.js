const fs = require('fs');

const path = 'c:/Users/Ashish/OneDrive/Desktop/Project/PowerQ/frontend/src/pages/product/[slug].js';
let content = fs.readFileSync(path, 'utf8');

// 1. Add imports
content = content.replace('import LeadServices from "@services/LeadServices";', 'import LeadServices from "@services/LeadServices";\nimport ReviewServices from "@services/ReviewServices";');

// 2. Add state
const stateReplacement = `  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (product?._id) {
      ReviewServices.getReviewsByProduct(product._id).then(res => setReviews(res)).catch(console.log);
    }
  }, [product]);

  const submitReview = async (e) => {
    e.preventDefault();
    if(!reviewerName || !reviewText) return toast.error("Please fill Name and Review");
    try {
      const res = await ReviewServices.addReview({
        product: product._id,
        name: reviewerName,
        rating: rating,
        comment: reviewText,
      });
      toast.success("Review submitted!");
      setReviews([res.review, ...reviews]);
      setReviewText("");
      setReviewerName("");
      setRating(5);
    } catch(err) {
      toast.error("Failed to submit review");
    }
  };
`;
content = content.replace('  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);', stateReplacement);

// 3. Replace the Enquire Now logic and add Bulk purchase
const buttonsSearch = `                          <div className="flex items-center mt-6">
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                              <button
                                onClick={() => {
                                  const minQty = product.minOrderQuantity || 1;
                                  addItem({
                                    id: product._id,
                                    name: showingTranslateValue(product.title),
                                    price: price,
                                    image: product.image?.[0],
                                    variant: selectVariant || {},
                                    minQty: minQty,
                                  }, minQty);
                                  router.push(\`/request-a-quote?selected=\${product._id}\`);
                                }}
                                className="bg-[#0b1d3d] hover:bg-[#162542] text-white text-sm h-12 inline-flex items-center cursor-pointer transition duration-300 font-semibold text-center justify-center rounded-md px-8 w-full sm:w-1/2"
                              >
                                Enquire Now
                              </button>
                              
                              <button
                                onClick={() => {
                                  const minQty = product.minOrderQuantity || 1;
                                  addItem({
                                    id: product._id,
                                    name: showingTranslateValue(product.title),
                                    price: price,
                                    image: product.image?.[0],
                                    variant: selectVariant || {},
                                    minQty: minQty,
                                  }, minQty);
                                  toast.success("Added to cart!");
                                }}
                                className="bg-[#A821A8] hover:brightness-110 text-white text-sm h-12 inline-flex items-center cursor-pointer transition duration-300 font-semibold text-center justify-center rounded-md px-8 w-full sm:w-1/2 flex items-center gap-2"
                              >
                                <FiShoppingBag className="w-5 h-5" />
                                Add To Cart
                              </button>
                            </div>
                          </div>`;

const buttonsReplacement = `                          <div className="flex flex-col mt-6 w-full">
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full mb-4">
                              <button
                                onClick={() => {
                                  router.push('/checkout');
                                }}
                                className="bg-[#0b1d3d] hover:bg-[#162542] text-white text-sm h-12 inline-flex items-center cursor-pointer transition duration-300 font-semibold text-center justify-center rounded-md px-8 w-full sm:w-1/2"
                              >
                                Buy Now
                              </button>
                              
                              <button
                                onClick={() => {
                                  const minQty = product.minOrderQuantity || 1;
                                  addItem({
                                    id: product._id,
                                    name: showingTranslateValue(product.title),
                                    price: price,
                                    image: product.image?.[0],
                                    variant: selectVariant || {},
                                    minQty: minQty,
                                  }, minQty);
                                  toast.success("Added to cart!");
                                }}
                                className="bg-[#A821A8] hover:brightness-110 text-white text-sm h-12 inline-flex items-center cursor-pointer transition duration-300 font-semibold text-center justify-center rounded-md px-8 w-full sm:w-1/2 flex items-center gap-2"
                              >
                                <FiShoppingBag className="w-5 h-5" />
                                Add To Cart
                              </button>
                            </div>
                            <button
                                onClick={() => setEnquiryModalOpen(true)}
                                className="bg-[#EF4036] hover:bg-[#C53030] text-white text-sm h-12 inline-flex items-center cursor-pointer transition duration-300 font-semibold text-center justify-center rounded-md px-8 w-full"
                              >
                                Enquire Now For Bulk purchase
                            </button>
                          </div>`;

content = content.replace(buttonsSearch, buttonsReplacement);

// 4. Update Enquiry Modal - manual trigger to use the same split layout as Welcome Modal
const enquiryModalSearch = `          {/* Enquiry Modal - Manual trigger */}
          <MainModal
            modalOpen={enquiryModalOpen}
            setModalOpen={setEnquiryModalOpen}
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Enquire about this product
              </h3>`;

const enquiryModalReplacement = `          {/* Enquiry Modal - Manual trigger */}
          <MainModal
            modalOpen={enquiryModalOpen}
            setModalOpen={setEnquiryModalOpen}
          >
            <div className="inline-block w-full max-w-5xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
              <div className="flex flex-col lg:flex-row">
                {/* Left Side - Images */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#EF4036] to-[#C53030] p-8 items-center justify-center">
                  <div className="relative w-full h-full">
                    {getCurrentImages()[0] && (
                      <div className="relative w-full h-full min-h-[500px] rounded-lg overflow-hidden">
                        <Image
                          src={getCurrentImages()[0]}
                          alt={showingTranslateValue(product?.title)}
                          width={600}
                          height={600}
                          className="rounded-lg object-cover w-full h-full"
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0"></div>
                        <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                          <h2 className="text-2xl font-bold mb-2">
                            {showingTranslateValue(selectVariant?.title) ||
                              showingTranslateValue(product?.title)}
                          </h2>
                          <p className="text-sm opacity-90">
                            Get in touch with us to learn more about this product for bulk purchases
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="lg:w-1/2 p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                    Enquire about this product
                  </h3>`;

content = content.replace(enquiryModalSearch, enquiryModalReplacement);
// Need to add an extra </div></div> at the end of the form.
const endOfFormSearch = `                  Submit Enquiry
                </button>
              </form>
            </div>
          </MainModal>`;
const endOfFormReplacement = `                  Submit Enquiry
                </button>
              </form>
            </div>
            </div>
            </div>
          </MainModal>`;
content = content.replace(endOfFormSearch, endOfFormReplacement);

// 5. Add Review section at the bottom of main product content
const reviewSection = `
              {/* Product Reviews */}
              <div className="mt-12 w-full max-w-screen-2xl mx-auto px-4 lg:px-10 mb-10">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Customer Reviews</h3>
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="w-full lg:w-1/3">
                    <form onSubmit={submitReview} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <h4 className="text-lg font-semibold mb-4">Write a Review</h4>
                      <input type="text" value={reviewerName} onChange={(e)=>setReviewerName(e.target.value)} placeholder="Your Name" className="w-full mb-3 p-3 border rounded-md" required/>
                      <select value={rating} onChange={(e)=>setRating(e.target.value)} className="w-full mb-3 p-3 border rounded-md">
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Good</option>
                        <option value="3">3 - Average</option>
                        <option value="2">2 - Poor</option>
                        <option value="1">1 - Terrible</option>
                      </select>
                      <textarea value={reviewText} onChange={(e)=>setReviewText(e.target.value)} placeholder="Your Review" className="w-full mb-4 p-3 border rounded-md min-h-[100px]" required></textarea>
                      <button type="submit" className="w-full text-white bg-[#0b1d3d] py-3 rounded-md hover:bg-[#EF4036] transition-colors">Submit Review</button>
                    </form>
                  </div>
                  <div className="w-full lg:w-2/3">
                    {reviews.length === 0 ? <div className="text-gray-500 py-4">No reviews yet. Be the first to review!</div> : (
                      <div className="space-y-4">
                        {reviews.map((rev, i) => (
                          <div key={i} className="bg-white p-5 rounded-lg shadow-sm border border-gray-50">
                            <div className="flex justify-between mb-2">
                              <span className="font-semibold text-gray-800">{rev.name}</span>
                              <span className="text-yellow-500">{"★".repeat(rev.rating)}{"☆".repeat(5-rev.rating)}</span>
                            </div>
                            <p className="text-gray-600">{rev.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
`;

// Insert it right before module.exports or final return piece. Wait, I can insert it inside Layout but below <div className="px-0 py-10 lg:py-10">
// Let's insert it right after `<ProductGallery />` block and the details block ends. 
// wait, we can just insert it at the very end of Layout children.
content = content.replace(`              <div className="pt-10 lg:pt-20 pb-10">
                <div className="mx-auto px-4 lg:px-10 max-w-screen-2xl">
                  <div className="flex justify-center mb-6">`, 
`${reviewSection}
              <div className="pt-10 lg:pt-20 pb-10">
                <div className="mx-auto px-4 lg:px-10 max-w-screen-2xl">
                  <div className="flex justify-center mb-6">`);

fs.writeFileSync(path, content, 'utf8');
console.log("Updated [slug].js successfully");

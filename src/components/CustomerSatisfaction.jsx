// import React, { useState, useEffect } from "react";
// import StarIcon from "@mui/icons-material/Star";
// import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

// function CustomerSatisfaction() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Customer testimonials
//   const testimonials = [
//     {
//       id: 1,
//       name: "Kamal Perera",
//       image: "https://randomuser.me/api/portraits/men/32.jpg",
//       rating: 5,
//       comment:
//         "Amazing quality! The fabric is so comfortable and the fit is perfect. Highly recommend UH Brand!",
//       product: "Casual T-Shirt",
//     },
//     {
//       id: 2,
//       name: "Nimali Silva",
//       image: "https://randomuser.me/api/portraits/women/44.jpg",
//       rating: 5,
//       comment:
//         "Best clothing store in Sri Lanka! Fast delivery and excellent customer service. Will buy again!",
//       product: "Summer Dress",
//     },
//     {
//       id: 3,
//       name: "Rohan Fernando",
//       image: "https://randomuser.me/api/portraits/men/22.jpg",
//       rating: 5,
//       comment:
//         "Impressed with the quality and style. Great value for money. My go-to brand now!",
//       product: "Formal Shirt",
//     },
//     {
//       id: 4,
//       name: "Sanduni Rajapaksha",
//       image: "https://randomuser.me/api/portraits/women/65.jpg",
//       rating: 5,
//       comment:
//         "Love the designs! Modern, trendy and comfortable. Perfect for everyday wear.",
//       product: "Denim Jeans",
//     },
//   ];

//   // Auto-slide effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 4000); // Change every 4 seconds

//     return () => clearInterval(timer);
//   }, [testimonials.length]);

//   const handleDotClick = (index) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <div className="w-full h-[200px]  relative overflow-hidden">
//       {/* Background pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,.05)_10px,rgba(255,255,255,.05)_20px)]"></div>
//       </div>

//       {/* Content Container */}
//       <div className="relative h-full max-w-6xl mx-auto px-4 flex items-center">
//         {/* Left Side - Stats */}
//         <div className="hidden md:flex flex-col justify-center items-center w-1/4 border-r border-gray-700 pr-6">
//           <div className="text-center">
//             <p className="text-5xl font-bold text-white mb-2">10K+</p>
//             <p className="text-gray-400 text-sm">Happy Customers</p>
//             <div className="flex gap-1 mt-2 justify-center">
//               {[...Array(5)].map((_, i) => (
//                 <StarIcon
//                   key={i}
//                   className="text-yellow-400"
//                   fontSize="small"
//                 />
//               ))}
//             </div>
//             <p className="text-gray-300 text-xs mt-1">4.9/5 Rating</p>
//           </div>
//         </div>

//         {/* Right Side - Testimonials Slider */}
//         <div className="flex-1 md:pl-8 relative h-full flex items-center">
//           <div className="w-full">
//             {/* Testimonial Cards */}
//             <div className="relative h-[160px] overflow-hidden">
//               {testimonials.map((testimonial, index) => (
//                 <div
//                   key={testimonial.id}
//                   className={`absolute inset-0 transition-all duration-700 ease-in-out ${
//                     index === currentIndex
//                       ? "opacity-100 translate-x-0"
//                       : index < currentIndex
//                       ? "opacity-0 -translate-x-full"
//                       : "opacity-0 translate-x-full"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4 h-full">
//                     {/* Customer Image */}
//                     <div className="flex-shrink-0">
//                       <div className="relative">
//                         <img
//                           src={testimonial.image}
//                           alt={testimonial.name}
//                           className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-gray-700 shadow-xl"
//                         />
//                         <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
//                           <StarIcon fontSize="small" className="text-black" />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Testimonial Content */}
//                     <div className="flex-1 min-w-0">
//                       <FormatQuoteIcon
//                         className="text-gray-600 mb-1"
//                         fontSize="large"
//                       />
//                       <p className="text-gray-300 text-sm md:text-base mb-2 line-clamp-2">
//                         "{testimonial.comment}"
//                       </p>
//                       <div className="flex items-center gap-2 mb-1">
//                         <p className="text-white font-bold text-sm md:text-base">
//                           {testimonial.name}
//                         </p>
//                         <div className="flex gap-0.5">
//                           {[...Array(testimonial.rating)].map((_, i) => (
//                             <StarIcon
//                               key={i}
//                               className="text-yellow-400"
//                               sx={{ fontSize: 14 }}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                       <p className="text-gray-500 text-xs">
//                         Purchased: {testimonial.product}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Navigation Dots */}
//             <div className="flex justify-center gap-2 mt-4">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleDotClick(index)}
//                   className={`transition-all duration-300 rounded-full ${
//                     index === currentIndex
//                       ? "w-8 h-2 bg-white"
//                       : "w-2 h-2 bg-gray-600 hover:bg-gray-400"
//                   }`}
//                   aria-label={`Go to testimonial ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Stats (shown on small screens) */}
//       <div className="md:hidden absolute bottom-2 left-4 flex items-center gap-2 text-xs">
//         <div className="flex gap-0.5">
//           {[...Array(5)].map((_, i) => (
//             <StarIcon
//               key={i}
//               className="text-yellow-400"
//               sx={{ fontSize: 12 }}
//             />
//           ))}
//         </div>
//         <span className="text-gray-400">10K+ Reviews</span>
//       </div>
//     </div>
//   );
// }

// export default CustomerSatisfaction;

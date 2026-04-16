import React from "react";
import Image from "next/image";
import Layout from "@layout/Layout";
import { FaCheckCircle } from "react-icons/fa";

const pricingPlans = [
  {
    title: "Small Business",
    subtitle: "1 - 500 tags",
    note: "Minimum fee $120 (GST excl.)",
    price: "$4.00/ tag",
    popular: true,
    features: ["Trade Power Tools", "Small Factories, Warehouses and Retail Stores"],
  },
  {
    title: "Medium Business",
    subtitle: "500 – 1000 tags",
    note: "Minimum fee $120 (GST excl.)",
    price: "$3.50/ tag",
    features: ["Trade Power Tools", "Small Factories, Warehouses and Retail Stores"],
  },
  {
    title: "Large Business",
    subtitle: "1000 – 2000 tags",
    note: "Minimum fee $120 (GST excl.)",
    price: "$2.80/ tag",
    features: ["Trade Power Tools", "Small Factories, Warehouses and Retail Stores"],
  },
  {
    title: "Large Offices / Schools",
    subtitle: "Over 2000 tags",
    note: "Minimum fee $120 (GST excl.)",
    price: "$2.40/ tag",
    features: ["Trade Power Tools", "Small Factories, Warehouses and Retail Stores"],
  },
];

const Pricing = () => {
  return (
    <Layout title="Pricing" description="Test and Tag pricing in Melbourne">
      {/* Hero */}
      <div className="relative bg-[#111] text-white min-h-[380px] sm:min-h-[380px] lg:min-h-[420px]">
        <Image
          src="https://www.powerq.com.au/wp-content/uploads/al_opt_content/IMAGE/www.powerq.com.au/wp-content/uploads/2025/02/Microwave-Testing.jpg.bv.webp"
          alt="Hero background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-10 py-24 lg:py-32 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Cost Of Test &amp; Tag In Melbourne
          </h1>
          <div className="w-40 h-0.5 bg-white mx-auto" />
        </div>
      </div>

      {/* Intro */}
      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-10 py-14 lg:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-stretch">
          <div className="space-y-6 lg:space-y-7 flex flex-col justify-center h-full">
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
              Save Cost on Test &amp; Tag in Melbourne with PowerQ
            </h2>
            <p className="text-lg leading-8 text-gray-800">
              Based in Melbourne, PowerQ Test &amp; Tag Melbourne offers electrical testing
              and tagging services in Melbourne with full compliance to test and tag
              regulations that apply for Victoria. We are an experienced team of smart and
              skilled professionals, with full public liability cover and competence in test
              and tag services. We assure you complete peace of mind when you engage us as
              we follow all test and tag regulations that apply to your industry.
            </p>
            <div>
              <a
                href="/request-a-quote"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gradient-to-r from-[#051124] to-[#0b1d3d] hover:from-[#0b1d3d] hover:to-[#162542] text-white font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)] transition"
              >
                BOOK OUR SERVICES
              </a>
            </div>
          </div>
          <div className="relative w-full h-full min-h-[420px] lg:min-h-[520px] xl:min-h-[560px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://www.powerq.com.au/wp-content/uploads/2025/02/crop-mounter-measuring-voltage_23-2147743122-768x512.avif"
              alt="Testing panel"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Pricing Plans - match homepage style */}
      <div
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-red-600 mb-3 drop-shadow-lg">
              Pricing Plans
            </h2>
            <p className="text-xl lg:text-2xl font-semibold text-white">
              We offer best price and packages for test &amp; tag in Melbourne
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.title}
                className="bg-white rounded-lg overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-black/80 p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{plan.title}</h3>
                  <p className="text-red-600 font-semibold mb-1">{plan.subtitle}</p>
                  <p className="text-red-600 text-sm">{plan.note}</p>
                </div>
                <div className="bg-white p-6">
                  <p className="text-4xl font-bold text-gray-900 mb-6">
                    {plan.price}
                    <span className="text-xl text-gray-600">/ tag</span>
                  </p>
                  <ul className="mb-6 space-y-3 text-sm text-gray-600">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start">
                        <FaCheckCircle className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/request-a-quote"
                    className="w-full inline-flex items-center justify-center bg-gradient-to-r from-[#051124] to-[#0b1d3d] hover:from-[#0b1d3d] hover:to-[#162542] text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-xl transform hover:scale-105"
                  >
                    Get a Quote
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-10 py-14 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-gray-800 leading-8 text-lg">
            <h3 className="text-3xl font-bold mb-2">
              A question we often get from customers is “what are the test and tag prices in Melbourne?”
            </h3>
            <p>
              The test and tag prices are determined by the type and number of equipment, any special
              reporting format requested and the labour required for the volume of test and tag. Some
              providers charge an hourly rate, a unit rate or a combination of both. Most providers will
              quote you the unit rate and an approximate total cost before the commencement of the work.
              For large projects it is a good approach to keep you posted on the volume of test and tags
              completed each day.
            </p>
            <p>
              Another factor is how you would like your test and tag results. For example, if you want an
              electronic register with fully traceable results, you may have to account for the extra cost.
              Some businesses do include that in the unit test rate.
            </p>
            <p>
              Keep in mind that quality and value are very important when choosing a company, and the
              cheapest rate you find may not result in a quality test and tag. A quote with higher test and
              tag prices may not always be rejected simply by looking at the price factor.
            </p>
          </div>
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://www.powerq.com.au/wp-content/uploads/2025/03/test-and-tag-prices-Melbourne-1.jpg"
              alt="Multimeter"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

        <div className="bg-white">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-10 pb-16 grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative w-full h-[520px] lg:h-[620px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://www.powerq.com.au/wp-content/uploads/2025/03/best-test-and-tag-prices-Melbourne.jpg"
                alt="Equipment testing"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-5 text-gray-800 leading-8 text-lg">
              <h3 className="text-3xl font-bold mb-2">
                Always choose a company with experienced technicians
              </h3>
              <ol className="list-decimal ml-5 space-y-3">
                <li>
                  Ensure that the technicians can demonstrate competency and practical experience.
                </li>
                <li>
                  Discuss a few jobs and you will easily identify if they are knowledgeable.
                </li>
                <li>
                  Find out what processes and equipment the provider uses for testing and tagging equipment.
                </li>
                <li>
                  Your selected provider should have equipment testing insurance, public liability insurance,
                  professional indemnity insurance and a workcover.
                </li>
                <li>
                  Ask for a safe work methods statement prior to commencement of the testing.
                </li>
              </ol>
              <div className="text-lg font-bold mb-2">
                A question we often get from customers is “what are the test and tag prices in Melbourne ?”
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default Pricing;


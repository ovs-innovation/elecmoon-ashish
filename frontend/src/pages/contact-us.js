import React from "react";
import Image from "next/image";
import Layout from "@layout/Layout";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LeadServices from "@services/LeadServices";
import { FiClock, FiMapPin, FiPhoneCall, FiMail } from "react-icons/fi";

const services = [
  "Electrical Testing & Tagging",
  "Fire Extinguishers",
  "RCD/Safety Switches",
  "Three Phase Testing",
  "Microwave Testing",
  "Emergency Exit Light Testing",
  "Smoke Alarm Service",
];

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const leadData = {
        ...data,
        product: {
          title: "Quote Request",
          type: "quote_request",
        },
      };
      await LeadServices.addLead(leadData);
      toast.success("Thank you! We will contact you shortly.");
      reset();
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message || "Failed to submit request.");
    }
  };

  return (
    <Layout title="Contact Us" description="Get in touch with PowerQ">
      <div className="relative bg-[#111] text-white min-h-[380px] sm:min-h-[380px] lg:min-h-[420px]">
        <Image
          src="https://www.powerq.com.au/wp-content/uploads/al_opt_content/IMAGE/www.powerq.com.au/wp-content/uploads/2025/02/Microwave-Testing.jpg.bv.webp"
          alt="Hero background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-10 py-24 lg:py-32 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Contact Us</h1>
          <div className="w-40 h-0.5 bg-white mx-auto" />
        </div>
      </div>

      <div className="bg-[#f7f7f7] py-12 px-4 sm:px-10">
        <div className="max-w-screen-2xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-8 text-center space-y-3 hover:shadow-lg hover:border-green-500/30 transition-all duration-300 group">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 text-3xl group-hover:bg-green-100 group-hover:scale-110 transition-transform duration-300">
                <FiClock />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Our Hours</h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Mon - Fri: 9am - 7pm</p>
              <p className="text-sm text-gray-600">Sat - Sun: 10am - 2pm</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-8 text-center space-y-3 hover:shadow-lg hover:border-green-500/30 transition-all duration-300 group">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 text-3xl group-hover:bg-green-100 group-hover:scale-110 transition-transform duration-300">
                <FiMapPin />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Location</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              43 Wonnangatta Cres, Melton South
              <br />
              VIC 3338, Australia
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-8 text-center space-y-3 hover:shadow-lg hover:border-green-500/30 transition-all duration-300 group">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 text-3xl group-hover:bg-green-100 group-hover:scale-110 transition-transform duration-300">
                <FiPhoneCall />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Contact Us</h3>
            <p className="text-sm text-gray-600">Phone: <a href="tel:0433723389" className="hover:text-[#ED1C24] transition">0433SAFETY / 0433723389</a></p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-8 text-center space-y-3 hover:shadow-lg hover:border-green-500/30 transition-all duration-300 group">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 text-3xl group-hover:bg-green-100 group-hover:scale-110 transition-transform duration-300">
                <FiMail />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Email</h3>
            <p className="text-sm text-gray-600">info@powerq.com.au</p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-10 py-12 lg:py-16 grid lg:grid-cols-2 gap-8">
          <div className="w-full h-[520px] rounded-lg overflow-hidden shadow border">
            <iframe
              title="PowerQ Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31526.2553889358!2d144.577!3d-37.688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6fbce4f4e0fbf%3A0x9c7c44a1e1e0e7e7!2s43%20Wonnangatta%20Cres%2C%20Melton%20South%20VIC%203338%2C%20Australia!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6 lg:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-[#ED1C24] focus:outline-none"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-[#ED1C24] focus:outline-none"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-[#ED1C24] focus:outline-none"
                    {...register("phone", { required: "Contact number is required" })}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <select
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-[#ED1C24] focus:outline-none bg-white"
                    defaultValue=""
                    {...register("service", { required: "Select a service" })}
                  >
                    <option value="" disabled>
                      Select Service
                    </option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                </div>
              </div>

              <input
                type="text"
                placeholder="Your Location"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-[#ED1C24] focus:outline-none"
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}

              <select
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-[#ED1C24] focus:outline-none bg-white"
                defaultValue=""
                {...register("serviceDate", { required: "When do you want service?" })}
              >
                <option value="" disabled>
                  When do you want service to be done
                </option>
                <option value="As soon as possible">As soon as possible</option>
                <option value="Within 1-2 weeks">Within 1-2 weeks</option>
                <option value="Within a month">Within a month</option>
                <option value="Flexible / Not sure">Flexible / Not sure</option>
              </select>
              {errors.serviceDate && <p className="text-red-500 text-xs mt-1">{errors.serviceDate.message}</p>}

              <textarea
                placeholder="Your Message (Optional)"
                rows={4}
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-[#ED1C24] focus:outline-none"
                {...register("message")}
              />

              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gradient-to-r from-[#051124] to-[#0b1d3d] hover:from-[#0b1d3d] hover:to-[#162542] text-white font-semibold transition shadow-[0_0_15px_rgba(255,255,255,0.3)] w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;


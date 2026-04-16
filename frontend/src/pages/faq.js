import React, { useState } from "react";
import Layout from "@layout/Layout";

const accordionData = [
  {
    question: "How long does the test and tag process go for?",
    answer:
      "The duration of testing and tagging depends on the appliance tested however it should only really take a few minutes at a time. A visual inspection of the appliance takes place prior which in turn aids the technician to judge what electrical test needs to be performed. Some appliances have to go through several tests prior to being labelled as safe and acceptable.",
  },
  {
    question: "What should my test and tag records include?",
    answer:
      "Test and tag records are compliant with the standards in AS/NZS 3760:2010. This involves a succinct history of all the tests along with adequate tagging that displays the date and assessment details of the item. Records of inspection and testing of electrical equipment, including: 1. Register of all electrical equipment 2. Record of formal inspection and tests 3. Record of all faulty equipment showing details of services or corrective actions.",
  },
  {
    question: "How much does a Test and Tag procedure cost?",
    answer:
      "PowerQ Test & Tag Melbourne Service fees are based on the number of tests we complete for you. This test rate includes all labour, test equipment, test tags, and reporting.",
  },
  {
    question: "Does my equipment need to be switched off during inspection?",
    answer:
      "Yes, all equipment needs to be turned off before testing can commence. This is to ensure the safety of our technicians and customers. Once an electrical risk assessment has been completed then equipment can be turned back on.",
  },
  {
    question: "Do new items need to be tested?",
    answer:
      "While new items don't require testing, they must still be tagged 'once in service' following the requirements of AS/NZS 3760. New electrical equipment that has never been put into use does not have to be tested before first use, as the supplier is deemed responsible for the initial electrical safety of the new item. However the Manager/Supervisor must ensure that new equipment is inspected for obvious damage before being used and that it is added to a Register upon entering service and is tested during the next scheduled test for their work area. Secondhand equipment must be tested.",
  },
  {
    question: "How do I know if my workplace is compliant with safety standards?",
    answer:
      "Regular inspections by certified safety professionals ensure your workplace complies with local safety regulations. Maintaining proper records of testing, repairs, and inspections will also help demonstrate compliance.",
  },
  {
    question: "What areas of my workplace do I need to test and tag to remain, OHS/WHS compliant?",
    answer:
      "It is essential to test and tag all portable and non-portable electrical appliances with a flexible and detachable supply lead in your workplace. Portable appliances are located in more areas than you may realise; like the office kitchen or construction areas.",
  },
  {
    question: "Is a Multimeter a sufficient equipment to test portable appliances?",
    answer:
      "A multimeter is not a satisfactory tool as it isn't compliant with AS/NZS3760. Equipment that has an electronic, magnetic or membrane type on/off switch requires mandatory leakage current tests. Some of this equipment can be located in offices, kitchens and construction sites. You must ensure that your service provider does not only rely on a multimeter as it does not meet the testing requirements as outlined in AS/NZS3760.",
  },
  {
    question: "Who can test and tag?",
    answer:
      "According to Australian standards, a competent person can test and tag. A suitable person who can perform regulated test and tag services must possess qualifications and/or sufficient knowledge in electrical testing and tagging.",
  },
];

const tableRows = [
  {
    env: "Factories, workshops, places of repair, manufacturing, assembly, maintenance and fabrication",
    equipmentInterval: "6 months",
    rcdUserPortable: "Daily or before every use",
    rcdUserFixed: "6 months",
    rcdTestPortable: "12 months",
    rcdTestFixed: "12 months",
  },
  {
    env: "Environment where the equipment or supply flexible cord is subject to flexing in normal use OR is open to abuse OR is in a hostile environment",
    equipmentInterval: "12 months",
    rcdUserPortable: "3 months",
    rcdUserFixed: "6 months",
    rcdTestPortable: "12 months",
    rcdTestFixed: "12 months",
  },
  {
    env: "Environment where the equipment or supply cord is NOT subject to flexing in normal use and is NOT open to abuse and is NOT in a hostile environment",
    equipmentInterval: "5 years",
    rcdUserPortable: "3 months",
    rcdUserFixed: "6 months",
    rcdTestPortable: "2 years",
    rcdTestFixed: "2 years",
  },
  {
    env: "Residential type areas: hotel, residential institutions, motel, boarding houses, halls, hostel accommodations houses, and the like",
    equipmentInterval: "2 years",
    rcdUserPortable: "6 months",
    rcdUserFixed: "6 months",
    rcdTestPortable: "2 years",
    rcdTestFixed: "2 years",
  },
  {
    env: "Equipment used for commercial cleaning",
    equipmentInterval: "6 months",
    rcdUserPortable: "Daily or before every use",
    rcdUserFixed: "N/A",
    rcdTestPortable: "6 months",
    rcdTestFixed: "N/A",
  },
  {
    env: "Hire equipment",
    equipmentInterval: "Prior to hire",
    rcdUserPortable: "Push-button test by hirer prior to hire",
    rcdUserFixed: "N/A",
    rcdTestPortable: "3 months",
    rcdTestFixed: "12 months",
  },
  {
    env: "Repaired, serviced and second-hand equipment",
    equipmentInterval:
      "After repair or service which could affect electrical safety, or on reintroduction to service",
    rcdUserPortable: "N/A",
    rcdUserFixed: "N/A",
    rcdTestPortable: "As required",
    rcdTestFixed: "As required",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Layout title="FAQ" description="Electrical Test and Tag FAQ">
      {/* Hero */}
      <div className="relative bg-[#181818] text-white">
        <div className="absolute inset-0 bg-[url('https://www.powerq.com.au/wp-content/uploads/al_opt_content/IMAGE/www.powerq.com.au/wp-content/uploads/2025/04/3-Phase-to-240V-power-board-scaled.jpg.bv.webp?bv_host=www.powerq.com.au')] bg-cover bg-center opacity-40" />
        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-10 py-16 lg:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Electrical Test and Tag Melbourne
          </h1>
          <div className="w-32 h-0.5 bg-white mx-auto mb-6" />
          <p className="text-lg text-gray-100 max-w-4xl mx-auto leading-7">
            Testing and tagging is essential for ensuring electrical equipment is safe to use and
            compliant with safety standards. It helps prevent hazards like electrical shocks or fires,
            protecting both people and property, and keeps you compliant with occupational health and
            safety regulations.
          </p>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-10 py-14 space-y-14">
          {/* Why Test & Tag */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Why Do I Have To Test &amp; Tag?</h2>
            <div className="space-y-4 text-lg text-gray-800 leading-8">
              <p>
                The Occupational Health and Safety Act (rev. 2004) requires employers to provide and
                maintain, so far as is reasonably practicable, a working environment for workers and
                independent contractors that is safe and without risks to health. This includes a duty to
                provide or maintain, so far as reasonably practicable, plant or systems of work that are safe
                and without risks to health.
              </p>
              <p>
                If you are an employer, self-employed person, an employee, or any person lending a portable
                appliance to another person, you have a duty of care to ensure that the equipment/appliance is
                safe.
              </p>
              <p>
                Australian Standard AS/NZS3760 is used by Worksafe Victoria as a minimum safety obligation
                for workplaces to adhere to. Your current insurance policy (including your Public Liability
                cover) may not cover accidents on site caused by equipment that does not comply with the
                relevant laws and safety regulations.
              </p>
              <p>
                Inspection and testing must be carried out by a competent person—someone with training,
                qualification and/or experience with the knowledge and skill to complete the task correctly.
              </p>
            </div>
          </section>

          {/* What needs testing */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              What Item Needs To Be Tested In My Workplace?
            </h2>
            <div className="space-y-3 text-lg text-gray-800">
              <p>Typically, any electrical item with a power lead that is plugged into a power point.</p>
              <ol className="list-decimal ml-5 space-y-2">
                <li>Portable items with flexible cord</li>
                <li>Extension cords</li>
                <li>Power boards</li>
                <li>RCD's (power board or extension cord with an in-built safety switch)</li>
              </ol>
              <p>
              For some types of equipment or electrical items, the frequency of testing is more often where there is a higher safety risk or where it is likely to be greater use and wear. For example, a tradesman or a carpenter has a higher risk factor and needs to have their electrical equipment tested more often than a computer in a standard office. All portable equipment and appliances, electric hand tools, extension leads, power boards and portable residual current devices must be regularly tested for electrical safety. This includes, but is not limited to, equipment such as……… • Computers and laptop chargers • Portable printers & scanners • Portable lighting • Portable heater/cooler • Portable radios/stereos • Portable phone chargers (including mobile phone chargers) • Overhead projector, data projectors and electric whiteboards • Any power boards and extension cords • Vacuum or Steam Cleaner. • Vacuum or Steam Cleaner • Electric fry pans, toaster ovens, sandwich presses etc • Un-mounted microwaves • Portable electric mixers, food processors • Portable electric coffee machine and grinder • Any power boards and extension cords. • Entertainment equipment such as Stereos, Radios, DVD players, TVs etc • Portable lamps and heaters •Toasters, kettles and other portable cooking equipment • Hairdryers, bedside clocks, electric blankets, Iron • All extension leads and power boards • Portable phone chargers. • Toasters, kettles and other portable cooking equipment • Entertainment equipment such as Stereos, Radios, DVD players, TVs etc • Computers and laptop chargers • Portable printers, laminators & scanners • Overhead projector, data projectors and electric whiteboards • Portable lamps and heaters • Portable phone chargers • All extension leads and power boards.
              </p>
            </div>
          </section>

          {/* Table */}
          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 text-center">
                Where Can I Learn More About My State Legislation?
              </h2>
              <p className="text-lg text-gray-800 mt-2">
                You can learn about your State's Legislation at{" "}
                <a href="https://www.standards.com.au" className="text-red-600 font-semibold" target="_blank" rel="noreferrer">
                  www.standards.com.au
                </a>
                .
              </p>
            </div>

            <div className="overflow-x-auto border-2 border-gray-700 rounded-lg shadow-md">
              <table className="min-w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-red-600 text-white border-b-2 border-gray-700">
                    <th
                      rowSpan={4}
                      className="px-4 py-4 w-2/5 text-left align-middle bg-[#1f1f1f] text-white font-semibold border-2 border-gray-700"
                    >
                      <div className="flex flex-col gap-1 text-lg leading-tight">
                        <span>Type of environment</span>
                        <span>and/or equipment</span>
                        <span className="font-bold">(a)</span>
                      </div>
                    </th>
                    <th colSpan={5} className="px-4 py-3 text-center font-semibold border-2 border-gray-700">
                      Interval between inspection and tests
                    </th>
                  </tr>
                  <tr className="bg-red-600 text-white border-b-2 border-gray-700">
                    <th
                      rowSpan={3}
                      className="px-4 py-3 text-center font-semibold border-2 border-gray-700"
                    >
                      Equipment including Class I and Class II equipment, cords, cord extension sets and EPOD's (b)
                    </th>
                    <th colSpan={4} className="px-4 py-3 text-center font-semibold border-2 border-gray-700">
                      Residual Current Devices (RCD's)
                    </th>
                  </tr>
                  <tr className="bg-red-600 text-white border-b-2 border-gray-700">
                    <th colSpan={2} className="px-4 py-3 text-center font-semibold border-2 border-gray-700">
                      Push Button Test By users
                    </th>
                    <th colSpan={2} className="px-4 py-3 text-center font-semibold border-2 border-gray-700">
                      operating time and push-button tests
                    </th>
                  </tr>
                  <tr className="bg-red-600 text-white border-b-2 border-gray-700">
                    <th className="px-4 py-2 text-center font-semibold border-2 border-gray-700">Portable</th>
                    <th className="px-4 py-2 text-center font-semibold border-2 border-gray-700">Fixed</th>
                    <th className="px-4 py-2 text-center font-semibold border-2 border-gray-700">Portable</th>
                    <th className="px-4 py-2 text-center font-semibold border-2 border-gray-700">Fixed</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, idx) => (
                    <tr key={idx} className="align-top">
                      <td className="px-4 py-4 text-gray-900 font-semibold border-2 border-gray-700">
                        {row.env}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-800 font-semibold border-2 border-gray-700">
                        {row.equipmentInterval}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-800 border-2 border-gray-700">
                        {row.rcdUserPortable}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-800 border-2 border-gray-700">
                        {row.rcdUserFixed}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-800 border-2 border-gray-700">
                        {row.rcdTestPortable}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-800 border-2 border-gray-700">
                        {row.rcdTestFixed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Accordions */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Frequently Asked Questions</h2>
            <div className="space-y-0">
              {accordionData.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="border-b border-gray-200 bg-white">
                    <button
                      onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                      className="no-green-button w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none bg-white hover:bg-gray-50 transition-colors group"
                      style={{ backgroundColor: 'white', color: '#111827' }}
                    >
                      <span className="text-lg font-semibold text-gray-900 pr-4 group-hover:text-[#ED1C24] transition-colors" style={{ color: '#111827' }}>{item.question}</span>
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isOpen ? 'bg-[#ED1C24] group-hover:bg-[#c9151f]' : 'bg-[#ED1C24] group-hover:bg-[#c9151f]'
                        }`}>
                          <span className={`text-white text-xl font-light transition-transform ${
                            isOpen ? 'rotate-45' : ''
                          }`}>+</span>
                        </div>
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-gray-700 leading-7 border-t border-gray-100" style={{ color: '#374151' }}>
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;

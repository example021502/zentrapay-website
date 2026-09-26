import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import { getContactInfo, submitContactMessage } from "../lib/api";
import { useApiData } from "../lib/useApiData";
import ConnectionNotice from "./ui/ConnectionNotice";
import { InfoRowSkeleton } from "./ui/Skeletons";

export default function Contact() {
  // Clear any draft form data from local storage upon unmounting
  useEffect(() => {
    return () => localStorage.removeItem("draftForm");
  }, []);

  // Non-critical: the form still works even if contact details fail to load,
  // so on error we just fall back to the hardcoded defaults below (the
  // failure itself is still logged to the console by useApiData).
  const { data, isLoading, isSlow } = useApiData(getContactInfo);
  const companyInfo = data?.companyInfo || null;

  // The /contact endpoint returns nested arrays: contact_channels holds
  // {phone_number, email_address, is_primary} and locations holds
  // {location_name, type, address}. Nothing is a flat companyInfo.email /
  // .phone / .address any more, so everything below maps over those arrays.
  const contactChannels = companyInfo?.contact_channels || [];
  const locations = companyInfo?.locations || [];

  // Lead with the channel flagged is_primary, then the rest.
  const byPrimary = (a, b) =>
    Number(Boolean(b.is_primary)) - Number(Boolean(a.is_primary));

  const emails = contactChannels
    .filter((channel) => channel.email_address)
    .sort(byPrimary);
  const phones = contactChannels
    .filter((channel) => channel.phone_number)
    .sort(byPrimary);

  // "headquarters" -> "Headquarters"
  const humanize = (value) =>
    String(value || "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Handle input changes for the contact form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle contact form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitContactMessage(formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Launch the relevant app/site for one of the published contact details
  const openEmail = (emailAddress) => {
    const subject = encodeURIComponent("Support Inquiry - Zentrapay");
    const body = encodeURIComponent(
      "Hello Zentrapay Team,\n\nI would like to inquire about: ",
    );
    window.location.assign(
      `mailto:${emailAddress}?subject=${subject}&body=${body}`,
    );
  };

  const openPhone = (phoneNumber) => {
    // Strip spaces/dashes so the dialler gets a valid number
    window.location.assign(`tel:${String(phoneNumber).replace(/[^\d+]/g, "")}`);
  };

  const openMap = (address) => {
    window.open(
      `https://maps.google.com/?q=${encodeURIComponent(address)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="w-full py-8 px-5 bg-gray-50 flex flex-col justify-center items-center space-y-16">
      {/* Intro Section */}
      <section
        key={"contact_intro_section"}
        className="w-full max-w-7xl text-center flex flex-col items-center gap-4"
      >
        <span className="badge-purple">Get in Touch</span>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          We’d Love to Hear From You
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
          Have questions about Zentrapay or need assistance with your account?
          Reach out to our team and we will get back to you as soon as possible.
        </p>
      </section>

      {/* Main Grid Section */}
      <section className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, type: "tween" }}
          className="flex flex-col gap-6 p-6 bg-white rounded-lg border border-gray-100 shadow-sm justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Contact Information
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Fill out the form or drop us an email. Our support team is always
              ready to help you navigate your financial journey.
            </p>

            {isLoading ? (
              <>
                <InfoRowSkeleton count={3} />
                {isSlow && <ConnectionNotice className="mt-2" />}
              </>
            ) : (
              <div className="flex flex-col gap-6">
                {/* One row per published email in company_contact_channels */}
                {emails.map((channel, i) => (
                  <div
                    key={`email-${i}-${channel.email_address}`}
                    onClick={() => openEmail(channel.email_address)}
                    className="flex items-start gap-4 cursor-pointer group"
                  >
                    <div className="p-3 bg-purple-50 rounded-2xl text-brand-purple group-hover:bg-purple-100 transition">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-semibold text-gray-900 group-hover:text-brand-purple transition flex items-center gap-2">
                        Email Us
                        {channel.is_primary && (
                          <span className="text-[10px] font-bold uppercase tracking-wide bg-brand-purple text-white px-1.5 py-0.5 rounded-full">
                            Primary
                          </span>
                        )}
                      </span>
                      <span className="text-sm text-gray-600 break-all">
                        {channel.email_address}
                      </span>
                    </div>
                  </div>
                ))}

                {/* One row per published phone number */}
                {phones.map((channel, i) => (
                  <div
                    key={`phone-${i}-${channel.phone_number}`}
                    onClick={() => openPhone(channel.phone_number)}
                    className="flex items-start gap-4 cursor-pointer group"
                  >
                    <div className="p-3 bg-purple-50 rounded-2xl text-brand-purple group-hover:bg-purple-100 transition">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-semibold text-gray-900 group-hover:text-brand-purple transition flex items-center gap-2">
                        Call Us
                        {channel.is_primary && (
                          <span className="text-[10px] font-bold uppercase tracking-wide bg-brand-purple text-white px-1.5 py-0.5 rounded-full">
                            Primary
                          </span>
                        )}
                      </span>
                      <span className="text-sm text-gray-600">
                        {channel.phone_number}
                      </span>
                    </div>
                  </div>
                ))}

                {/* One row per office from company_locations */}
                {locations.map((location, i) => (
                  <div
                    key={`location-${i}-${location.location_name}`}
                    onClick={() => openMap(location.address)}
                    className="flex items-start gap-4 cursor-pointer group"
                  >
                    <div className="p-3 bg-purple-50 rounded-2xl text-brand-purple group-hover:bg-purple-100 transition">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-semibold text-gray-900 group-hover:text-brand-purple transition flex items-center gap-2 flex-wrap">
                        {location.location_name || "Office Location"}
                        {location.type && (
                          <span className="text-[10px] font-bold uppercase tracking-wide bg-purple-50 text-brand-purple px-1.5 py-0.5 rounded-full">
                            {humanize(location.type)}
                          </span>
                        )}
                      </span>
                      <span className="text-sm text-gray-600">
                        {location.address}
                      </span>
                    </div>
                  </div>
                ))}

                {emails.length === 0 &&
                  phones.length === 0 &&
                  locations.length === 0 && (
                    <p className="text-sm text-gray-500">
                      Contact details are not available right now. Please use the
                      form and our team will get back to you.
                    </p>
                  )}
              </div>
            )}
          </div>

          {/* Social Links Footer - only the fields the new schema still exposes */}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3 text-left">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Connect With Us
            </span>
            <div className="flex items-center gap-3">
              <a
                href={companyInfo?.website_url || "https://zentrapay.org"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-50 hover:bg-purple-50 text-gray-600 hover:text-brand-purple rounded-full transition cursor-pointer"
                aria-label={`Visit ${companyInfo?.company_name || "our"} website`}
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, type: "tween", delay: 0.1 }}
          className="lg:col-span-2 p-6 sm:p-12 bg-white rounded-lg border border-gray-100 shadow-sm flex flex-col justify-center"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-12 space-y-4"
            >
              <div className="p-4 bg-emerald-50 rounded-full text-emerald-600">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Message Sent Successfully!
              </h3>
              <p className="text-sm text-gray-600 max-w-md">
                Thank you for reaching out. A member of our support team will
                review your message and respond shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-primary mt-6 px-6 py-2.5"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-6 text-left"
            >
              {submitError && (
                <p className="text-sm text-red-500 -mb-2">{submitError}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="form-input"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="johndoe@gmail.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-semibold text-gray-700"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="form-input"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="form-input resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary rounded-xl flex items-center justify-center gap-2 px-8 py-4 shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  );
}

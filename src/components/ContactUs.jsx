import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Globe,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  useEffect(() => {
    return () => localStorage.removeItem("draftForm");
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="w-full py-15 px-5 bg-gray-50 flex flex-col justify-center items-center space-y-16">
      <section
        key={"contact_intro_section"}
        className="w-full max-w-7xl text-center flex flex-col items-center gap-4"
      >
        <span className="badge-purple">
          Get in Touch
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          We’d Love to Hear From You
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
          Have questions about Zentrapay or need assistance with your account?
          Reach out to our team and we will get back to you as soon as possible.
        </p>
      </section>

      <section className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
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

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 rounded-2xl text-brand-purple">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-gray-900">
                    Email Us
                  </span>
                  <span className="text-sm text-gray-600">
                    support@zentrapay.com
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 rounded-2xl text-brand-purple">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-gray-900">
                    Call Us
                  </span>
                  <span className="text-sm text-gray-600">
                    +1 (555) 123-4567
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 rounded-2xl text-brand-purple">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-gray-900">
                    Office Location
                  </span>
                  <span className="text-sm text-gray-600">
                    123 Fintech Avenue, Suite 400, San Francisco, CA
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3 text-left">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Connect With Us
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-50 hover:bg-purple-50 text-gray-600 hover:text-brand-purple rounded-full transition cursor-pointer"
                aria-label="Social Feed"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
              <a
                href="https://zentrapay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-50 hover:bg-purple-50 text-gray-600 hover:text-brand-purple rounded-full transition cursor-pointer"
                aria-label="Global Network"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

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
                    placeholder="Evans Ackaah"
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
                    placeholder="evans@zentrapay.com"
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

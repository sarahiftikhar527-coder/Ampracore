
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CalendarDays,
  ShieldCheck,
  Target,
  Rocket,
} from "lucide-react";
import "./Contact.css";

const steps = [
  {
    number: "01",
    title: "Expert Outreach & Requirement Analysis",
    description:
      "Our expert will connect with you to understand your requirements, business needs, and project goals.",
    icon: CalendarDays,
  },
  {
    number: "02",
    title: "Privacy Assurance",
    description:
      "Your ideas and business information are handled with care and confidentiality.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Detailed Project Scoping",
    description:
      "We define your project scope, key features, timeline, and technical requirements.",
    icon: Target,
  },
  {
    number: "04",
    title: "Strategic Consultation",
    description:
      "We discuss priorities and align the right solution with your vision.",
    icon: CalendarDays,
  },
  {
    number: "05",
    title: "Project Kick-off",
    description:
      "Once everything is aligned, we finalize the next steps and get your project moving.",
    icon: Rocket,
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  industry: "",
  budget: "",
  country: "",
  message: "",
};

export default function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("contact-visible");
          observer.unobserve(section);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (submitted) setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-container">
        <div className="contact-process contact-reveal-left">
          <h2 className="contact-process-title">
            What's <span>Next?</span>
          </h2>

          <div className="contact-timeline">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  className="contact-step"
                  key={step.number}
                  style={{ "--step-delay": `${index * 120}ms` }}
                >
                  <div className="contact-step-marker">
                    <span className="contact-step-number">
                      {step.number}
                    </span>
                  </div>

                  <div className="contact-step-content">
                    <div className="contact-step-heading">
                      <h3>{step.title}</h3>
                      <Icon
                        className="contact-step-icon"
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>

                    <p>{step.description}</p>
                  </div>
                </article>
              );
            })}
          </div>

        </div>

        <div className="contact-form-wrap contact-reveal-right">
          <h2 className="contact-form-title">Contact Us</h2>

          {submitted ? (
            <div
              className="contact-success"
              role="status"
              aria-live="polite"
            >
              <span className="contact-success-icon">
                <CheckCircle2 size={32} />
              </span>

              <h3>Thank you for reaching out!</h3>
              <p>
                Your form has been validated successfully. Connect a backend
                or form service to deliver your inquiry to your team.
              </p>

              <button
                type="button"
                className="contact-reset-button"
                onClick={() => {
                  setForm(initialForm);
                  setSubmitted(false);
                }}
              >
                Send another inquiry
                <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-fields-grid">
                <div className="contact-field">
                  <label className="contact-sr-only" htmlFor="contact-name">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Enter Your Name"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label className="contact-sr-only" htmlFor="contact-email">
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label className="contact-sr-only" htmlFor="contact-phone">
                    Phone number
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter Your Phone Number"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-field">
                  <label className="contact-sr-only" htmlFor="contact-industry">
                    Industry
                  </label>
                  <select
                    id="contact-industry"
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Industry
                    </option>
                    <option value="technology">Technology &amp; IT</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance &amp; Banking</option>
                    <option value="ecommerce">E-commerce &amp; Retail</option>
                    <option value="education">Education</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="contact-field contact-field-full">
                  <label className="contact-sr-only" htmlFor="contact-budget">
                    Project budget
                  </label>
                  <select
                    id="contact-budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Project Budget
                    </option>
                    <option value="50-500">$50 – $500</option>
                    <option value="500-2000">$500 – $2,000</option>
                    <option value="2000-5000">$2,000 – $5,000</option>
                    <option value="5000-10000">$5,000 – $10,000</option>
                    <option value="10000-plus">$10,000+</option>
                    <option value="discuss">Let's discuss</option>
                  </select>
                </div>

                <div className="contact-field contact-field-full">
                  <label className="contact-sr-only" htmlFor="contact-country">
                    Country
                  </label>
                  <select
                    id="contact-country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Country
                    </option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="contact-field contact-field-full">
                  <label className="contact-sr-only" htmlFor="contact-message">
                    Project details
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Please describe your request in detail."
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-form-bottom">
              

                <button type="submit" className="contact-submit">
                  <span>Submit</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

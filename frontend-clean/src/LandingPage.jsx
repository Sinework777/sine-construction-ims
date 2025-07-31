import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
  ChartBarIcon,
  CheckCircleIcon,
  StarIcon,
  UsersIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Daily Reports',
    description: 'Capture jobsite activities, labor, and weather conditions with structured daily reports.',
    icon: <DocumentTextIcon className="h-10 w-10 text-blue-600" />, 
  },
  {
    title: 'QA/QC + NCR Tracking',
    description: 'Ensure compliance and track non-conformance issues in real-time.',
    icon: <ClipboardDocumentCheckIcon className="h-10 w-10 text-blue-600" />,
  },
  {
    title: 'HSE Observations',
    description: 'Log and analyze safety observations using OSHA and EM385-1-1 compliance standards.',
    icon: <ShieldCheckIcon className="h-10 w-10 text-blue-600" />,
  },
  {
    title: 'Submittals & Approvals',
    description: 'Automate submittal workflows with document tracking and reviewer assignments.',
    icon: <CheckCircleIcon className="h-10 w-10 text-blue-600" />,
  },
  {
    title: 'RFI Management',
    description: 'Submit, respond, and track RFIs across all stakeholders with complete history.',
    icon: <BuildingOffice2Icon className="h-10 w-10 text-blue-600" />,
  },
  {
    title: 'BOQ & Quantity Surveying',
    description: 'Maintain and audit all quantities and costs through structured BOQ tables.',
    icon: <ChartBarIcon className="h-10 w-10 text-blue-600" />,
  },
  {
    title: 'Collaboration',
    description: 'Real-time chat, file sharing, and team management.',
    icon: <UsersIcon className="h-10 w-10 text-blue-600" />,
  },
  {
    title: 'Analytics & Dashboards',
    description: 'Visualize KPIs, progress, and costs with interactive dashboards.',
    icon: <ChartBarIcon className="h-10 w-10 text-blue-600" />,
  },
  {
    title: 'Mobile Access',
    description: 'Work from anywhere with secure mobile and cloud support.',
    icon: <StarIcon className="h-10 w-10 text-blue-600" />,
  },
];

const testimonials = [
  {
    name: 'Sarah Lee',
    role: 'Site Engineer, GlobalBuild',
    quote: 'This IMS platform transformed our project workflows. The daily reports and mobile access are game-changers!',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'John Smith',
    role: 'Project Manager, MegaConstruct',
    quote: 'RFIs and submittals are now instant. Collaboration and compliance have never been easier.',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Priya Patel',
    role: 'QA/QC Lead, BuildPro',
    quote: 'The analytics and QA/QC features help us deliver quality on time, every time.',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

const faqs = [
  {
    q: 'What is IMS?',
    a: 'A cloud-based platform for managing all aspects of construction information, from daily reports to compliance.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes, we use enterprise-grade encryption and regular audits to ensure your data is protected.',
  },
  {
    q: 'Can I integrate with other tools?',
    a: 'Absolutely! We support integrations with BIM, ERP, accounting, and more.',
  },
  {
    q: 'Is there a mobile app?',
    a: 'Yes, our platform is fully responsive and available on iOS and Android.',
  },
];

export default function LandingPage() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [faqOpen, setFaqOpen] = useState(Array(faqs.length).fill(false));
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setEmailError("");
  }
  function handleNewsletter(e) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmail("");
    alert("Thank you for signing up!");
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen text-gray-900 font-sans">
      <Helmet>
        <title>IMS - Construction Project Management Reimagined</title>
        <meta name="description" content="Streamline RFIs, Submittals, QA/QC, and more with IMS — the leading construction information platform." />
      </Helmet>

      {/* Hero Section */}
      {/* Header/Navbar */}
      <div className="fixed top-0 right-0 z-40 flex gap-2 p-4 sm:p-6 md:p-8">
        <select aria-label="Language" className="bg-white/80 text-blue-700 font-semibold px-4 py-2 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
        <Link to="/login" className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-5 py-2 rounded-full shadow hover:scale-105 hover:shadow-2xl transition text-sm">Log In</Link>
      </div>

      <section
        className="relative flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-16 pt-24 pb-32 overflow-hidden min-h-[600px]"
        style={{
          backgroundImage:
            'url(https://miro.medium.com/v2/resize:fit:3200/format:webp/1*TfIqQpwfXov287CCqjhetg.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 w-full max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto drop-shadow-xl backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl border border-blue-200 flex flex-col items-center space-y-4 py-8 px-4 sm:py-10 sm:px-10 md:py-14 md:px-16">
          <span className="font-semibold text-base text-white/80 mb-2 sm:mb-0">IMS Software</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2 drop-shadow-2xl text-white tracking-tight">Build Smarter. Manage Better.</h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-2 max-w-2xl mx-auto text-white font-medium drop-shadow-xl">The all-in-one Construction IMS trusted by global contractors.<br className="hidden sm:block" />Streamline daily reports, RFIs, QA/QC, and more.</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-4 w-full">
            <Link to="/signup" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 sm:py-4 sm:px-12 rounded-full shadow-xl transition text-lg border-2 border-blue-700">Get Started</Link>
            <a href="#demo" className="bg-transparent text-blue-700 font-bold py-3 px-8 sm:py-4 sm:px-12 rounded-full shadow-xl border-2 border-blue-700 hover:bg-blue-50 transition text-lg">Schedule a Demo</a>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-12 sm:py-16 md:py-20 px-2 sm:px-4 md:px-8 max-w-7xl mx-auto" id="features">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">Industry-Leading Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((f, idx) => (
            <div key={idx} className="bg-white/80 rounded-xl p-6 sm:p-8 shadow-lg flex flex-col items-center transition-all hover:bg-blue-50 hover:scale-105 w-full">
              <div className="mb-4 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-100 shadow">
                {React.cloneElement(f.icon, { className: "h-8 w-8 sm:h-10 sm:w-10 text-blue-600" })}
              </div>
              <h4 className="text-base sm:text-lg font-bold mb-2 text-blue-700 text-center">{f.title}</h4>
              <p className="text-sm sm:text-base text-gray-600 text-center">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 md:py-20 px-2 sm:px-4 md:px-8 max-w-5xl mx-auto" id="how">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {["Sign Up & Set Up", "Import Projects & Teams", "Start Managing & Collaborating"].map((step, i) => (
            <div key={step} className="bg-white/80 rounded-xl p-6 sm:p-8 shadow-lg flex flex-col items-center w-full">
              <div className="text-2xl sm:text-3xl md:text-4xl mb-4 font-extrabold text-blue-400">{i + 1}</div>
              <h4 className="text-base sm:text-xl font-bold mb-2 text-blue-700 text-center">{step}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-12 sm:py-16 md:py-20 px-2 sm:px-4 md:px-8 max-w-4xl mx-auto" id="demo">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center">See It In Action</h2>
        <div className="rounded-2xl overflow-hidden shadow-xl mb-4 aspect-video bg-black w-full">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Construction IMS Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="w-full h-full min-h-[200px] sm:min-h-[300px] md:min-h-[400px]"
          ></iframe>
        </div>
        <p className="text-center text-gray-600 text-sm sm:text-base">Watch how IMS streamlines your projects from start to finish.</p>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-12 sm:py-16 md:py-20 px-2 sm:px-4 md:px-8 max-w-4xl mx-auto" id="testimonials">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">What Our Clients Say</h2>
        <div className="flex flex-col items-center">
          <div className="bg-white/80 rounded-xl p-6 sm:p-8 shadow-lg max-w-xl w-full text-center">
            <img src={testimonials[testimonialIdx].photo} alt={testimonials[testimonialIdx].name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mx-auto mb-4 object-cover border-4 border-blue-400" loading="lazy" />
            <p className="italic mb-4 text-sm sm:text-base">"{testimonials[testimonialIdx].quote}"</p>
            <div className="font-bold text-blue-700 text-sm sm:text-base">- {testimonials[testimonialIdx].name}, <span className="font-normal text-gray-600">{testimonials[testimonialIdx].role}</span></div>
          </div>
          <div className="flex gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setTestimonialIdx(i)} className={`w-3 h-3 rounded-full ${testimonialIdx === i ? "bg-blue-400" : "bg-gray-400"}`}></button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 md:py-20 px-2 sm:px-4 md:px-8 max-w-5xl mx-auto" id="pricing">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">Simple, Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white/80 rounded-xl p-6 sm:p-8 shadow-lg flex flex-col items-center border-t-4 border-blue-400 w-full">
            <h4 className="text-base sm:text-xl font-bold mb-2">Starter</h4>
            <div className="text-2xl sm:text-3xl font-extrabold mb-2">Free</div>
            <ul className="mb-4 text-left text-gray-700 text-sm sm:text-base">
              <li>✔ 1 Project</li>
              <li>✔ Daily Reports</li>
              <li>✔ Submittals</li>
            </ul>
            <Link to="/signup" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow hover:bg-blue-700 transition text-sm sm:text-base">Sign Up</Link>
          </div>
          <div className="bg-white/90 rounded-xl p-6 sm:p-8 shadow-xl flex flex-col items-center border-t-4 border-blue-700 w-full">
            <h4 className="text-base sm:text-xl font-bold mb-2">Pro</h4>
            <div className="text-2xl sm:text-3xl font-extrabold mb-2">$49<span className="text-sm">/mo</span></div>
            <ul className="mb-4 text-left text-gray-700 text-sm sm:text-base">
              <li>✔ Unlimited Projects</li>
              <li>✔ All Modules</li>
              <li>✔ Export to PDF/Excel</li>
              <li>✔ Role Management</li>
            </ul>
            <Link to="/signup" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow hover:bg-blue-700 transition text-sm sm:text-base">Sign Up</Link>
          </div>
          <div className="bg-white/80 rounded-xl p-6 sm:p-8 shadow-lg flex flex-col items-center border-t-4 border-blue-400 w-full">
            <h4 className="text-base sm:text-xl font-bold mb-2">Enterprise</h4>
            <div className="text-2xl sm:text-3xl font-extrabold mb-2">Custom</div>
            <ul className="mb-4 text-left text-gray-700 text-sm sm:text-base">
              <li>✔ Dedicated Support</li>
              <li>✔ Custom Integrations</li>
              <li>✔ On-Prem Option</li>
            </ul>
            <a href="#contact" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow hover:bg-blue-700 transition text-sm sm:text-base">Contact Us</a>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 sm:py-16 md:py-20 px-2 sm:px-4 md:px-8 max-w-xl mx-auto" id="signup">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center">Stay Updated</h2>
        <form className="flex flex-col gap-4" onSubmit={handleNewsletter} autoComplete="off">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="rounded-full px-4 py-3 sm:px-6 sm:py-3 text-gray-900 bg-white/80 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            required
          />
          {emailError && <span className="text-red-400 text-sm">{emailError}</span>}
          <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition text-sm sm:text-base">Sign Up</button>
        </form>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 px-2 sm:px-4 md:px-8 max-w-4xl mx-auto" id="faq">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="bg-white/80 rounded-xl p-4 sm:p-6 shadow-lg w-full">
              <button
                className="w-full text-left font-bold text-base sm:text-lg flex justify-between items-center"
                onClick={() => setFaqOpen((open) => open.map((o, idx) => (idx === i ? !o : o)))}
              >
                {faq.q}
                <span>{faqOpen[i] ? "-" : "+"}</span>
              </button>
              {faqOpen[i] && <p className="mt-4 text-gray-700 text-sm sm:text-base">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-10 px-2 sm:px-4 text-center text-gray-300 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto gap-4">
          <div className="flex items-center gap-2">
            <StarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            <span className="font-bold text-base sm:text-lg text-white">IMS Software</span>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <a href="mailto:info@ims.com" className="hover:underline text-xs sm:text-base">info@ims.com</a>
            <a href="#" className="hover:underline text-xs sm:text-base">Terms</a>
            <a href="#" className="hover:underline text-xs sm:text-base">Privacy</a>
            <a href="#" className="hover:underline text-xs sm:text-base">Support</a>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <a href="#" aria-label="Twitter"><svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161c-.542.929-.855 2.01-.855 3.17 0 2.188 1.115 4.117 2.813 5.254a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z"/></svg></a>
            <a href="#" aria-label="LinkedIn"><svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.156 1.459-2.156 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg></a>
            <a href="#" aria-label="Facebook"><svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12v9.294h6.104c.733 0 1.325-.592 1.325-1.326v-21.349c0-.733-.592-1.326-1.325-1.326z"/></svg></a>
          </div>
        </div>
        <div className="mt-4 sm:mt-6 text-xs sm:text-sm">&copy; {new Date().getFullYear()} IMS Software. All rights reserved.</div>
      </footer>
    </div>
  );
}

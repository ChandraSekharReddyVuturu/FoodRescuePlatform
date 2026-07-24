import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../../components/PublicNavbar';
import PublicFooter from '../../components/PublicFooter';
import api from '../../services/api';

import '../../assets/css/common/common.css';
import '../../assets/css/public/home.css';
import heroImg from '../../assets/images/public/hero.png';
import aboutImg from '../../assets/images/public/about.png';

export default function Home() {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    rating: '',
    comments: '',
  });

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/website-feedback', {
        name: feedback.name,
        email: feedback.email,
        rating: feedback.rating,
        comments: feedback.comments,
      });
      alert('Thank you for your feedback!');
      setFeedback({ name: '', email: '', rating: '', comments: '' });
    } catch (err) {
      alert('Feedback submitted successfully!');
      setFeedback({ name: '', email: '', rating: '', comments: '' });
    }
  };

  return (
    <>
      <PublicNavbar />

      {/* HERO */}
      <section className="hero" id="home">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-tag">
              🌱 Fighting Hunger • Saving Food • Changing Lives
            </span>
            <h1>
              Every Meal Saved
              <br />
              Is A Life Nourished.
            </h1>
            <p>
              Food Rescue Platform connects Restaurants, NGOs and Volunteers to rescue surplus food,
              reduce food waste and deliver nutritious meals to people who need them the most.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="primary-btn">
                Become a Partner
              </Link>
              <a href="#about" className="secondary-btn">
                Learn More
              </a>
            </div>
            <div className="hero-stats">
              <div>
                <h3 id="mealCounter">12,000+</h3>
                <span>Meals Saved</span>
              </div>
              <div>
                <h3 id="restaurantCounter">350+</h3>
                <span>Restaurants</span>
              </div>
              <div>
                <h3 id="ngoCounter">120+</h3>
                <span>NGOs</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img src={heroImg} alt="Food Rescue" />
            <div className="floating-card card1">
              <i className="fa-solid fa-bowl-food"></i>
              <div>
                <h4>Food Donated</h4>
                <p>Fresh & Safe</p>
              </div>
            </div>
            <div className="floating-card card2">
              <i className="fa-solid fa-hand-holding-heart"></i>
              <div>
                <h4>NGO Connected</h4>
                <p>Ready to Collect</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WAVE DIVIDER */}
      <div className="wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 180">
          <path fill="#ffffff" d="M0,64L80,74.7C160,85,320,107,480,128C640,149,800,171,960,160C1120,149,1280,107,1360,85.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>

      {/* ABOUT US */}
      <section className="about" id="about">
        <div className="container about-container">
          <div className="about-image">
            <img src={aboutImg} alt="About Food Rescue" />
          </div>
          <div className="about-content">
            <span className="section-tag">ABOUT FOOD RESCUE</span>
            <h2>
              Saving Good Food,
              <br />
              Serving Humanity.
            </h2>
            <p>
              Every day thousands of kilograms of perfectly edible food are wasted while millions of people struggle with hunger. Food Rescue Platform bridges this gap by connecting Restaurants, NGOs and Volunteers through one smart platform.
            </p>
            <p>
              Our goal is to reduce food wastage, improve food accessibility and build a sustainable community where every surplus meal reaches someone in need instead of ending up in landfills.
            </p>
            <div className="about-highlights">
              <div className="highlight">
                <i className="fa-solid fa-circle-check"></i>
                <span>Verified Restaurants</span>
              </div>
              <div className="highlight">
                <i className="fa-solid fa-circle-check"></i>
                <span>Trusted NGOs</span>
              </div>
              <div className="highlight">
                <i className="fa-solid fa-circle-check"></i>
                <span>Fast Food Distribution</span>
              </div>
              <div className="highlight">
                <i className="fa-solid fa-circle-check"></i>
                <span>Zero Food Waste Mission</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="mission">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <i className="fa-solid fa-bullseye"></i>
              <h3>Our Mission</h3>
              <p>
                To create an efficient digital ecosystem that rescues surplus food from restaurants and distributes it safely to NGOs and people in need, reducing hunger and minimizing food waste.
              </p>
            </div>
            <div className="mission-card">
              <i className="fa-solid fa-eye"></i>
              <h3>Our Vision</h3>
              <p>
                To build a future where no edible food goes to waste and every community has access to nutritious meals through collaboration and technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="container">
          <span className="section-tag">WHY CHOOSE US</span>
          <h2>
            Making Food Donation
            <br />
            Easier Than Ever
          </h2>
          <p className="section-description">
            Our platform provides a simple, secure and transparent process for donating and distributing surplus food.
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <i className="fa-solid fa-bolt"></i>
              <h3>Instant Requests</h3>
              <p>NGOs receive food availability instantly and can send requests in real time.</p>
            </div>
            <div className="feature-card">
              <i className="fa-solid fa-shield-heart"></i>
              <h3>Secure Platform</h3>
              <p>Only verified restaurants and NGOs are allowed to participate in food donations.</p>
            </div>
            <div className="feature-card">
              <i className="fa-solid fa-truck-fast"></i>
              <h3>Fast Delivery</h3>
              <p>Volunteers ensure quick pickup and delivery before food reaches its expiry time.</p>
            </div>
            <div className="feature-card">
              <i className="fa-solid fa-earth-asia"></i>
              <h3>Sustainable Future</h3>
              <p>Every rescued meal helps reduce food waste and supports environmental sustainability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="impact">
        <div className="container">
          <div className="impact-header">
            <span className="section-tag">OUR IMPACT</span>
            <h2>
              Together We Are Creating
              <br />
              A Better Tomorrow
            </h2>
          </div>
          <div className="impact-grid">
            <div className="impact-card">
              <i className="fa-solid fa-bowl-food"></i>
              <h3>Thousands of Meals</h3>
              <p>Every donation helps feed hungry families and reduces unnecessary food waste.</p>
            </div>
            <div className="impact-card">
              <i className="fa-solid fa-users"></i>
              <h3>Community Support</h3>
              <p>Restaurants, NGOs and Volunteers work together for a common social cause.</p>
            </div>
            <div className="impact-card">
              <i className="fa-solid fa-seedling"></i>
              <h3>Greener Planet</h3>
              <p>Less food waste means fewer greenhouse gas emissions and a healthier environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <span className="section-tag">SIMPLE PROCESS</span>
          <h2>How Food Rescue Works</h2>
          <p className="section-description">
            A simple process that connects food donors with NGOs and ensures surplus food reaches people who need it.
          </p>
          <div className="timeline">
            <div className="timeline-card">
              <div className="number">1</div>
              <i className="fa-solid fa-store"></i>
              <h3>Restaurant</h3>
              <p>Restaurants register and donate surplus food with quantity, expiry time and pickup location.</p>
            </div>
            <div className="timeline-arrow">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
            <div className="timeline-card">
              <div className="number">2</div>
              <i className="fa-solid fa-hand-holding-heart"></i>
              <h3>NGO</h3>
              <p>NGOs browse available donations and send requests for the food they require.</p>
            </div>
            <div className="timeline-arrow">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
            <div className="timeline-card">
              <div className="number">3</div>
              <i className="fa-solid fa-truck-fast"></i>
              <h3>Delivery</h3>
              <p>Food is collected and safely delivered to the beneficiaries before it expires.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE STATISTICS */}
      <section className="statistics">
        <div className="container">
          <span className="section-tag">LIVE IMPACT</span>
          <h2>Together We Are Making A Difference</h2>
          <div className="statistics-grid">
            <div className="statistics-card">
              <i className="fa-solid fa-bowl-food"></i>
              <h3 id="mealCounter2">12,000+</h3>
              <p>Meals Rescued</p>
            </div>
            <div className="statistics-card">
              <i className="fa-solid fa-store"></i>
              <h3 id="restaurantCounter2">350+</h3>
              <p>Restaurants</p>
            </div>
            <div className="statistics-card">
              <i className="fa-solid fa-hand-holding-heart"></i>
              <h3 id="ngoCounter2">120+</h3>
              <p>NGOs</p>
            </div>
            <div className="statistics-card">
              <i className="fa-solid fa-users"></i>
              <h3 id="volunteerCounter2">500+</h3>
              <p>Volunteers</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="container">
          <span className="section-tag">TESTIMONIALS</span>
          <h2>What People Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <i className="fa-solid fa-quote-left quote"></i>
              <p>
                "Food Rescue made donating surplus food simple. Instead of wasting food, we now help hundreds of people every month."
              </p>
              <div className="testimonial-user">
                <i className="fa-solid fa-store user-icon"></i>
                <div>
                  <h4>Restaurant Partner</h4>
                  <span>Food Donor</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <i className="fa-solid fa-quote-left quote"></i>
              <p>
                "The platform helps us quickly locate nearby food donations and distribute them efficiently to the communities we serve."
              </p>
              <div className="testimonial-user">
                <i className="fa-solid fa-hand-holding-heart user-icon"></i>
                <div>
                  <h4>NGO Coordinator</h4>
                  <span>Food Distribution</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <i className="fa-solid fa-quote-left quote"></i>
              <p>
                "Volunteering has become much easier. We receive pickup information instantly and ensure food reaches people safely."
              </p>
              <div className="testimonial-user">
                <i className="fa-solid fa-truck-fast user-icon"></i>
                <div>
                  <h4>Volunteer</h4>
                  <span>Delivery Partner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta">
        <div className="container">
          <h2>Become A Part Of The Change</h2>
          <p>
            Join restaurants, NGOs and volunteers working together to eliminate food waste and fight hunger.
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="primary-btn">
              Join Now
            </Link>
            <Link to="/login" className="secondary-btn">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="container">
          <span className="section-tag">CONTACT US</span>
          <h2>We'd Love To Hear From You</h2>
          <p className="section-description">
            Have questions or want to partner with us? Reach out anytime.
          </p>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-card">
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h3>Address</h3>
                  <p>Madanapalle, Andhra Pradesh, India</p>
                </div>
              </div>
              <div className="contact-card">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <h3>Email</h3>
                  <p>support@foodrescue.com</p>
                </div>
              </div>
              <div className="contact-card">
                <i className="fa-solid fa-phone"></i>
                <div>
                  <h3>Phone</h3>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              <div className="contact-card">
                <i className="fa-solid fa-clock"></i>
                <div>
                  <h3>Working Hours</h3>
                  <p>Mon - Sat : 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <input type="text" placeholder="Subject" required />
                <textarea rows="6" placeholder="Write your message..." required></textarea>
                <button type="submit" className="primary-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FEEDBACK */}
      <section className="feedback" id="feedback">
        <div className="container">
          <span className="section-tag">YOUR FEEDBACK</span>
          <h2>Help Us Improve</h2>
          <p className="section-description">
            Your suggestions help us make Food Rescue even better.
          </p>
          <div className="feedback-box">
            <form id="feedbackForm" onSubmit={handleFeedbackSubmit}>
              <input
                type="text"
                id="feedbackName"
                placeholder="Your Name"
                value={feedback.name}
                onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                required
              />
              <input
                type="email"
                id="feedbackEmail"
                placeholder="Your Email"
                value={feedback.email}
                onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                required
              />
              <select
                id="feedbackRating"
                value={feedback.rating}
                onChange={(e) => setFeedback({ ...feedback, rating: e.target.value })}
                required
              >
                <option value="">Rate Our Platform</option>
                <option>⭐⭐⭐⭐⭐ Excellent</option>
                <option>⭐⭐⭐⭐ Very Good</option>
                <option>⭐⭐⭐ Good</option>
                <option>⭐⭐ Average</option>
                <option>⭐ Poor</option>
              </select>
              <textarea
                id="feedbackComments"
                rows="5"
                placeholder="Share your feedback..."
                value={feedback.comments}
                onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
                required
              ></textarea>
              <button type="submit" className="primary-btn">
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </section>

      <PublicFooter />
    </>
  );
}

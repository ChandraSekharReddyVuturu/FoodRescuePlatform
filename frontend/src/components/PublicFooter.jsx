import React from 'react';

export default function PublicFooter() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>Food Rescue</h3>
          <p>
            Connecting Restaurants, NGOs and Volunteers
            to reduce food waste and fight hunger.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <a href="/#home">Home</a>
          <a href="/#about">About</a>
          <a href="/#features">Features</a>
          <a href="/#contact">Contact</a>
        </div>

        <div>
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </div>

      <div className="copyright">
        © 2026 Food Rescue Platform | All Rights Reserved.
      </div>
    </footer>
  );
}

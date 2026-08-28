import React, { useState } from 'react';
import { Star, Send, CheckCircle2 } from 'lucide-react';
import "./Feedback.css";
import { showSuccessToast, showErrorToast } from "../components/notification/Notify";
import axios from "axios";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('General');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      showErrorToast("Please write something!");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8080/api/user/feedback",
        {
          rating,
          category,
          message
        },
        {
          withCredentials: true
        }
      );

      // Trigger success notifications & update view
      showSuccessToast("Feedback submitted successfully!");
      setSubmitted(true);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong. Please try again.";
      showErrorToast(errorMessage);
      // console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['General', 'Bug Report', 'Feature Request', 'UI/UX Design'];

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h1>Send Feedback</h1>
        <p>Help us improve FlowDesk. We read every submission!</p>
      </div>

      {submitted ? (
        <div className="feedback-card success-card">
          <CheckCircle2 size={48} className="success-icon" />
          <h2>Thank You!</h2>
          <p>Your feedback has been submitted successfully.</p>
          <button
            className="btn-primary"
            onClick={() => { 
              setSubmitted(false); 
              setRating(0); 
              setMessage(''); 
              setCategory('General');
            }}
          >
            Send Another Response
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="feedback-card">
          {/* Rating Section */}
          <div className="form-group">
            <label>How would you rate your experience?</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`star-btn ${star <= (hoverRating || rating) ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star size={28} fill={star <= (hoverRating || rating) ? '#8b5cf6' : 'none'} />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Category */}
          <div className="form-group">
            <label>Topic</label>
            <div className="category-pills">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  className={`pill ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Message Textarea */}
          <div className="form-group">
            <label htmlFor="feedback-msg">Your Message</label>
            <textarea
              id="feedback-msg"
              rows={5}
              placeholder="Tell us what's working well or what we can do better..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-primary submit-btn" disabled={loading}>
            <Send size={18} />
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      )}
    </div>
  );
}
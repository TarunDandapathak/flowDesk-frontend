import React from "react";
import "./TaskSkeliton.css";

export default function TaskSkeliton({ count = 6 }) {
  return (
    <div className="skeleton-container">
      {Array.from({ length: count }).map((_, idx) => (
        <div className="skeleton-card" key={idx}>
          <div className="skeleton-checkbox skeleton-pulse" />
          
          <div className="skeleton-main">
            <div className="skeleton-header">
              <div className="skeleton-title skeleton-pulse" />
              <div className="skeleton-badges">
                <div className="skeleton-badge skeleton-pulse" />
                <div className="skeleton-badge skeleton-pulse" />
                <div className="skeleton-actions skeleton-pulse" />
              </div>
            </div>
            
            <div className="skeleton-description skeleton-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
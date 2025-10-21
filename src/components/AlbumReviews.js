import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Reviews.css';

const AlbumReviews = ({ albumId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
    const [submitting, setSubmitting] = useState(false);
    const { isAuthenticated, refreshToken } = useAuth();

    useEffect(() => {
        fetchReviews();
    }, [albumId]);

    const fetchReviews = async () => {
        setLoading(true);
        setError('');

        let token = localStorage.getItem('access_token');

        if (!token) {
            console.warn('No access token found — trying to refresh...');
            const refreshed = await refreshToken();
            if (refreshed) {
                token = localStorage.getItem('access_token');
            } else {
                setError('Please login to view reviews');
                setLoading(false);
                return;
            }
        }

        try {
            const response = await fetch(`http://localhost:8000/albums/${albumId}/reviews/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setReviews(data);
            } else if (response.status === 401) {
                console.warn('Access token expired — trying to refresh...');
                const refreshed = await refreshToken();
                if (refreshed) {
                    return fetchReviews(); // повторний запит після оновлення токена
                } else {
                    setError('Please login to view reviews');
                }
            } else {
                const errorData = await response.json();
                console.error('Error loading reviews:', errorData);
                setError('Failed to load reviews');
            }
        } catch (err) {
            console.error('Error fetching reviews:', err);
            setError('Network error');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!newReview.comment.trim()) {
            alert('Please write a comment');
            return;
        }

        setSubmitting(true);
        setError('');

        let token = localStorage.getItem('access_token');
        if (!token) {
            const refreshed = await refreshToken();
            if (refreshed) {
                token = localStorage.getItem('access_token');
            } else {
                setError('Please login to write a review');
                setSubmitting(false);
                return;
            }
        }

        try {
            const response = await fetch(`http://localhost:8000/albums/${albumId}/reviews/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    rating: newReview.rating,
                    comment: newReview.comment,
                })
            });

            if (response.ok) {
                const data = await response.json();
                setReviews([data, ...reviews]);
                setNewReview({ rating: 5, comment: '' });
                setShowForm(false);
            } else if (response.status === 401) {
                const refreshed = await refreshToken();
                if (refreshed) {
                    return handleSubmitReview(e);
                } else {
                    setError('Session expired. Please login again.');
                }
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Failed to submit review');
            }
        } catch (err) {
            console.error('Error submitting review:', err);
            setError('Network error');
        } finally {
            setSubmitting(false);
        }
    };

    const renderStars = (rating) => '★'.repeat(rating) + '☆'.repeat(5 - rating);

    if (loading) return <div className="reviews-loading">Loading reviews...</div>;

    return (
        <div className="reviews-section">
            <div className="reviews-header">
                <h3>Reviews ({reviews.length})</h3>
                {isAuthenticated && !showForm && (
                    <button onClick={() => setShowForm(true)} className="add-review-btn">
                        + Write a Review
                    </button>
                )}
            </div>

            {error && <div className="error-message">{error}</div>}

            {showForm && (
                <form onSubmit={handleSubmitReview} className="review-form">
                    <h4>Write Your Review</h4>
                    <div className="form-group">
                        <label>Rating</label>
                        <div className="rating-input">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${star <= newReview.rating ? 'active' : ''}`}
                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="comment">Your Review</label>
                        <textarea
                            id="comment"
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            placeholder="Share your thoughts..."
                            rows="4"
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn" disabled={submitting}>
                            {submitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </div>
                </form>
            )}

            <div className="reviews-list">
                {reviews.length === 0 ? (
                    <div className="no-reviews"><p>No reviews yet.</p></div>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <div className="review-header">
                                <div className="review-user">
                                    <div className="user-avatar">
                                        {review.username?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div className="user-info">
                                        <span className="username">{review.username || 'Anonymous'}</span>
                                    </div>
                                </div>
                                <div className="review-rating">{renderStars(review.rating)}</div>
                            </div>
                            <div className="review-content">
                                <p>{review.comment}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {!isAuthenticated && (
                <div className="login-prompt">
                    <p>Please login to write a review</p>
                </div>
            )}
        </div>
    );
};

export default AlbumReviews;

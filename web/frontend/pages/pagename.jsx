import {
  CalloutCard,
  Page,
  Layout,
  Button,
  Modal,
  TextField,
} from "@shopify/polaris";
import { useState, useCallback } from "react";

export default function PageName() {
  const [isFetch, setisFetch] = useState(false);
  const [reviews, setgetReview] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const fetchReview = async () => {
    setisFetch(true);
    const response = await fetch("/api/shopify/getreview", { method: "get" });

    if (response.ok) {
      const data = await response.json();
      setgetReview(data.data || []);
    } else {
      console.error("Failed to fetch reviews");
    }
    setisFetch(false);
  };

  const editReview = async (reviewId, updatedReviewData) => {
    try {
      const response = await fetch("/api/shopify/editreview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId, ...updatedReviewData }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Review updated successfully:", data);

        setgetReview((prevReviews) =>
          prevReviews.map((review) =>
            review._id === reviewId ? { ...review, ...updatedReviewData } : review
          )
        );

        setIsModalOpen(false); // Close modal after successful update
      } else {
        console.error("Failed to update review");
      }
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleEditClick = (review) => {
    setSelectedReview(review); // Set the selected review
    setIsModalOpen(true); // Open modal
  };

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedReview(null); // Reset selected review
  }, []);

  // Make this function async
  const handleSaveReview = async () => {
    if (selectedReview) {
      const { _id, reviewTitle, reviewText, rating } = selectedReview;
      try {
        const response = await fetch("/api/shopify/editreview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id,
            reviewTitle: reviewTitle,
            reviewText: reviewText,
            rating: rating,
          }),
        });

        const result = await response.json();
        if (result.success) {
          console.log("Review updated:", result.data);
          // Update the review in the state
          setgetReview((prevReviews) =>
            prevReviews.map((review) =>
              review._id === _id
                ? { ...review, reviewTitle, reviewText, rating }
                : review
            )
          );
        } else {
          console.error("Failed to update review:", result.message);
        }
      } catch (error) {
        console.error("Error updating review:", error);
      }
      // Close the modal after saving
      setIsModalOpen(false);
    }
  };

  return (
    <Page title="Reviews">
      <Layout>
        <Layout.Section>
          <Button onClick={fetchReview} loading={isFetch}>
            Get Reviews
          </Button>
        </Layout.Section>

        <Layout.Section>
          {reviews.map((review) => (
            <CalloutCard
              key={review._id}
              title={review.reviewTitle}
              primaryAction={{
                content: "Edit Review",
                onAction: () => handleEditClick(review),
              }}
            >
              <p><strong>Review Text:</strong> {review.reviewText}</p>
              <p><strong>Review Rating:</strong> {review.rating}/5</p>
              <p><strong>Product ID:</strong> {review.productID}</p>
            </CalloutCard>
          ))}
        </Layout.Section>
      </Layout>

      {/* Modal for editing reviews */}
      {isModalOpen && selectedReview && (
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          title="Edit Review"
          primaryAction={{
            content: "Save",
            onAction: handleSaveReview,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: handleModalClose,
            },
          ]}
        >
          <Modal.Section>
            <TextField
              label="Review Title"
              value={selectedReview.reviewTitle}
              onChange={(value) =>
                setSelectedReview({ ...selectedReview, reviewTitle: value })
              }
            />
            <TextField
              label="Review Text"
              value={selectedReview.reviewText}
              onChange={(value) =>
                setSelectedReview({ ...selectedReview, reviewText: value })
              }
              multiline={4}
            />
            <TextField
              label="Rating"
              type="number"
              value={String(selectedReview.rating)}
              onChange={(value) =>
                setSelectedReview({ ...selectedReview, rating: Number(value) })
              }
              min={1}
              max={5}
            />
          </Modal.Section>
        </Modal>
      )}
    </Page>
  );
}

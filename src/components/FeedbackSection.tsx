import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MessageSquare, Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackSectionProps {
  className?: string;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  className,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.feedback) {
      setError("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Create mailto link with feedback details
      const subject = encodeURIComponent("SortViz Feedback");
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nFeedback:\n${formData.feedback}`,
      );
      const mailtoLink = `mailto:adityaamishra11@gmail.com?subject=${subject}&body=${body}`;

      // Open default email client
      window.location.href = mailtoLink;

      // Reset form and show success
      setFormData({ name: "", email: "", feedback: "" });
      setIsSubmitted(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setError("Failed to open email client. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-sortviz-green mx-auto" />
            <h3 className="text-xl font-semibold text-sortviz-green">
              Thank You for Your Feedback!
            </h3>
            <p className="text-muted-foreground">
              Your feedback has been prepared for sending. Your email client
              should have opened with the feedback ready to send.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="mt-4"
            >
              Send Another Feedback
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-sortviz-blue" />
          Share Your Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Help us improve SortViz! Share your thoughts, suggestions, or report
            any issues you encountered.
          </p>

          {error && (
            <Alert className="bg-sortviz-red/10 border-sortviz-red/20">
              <AlertDescription className="text-sortviz-red">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                name="feedback"
                placeholder="Share your thoughts, suggestions, or report any issues..."
                value={formData.feedback}
                onChange={handleInputChange}
                disabled={isSubmitting}
                rows={4}
                className="resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Preparing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Feedback
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-card/50 border rounded-lg">
            <h4 className="font-medium text-sm mb-2">💡 Feedback Ideas</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• How can we improve the visualization?</li>
              <li>• Which algorithms would you like to see added?</li>
              <li>• Any bugs or issues you encountered?</li>
              <li>• Suggestions for better learning experience?</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackSection;

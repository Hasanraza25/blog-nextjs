"use client";
import { useState, useEffect, useRef } from "react";

const CommentSection = ({ slug }: { slug: string }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [comment, setComment] = useState("");
  const [newCommentIndex, setNewCommentIndex] = useState<number | null>(null); 
  const [isAnimating, setIsAnimating] = useState(false); 
  const commentRef = useRef<any>(null); 

  
  useEffect(() => {
    const storedComments = localStorage.getItem(slug);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, [slug]);

  
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(slug, JSON.stringify(comments));
    }
  }, [comments, slug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        comment,
        _createdAt: new Date().toISOString(),
      };
      const updatedComments = [newComment, ...comments]; 
      setComments(updatedComments);
      setNewCommentIndex(0); 
      setIsAnimating(true); 
      setComment("");

      
      setTimeout(() => {
        if (commentRef.current) {
          commentRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100); 

      
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="mt-16 max-w-full mx-auto px-4">
      <h2 className="text-3xl font-semibold mb-8 text-center text-blue-600">Join the Conversation</h2>

      {/* Display Comments */}
      <div className="space-y-6">
        {comments.map((comment, index) => (
          <div
            key={index}
            ref={index === newCommentIndex ? commentRef : null} 
            className={`w-full p-6 rounded-lg shadow-lg border border-blue-400 transition-all duration-500 ease-in-out transform ${
              index === newCommentIndex
                ? isAnimating
                  ? "opacity-0 translate-y-4 animate-fadeIn" 
                  : "opacity-100 translate-y-0" 
                : "opacity-100 translate-y-0"
            } ${index === 0 ? "bg-blue-200" : "bg-blue-100"}`} 
          >
            <p className="text-lg text-blue-900 break-words">{comment.comment}</p> {/* Added break-words */}
            <p className="mt-2 text-sm text-blue-600">{new Date(comment._createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-6 mt-12">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-4 border rounded-xl border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 ease-in-out"
          rows={4}
          placeholder="Share your thoughts..."
        />
        <button
          type="submit"
          className="w-auto py-3 px-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none outline-none transition duration-200 ease-in-out"
        >
          Post Comment
        </button>
      </form>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CommentSection;

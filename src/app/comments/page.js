'use client';

import { useEffect, useState } from 'react';

async function fetchComments() {
  const res = await fetch('/api/comments');
  const data = await res.json();
  return data;
}

function CommentList({ comments }) {
  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <li key={comment.id} className="bg-white p-4 rounded-lg shadow">
          <strong className="block font-semibold">{comment.author}</strong>
          <p>{comment.text}</p>
        </li>
      ))}
    </ul>
  );
}

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    let interval;

    async function fetchAndSetComments() {
      const fetchedComments = await fetchComments();
      setComments(fetchedComments);
    }

    fetchAndSetComments();
    interval = setInterval(fetchAndSetComments, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment && author) {
      await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author, text: newComment }),
      });
      setNewComment('');
      setAuthor('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 mt-10">글쓰기</h2>
      <CommentList comments={comments} />
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-2">
          <input
            type="text"
            placeholder="이름"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-2">
          <textarea
            placeholder="내용을 입력하세요."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          작성하기
        </button>
      </form>
    </div>
  );
}

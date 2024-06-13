let comments = [];
let idCounter = 1;

export async function GET(request) {
  return new Response(JSON.stringify(comments), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  const { author, text } = await request.json();
  const newComment = { id: idCounter++, author, text };
  comments.push(newComment);
  return new Response(JSON.stringify(newComment), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  });
}

import React from "react";

// Poll type definition
type Poll = {
  id: number;
  title: string;
  description: string;
  options: { text: string; votes: number }[];
  createdAt: Date;
};

type PollListProps = {
  polls: Poll[];
  onVote: (pollId: number, optionIdx: number) => void;
};

const PollList: React.FC<PollListProps> = ({ polls, onVote }) => (
  <div className="w-full max-w-xl">
    <h3 className="text-xl font-semibold mb-4">All Polls</h3>
    {polls.length === 0 && (
      <div className="text-gray-500">No polls created yet.</div>
    )}
    {polls.map(poll => (
      <div key={poll.id} className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-lg">{poll.title}</span>
          <span className="text-xs text-gray-400">
            {poll.createdAt.toLocaleString()}
          </span>
        </div>
        <div className="mb-2 text-gray-700">{poll.description}</div>
        <div>
          {poll.options.map((opt, idx) => (
            <div key={idx} className="flex items-center mb-2">
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                onClick={() => onVote(poll.id, idx)}
              >
                Vote
              </button>
              <span className="flex-1">{opt.text}</span>
              <span className="ml-2 text-gray-500">Votes: {opt.votes}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Total votes: {poll.options.reduce((sum, o) => sum + o.votes, 0)}
        </div>
      </div>
    ))}
  </div>
);

export default PollList;

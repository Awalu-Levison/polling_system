"use client";

import React, { useState } from "react";
import { supabase } from '../../lib/supabaseClient';

const NewPollForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleOptionChange = (idx: number, value: string) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (idx: number) => setOptions(options.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (options.some(opt => opt.trim() === '')) {
      alert('Please make sure no option is empty.');
      return;
    }
    setIsSubmitting(true);

    try {
      // 1. Insert the poll
      const { data: poll, error: pollError } = await supabase
        .from('polls')
        .insert([{ title, description }])
        .select()
        .single();

      if (pollError) throw pollError;

      // 2. Insert the poll options
      const pollOptions = options.map(optionText => ({
        poll_id: poll.id,
        option_text: optionText,
      }));

      const { error: optionsError } = await supabase.from('poll_options').insert(pollOptions);

      if (optionsError) throw optionsError;

      alert('Poll created successfully!');
      setTitle('');
      setDescription('');
      setOptions(['', '']);
      // You might want to redirect the user to the new poll's page
      // import { useRouter } from 'next/navigation';
      // const router = useRouter();
      // router.push(`/polls/${poll.id}`);

    } catch (error) {
      console.error('Error creating poll:', error);
      if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
        alert(`Error creating poll: ${(error as any).message}`);
      } else {
        alert('An unknown error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
      <div className="w-full max-w-xl bg-white-50 rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Create New Poll</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Poll Title</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Options</label>
            {options.map((opt, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <input
                  type="text"
                  className="flex-1 border rounded px-3 py-2"
                  value={opt}
                  onChange={e => handleOptionChange(idx, e.target.value)}
                  required
                  placeholder={`Option ${idx + 1}`}
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    className="ml-2 text-red-500"
                    onClick={() => removeOption(idx)}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="mt-2 text-blue-800 font-medium"
              onClick={addOption}
            >
              + Add Option
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Poll'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPollForm;

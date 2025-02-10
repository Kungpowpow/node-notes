import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '@/utils/api';
import type { Note } from '@/app/interfaces/note.interface';
import Error from "@/components/error.tsx";

function Browse() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const response = await api.get<{success: boolean, data: Note[]}>('/api/notes');
				if (response.data.success) {
					setNotes(response.data.data);
				}
			} catch (err) {
				setError('Failed to fetch notes');
				console.error(err);
			}
		};

		fetchNotes();
	}, []);

	return (
		<div>
			{error && (
				<Error error={error}/>
			)}
			{notes.length === 0 ? (
				<p className="text-gray-500 text-center py-4 font-display">No notes found. <br />Create a new note with the button above.</p>
			) : (
				<ul className="divide-y divide-gray-100">
					{notes.map((note) => (
						<li key={note.id} className="py-4">
							<Link to={`/read/${note.id}`} className="block hover:bg-gray-50 -mx-6 px-6">
								<div className="flex flex-col gap-1">
									<h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
									<p className="text-sm text-gray-600 line-clamp-2">{note.content}</p>
									<p className="text-xs text-gray-500">
										Created: {new Date(note.createdAt).toLocaleDateString()}
									</p>
								</div>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default Browse;
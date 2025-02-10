export default function Error({error}:{error:string}) {
	return (
		<p className="text-red-600 mb-4 font-display text-center">{error}</p>
	)
}
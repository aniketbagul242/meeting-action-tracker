

const TranscriptHistory = ({ history })=> {
  return (
    <div>
      <h2 className="font-bold mb-4 text-lg">Last 5 Transcripts</h2>
      <ul className="flex flex-col gap-2">
        {history.map(t => (
          <li
            key={t._id}
            className="border p-2 rounded bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all duration-150"
            title="Click to reload tasks"
          >
            {t.content.length > 60 ? t.content.substring(0, 60) + "..." : t.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TranscriptHistory;
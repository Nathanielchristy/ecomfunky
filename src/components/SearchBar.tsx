export default function SearchBar() {
  return (
    <div className="hidden md:block flex-1 mx-6">
      <input
        type="text"
        placeholder="Search..."
        className="w-half border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  );
}

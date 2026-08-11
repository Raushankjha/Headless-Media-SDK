import { FormEvent, useState } from "react";

export function SearchBar({
  initialValue = "",
  onSearch,
}: {
  initialValue?: string;
  onSearch: (query: string) => void;
}) {
  const [value, setValue] = useState(initialValue);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const q = value.trim();
    if (q) onSearch(q);
  };
  return (
    <form className="search" onSubmit={submit}>
      <input
        aria-label="Search media"
        placeholder="Search photos & videos..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

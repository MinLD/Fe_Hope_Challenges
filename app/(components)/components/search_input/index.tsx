"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
type Props = {
  onSearch: (query: string) => void;
  bgColor?: string;
  textColor?: string;
  block?: string;
  show?: string;
};
function SearchInput({
  onSearch,
  bgColor = "#fff",
  textColor = "#fff",
  block = "sm:block",
  show = "hidden",
}: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchContainerRef = useRef<HTMLFormElement | null | any>(null);

  const router = useRouter();
  const handleSeach = async () => {};
  // Debouncing: Chỉ gọi API sau khi người dùng ngừng gõ 300ms
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    handleSeach();

    setIsLoading(true);
    const debounceTimer = setTimeout(async () => {}, 300);

    // Cleanup: Hủy timer nếu người dùng gõ tiếp
    return () => clearTimeout(debounceTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // // Đóng gợi ý khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setSuggestions([]); // Ẩn gợi ý sau khi tìm kiếm
  };
  const handleSuggestionClick = (suggestion: string) => {
    // Chỉ cần đặt giá trị mới, không cần xóa giá trị cũ
    setQuery(suggestion);
    setSuggestions([]);

    // Sau khi người dùng nhấp vào gợi ý, nên thực hiện tìm kiếm luôn
    handleReturn(suggestion);
  };
  const handleReturn = (keyword: string) => {
    router.push(`/search/top?q=${keyword}`);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        ref={searchContainerRef}
        className={` ${show && show} ${
          block && block
        } relative  w-full flex-1 max-w-[300px] md:max-w-[500px]   transition-all ease-in-out duration-300`}
      >
        <input
          value={query}
          placeholder="Tìm kiếm việc làm, hoàn cảnh cần giúp đỡ..."
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleReturn(query)}
          className={`pl-1 p-1 pr-8  w-full flex-1 border rounded-[10px] border-[${bgColor}] placeholder:text-[14px] text-[${textColor}] outline-none`}
        />
        <span
          className="absolute top-2 right-2"
          onClick={() => handleReturn(query)}
        >
          <IoSearchSharp size={20} />
        </span>
      </form>
    </>
  );
}

export default SearchInput;

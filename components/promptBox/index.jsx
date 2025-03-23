import { assets } from "@/assets/assets";

function PromptBox() {
  const [prompt, setPrompt] = useState("");
  return (
    <form
      className={`w-full ${
        false ? "max-w-3xl" : "max-w-2xl"
      } bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}
    >
      <textarea
        className="outline-none w-full resize-none overflow-hidden break-words bg-transparent"
        rows={2}
        placeholder="Message DeepSeek"
        required
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      />

      <div className="flex items-center justify-between text-sm">
        <div className="flex flex-items gap-2">
          <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
            <Image src={assets.deepthink_icon} alt="" className="h-5" />
            DeepThink(R1)
          </p>
          <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
            <Image src={assets.search_icon} alt="" className="h-5" />
            Search
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image src={assets.pin_icon} className="w-4 cursor-pointer" alt="" />
          <button>
            <Image
              src={assets.pin_icon}
              className="w-4 cursor-pointer"
              alt=""
            />
          </button>
        </div>
      </div>
    </form>
  );
}

export default PromptBox;

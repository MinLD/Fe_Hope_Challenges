"use client";

import { useEffect, useState, useRef, useContext } from "react";
import { useSocket } from "@/app/lib/context/SocketContext";
import { AuthContext } from "@/app/lib/context/AuthContext";

// Định nghĩa kiểu dữ liệu cho Log để dễ quản lý
type LogEntry = {
  id: number;
  message: string;
  timestamp: string;
};

export default function RealtimeTest() {
  // --- GLOBAL SOCKET ---
  const { socket, isConnected } = useSocket();
  const auth = useContext(AuthContext);

  // --- STATE ---
  const [userId, setUserId] = useState("");
  const [reqId, setReqId] = useState<any[]>([]); // Để hứng Request ID khi có kèo
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Ref để auto-scroll xuống cuối log
  const logEndRef = useRef<HTMLDivElement>(null);

  // Sync userId from AuthContext for convenience
  useEffect(() => {
    if (auth?.userId) {
      setUserId(auth.userId);
    }
  }, [auth?.userId]);

  // --- HÀM HỖ TRỢ LOG ---
  const addLog = (msg: string) => {
    const newLog: LogEntry = {
      id: Date.now(),
      message: msg,
      timestamp: new Date().toLocaleTimeString(),
    };
    setLogs((prev) => [...prev, newLog]);
    console.log(msg);
  };

  // --- KẾT NỐI SOCKET (useEffect) ---
  useEffect(() => {
    if (!socket) return;

    // 1. Lắng nghe các sự kiện cơ bản (Global socket đã handle connect/disconnect, nhưng ta có thể log thêm ở đây nếu muốn)
    if (isConnected) {
      addLog("✅ Start listening via Global Socket...");
    }

    const onServerMessage = (msg: any) => addLog(`📩 Server: ${msg.data}`);
    const onNewRequest = (data: any) => {
      addLog(
        `🔥 CÓ KÈO MỚI! ID: ${data.request_id} - Topic: ${data.topic} - Giá: ${data.budget}`,
      );
      setReqId((prev) => [...prev, data.request_id]);
    };
    const onMatchSuccess = (data: any) => {
      addLog(`🎉 GHÉP ĐÔI THÀNH CÔNG! Vào phòng: ${data.room_id}`);
      alert(`Thành công! Phòng học của bạn là: ${data.room_id}`);
    };
    const onError = (msg: any) => addLog(`❌ Lỗi: ${msg.message}`);

    // Đăng ký event
    socket.on("server_message", onServerMessage);
    socket.on("new_request_available", onNewRequest);
    socket.on("match_success", onMatchSuccess);
    socket.on("error", onError);

    // Cleanup listeners khi component unmount
    return () => {
      socket.off("server_message", onServerMessage);
      socket.off("new_request_available", onNewRequest);
      socket.off("match_success", onMatchSuccess);
      socket.off("error", onError);
    };
  }, [socket, isConnected]);

  // Auto scroll khi có log mới
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // --- CÁC HÀM XỬ LÝ NÚT BẤM ---
  // Lưu ý: Register giờ đã được tự động xử lý bởi SocketContext khi login.
  // Tuy nhiên vẫn giữ nút này nếu user muốn test manual register với ID khác (dù SocketContext sẽ ưu tiên ID thật).
  // Nhưng trong context của app thật, hàm này thừa. Với mục đích test, ta vẫn gửi lệnh register thủ công.
  const handleRegister = () => {
    if (!socket) return;
    if (!userId) return alert("Vui lòng nhập User ID");
    socket.emit("register", { user_id: userId });
    addLog(`📤 (Manual) Đã gửi đăng ký User ID: ${userId}`);
  };

  const handleFindMentor = () => {
    if (!socket) return;
    // if (!userId) return alert("Vui lòng nhập User ID trước"); // SocketContext đã lo auth, nhưng check UI vẫn tốt

    addLog("🔍 Đang tìm Mentor...");
    socket.emit("find_tutor", {
      student_id: userId, // Vẫn gửi student_id nếu backend cần, hoặc backend lấy từ session socket
      skill_id: 4, // Skill ID cứng (đảm bảo DB có skill này)
      topic: "Test Realtime React",
      budget: 1,
      description: "Help me please (from Next.js)",
    });
  };

  const handleAcceptRequest = () => {
    if (!socket) return;
    // if (!userId) return alert("Chưa nhập Mentor ID (User ID của bạn)");
    if (!reqId) return alert("Chưa có Request ID để nhận");

    socket.emit("accept_request", {
      tutor_id: userId,
      request_id: reqId,
    });
    addLog(`🤝 Đang nhận kèo ID: ${reqId}`);
  };

  // --- GIAO DIỆN (JSX) ---
  return (
    <div className="max-w-2xl mx-auto p-6 font-sans text-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        Test Realtime Matching (Next.js Global Socket)
      </h2>

      {/* KHU VỰC 1: ĐỊNH DANH */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow border border-gray-200">
        <label className="block font-semibold mb-2">
          User ID (Auto-sync from Auth):
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Nhập UUID user..."
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button
            onClick={handleRegister}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            1. Báo danh (Manual)
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          *Socket Status:{" "}
          {isConnected ? (
            <span className="text-green-600 font-bold">Connected</span>
          ) : (
            <span className="text-red-500">Disconnected</span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* KHU VỰC 2: STUDENT */}
        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
          <h3 className="font-bold text-orange-700 mb-2">Dành cho Student</h3>
          <p className="text-sm text-gray-600 mb-3">
            Tìm mentor dạy Skill ID 1
          </p>
          <button
            onClick={handleFindMentor}
            className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            2. Tìm Mentor
          </button>
        </div>

        {/* KHU VỰC 3: MENTOR */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-bold text-green-700 mb-2">Dành cho Mentor</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm block mb-1">
                Request ID (Tự điền):
              </label>
              {reqId?.map((i) => {
                console.log(i);
                return (
                  <>
                    <p>{i}</p>
                  </>
                );
              })}
            </div>
            <button
              onClick={handleAcceptRequest}
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              3. Nhận Kèo
            </button>
          </div>
        </div>
      </div>

      {/* KHU VỰC 4: LOGS */}
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-80 overflow-y-auto font-mono text-sm shadow-inner">
        {logs.length === 0 && (
          <p className="text-gray-500 italic">Chờ sự kiện...</p>
        )}
        {logs.map((log) => (
          <div
            key={log.id}
            className="mb-1 border-b border-gray-800 pb-1 last:border-0"
          >
            <span className="text-gray-500 mr-2">[{log.timestamp}]</span>
            {log.message}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  );
}

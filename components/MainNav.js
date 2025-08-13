// components/MainNav.js
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function MainNav() {
  const [open, setOpen] = useState(null);
  const [panelStyle, setPanelStyle] = useState({ top: 0, left: 0, width: 0, cols: 1, mode: "wide" });
  const [arrowLeft, setArrowLeft] = useState(24);
  const rootRef = useRef(null);
  const btnRefs = useRef({});
  const openTimer = useRef(null);
  const closeTimer = useRef(null);
  const OPEN_DELAY = 90;
  const CLOSE_DELAY = 220;

  const menus = [
    {
      key: "dgnl",
      label: "ĐÁNH GIÁ NĂNG LỰC",
      dropdown: {
        columns: [
          {
            title: "ĐGNL HN (HSA)",
            items: [
              { label: "Định lượng HSA", href: "/dgnl/hn/dinh-luong" },
              { label: "Định tính (HSA)", href: "/dgnl/hn/dinh-tinh" },
              { label: "Tiếng Anh HSA", href: "/dgnl/hn/tieng-anh" },
              { label: "Khoa học HSA", href: "/dgnl/hn/khoa-hoc" },
              { label: "Đề minh họa HSA", href: "/dgnl/hn/de-minh-hoa" }
            ]
          },
          {
            title: "ĐGNL TPHCM (V-ACT)",
            items: [
              { label: "Toán học VACT", href: "/dgnl/hcm/toan" },
              { label: "Tiếng Anh VACT", href: "/dgnl/hcm/tieng-anh" },
              { label: "Tiếng Việt VACT", href: "/dgnl/hcm/tieng-viet" },
              { label: "Khoa học VACT", href: "/dgnl/hcm/khoa-hoc" },
              { label: "Đề minh họa VACT", href: "/dgnl/hcm/de-minh-hoa" }
            ]
          },
          {
            title: "ĐGNL SƯ PHẠM",
            items: [
              { label: "Định lượng", href: "/dgnl/sp/dinh-luong" },
              { label: "Định tính", href: "/dgnl/sp/dinh-tinh" },
              { label: "Tiếng Anh", href: "/dgnl/sp/tieng-anh" },
              { label: "Khoa học", href: "/dgnl/sp/khoa-hoc" },
              { label: "Đề minh họa", href: "/dgnl/sp/de-minh-hoa" }
            ]
          }
        ]
      }
    },
    {
      key: "dgtd",
      label: "ĐGTD (TSA)",
      dropdown: {
        columns: [
          {
            title: "TSA",
            items: [
              { label: "Toán học TSA", href: "/tsa/toan" },
              { label: "Đọc hiểu TSA", href: "/tsa/doc-hieu" },
              { label: "Khoa học TSA", href: "/tsa/khoa-hoc" },
              { label: "Đề minh họa TSA", href: "/tsa/de-minh-hoa" }
            ]
          }
        ]
      }
    },
    {
      key: "thpt",
      label: "TÀI LIỆU THPT",
      dropdown: {
        columns: [
          { title: "TOÁN", items: [{ label: "Toán 11", href: "/thpt/toan-11" }, { label: "Toán 12", href: "/thpt/toan-12" }] },
          { title: "VẬT LÝ", items: [{ label: "Vật lý 12", href: "/thpt/vat-ly-12" }] },
          { title: "HÓA HỌC", items: [{ label: "Hóa học 11", href: "/thpt/hoa-11" }, { label: "Hóa học 12", href: "/thpt/hoa-12" }] },
          { title: "SINH HỌC", items: [{ label: "Sinh học 12", href: "/thpt/sinh-12" }] },
          { title: "TIẾNG ANH", items: [{ label: "Tiếng Anh 10", href: "/thpt/tieng-anh-10" }, { label: "Tiếng Anh 11", href: "/thpt/tieng-anh-11" }, { label: "Tiếng Anh 12", href: "/thpt/tieng-anh-12" }] },
          { title: "NGỮ VĂN", items: [{ label: "Ngữ Văn 11", href: "/thpt/van-11" }, { label: "Ngữ Văn 12", href: "/thpt/van-12" }] },
          { title: "ĐỊA LÝ", items: [{ label: "Địa lý 12", href: "/thpt/dia-ly-12" }] },
          { title: "LỊCH SỬ", items: [{ label: "Lịch sử 12", href: "/thpt/lich-su-12" }] }
        ]
      }
    },
    {
      key: "daihoc",
      label: "ĐẠI HỌC",
      dropdown: {
        columns: [
          {
            title: "TÀI LIỆU",
            items: [
              { label: "Tài liệu Bách Khoa", href: "/uni/hust" },
              { label: "Tài liệu NEU", href: "/uni/neu" },
              { label: "Tài liệu HNUE", href: "/uni/hnue" },
              { label: "Tài liệu UET", href: "/uni/uet" },
              { label: "Tài liệu Phenikaa", href: "/uni/phenikaa" }
            ]
          }
        ]
      }
    },
    {
      key: "ngoaingu",
      label: "NGOẠI NGỮ",
      dropdown: {
        columns: [
          {
            title: "NGOẠI NGỮ",
            items: [
              { label: "Tiếng Anh", href: "/ngoai-ngu/tieng-anh" },
              { label: "Tiếng Trung", href: "/ngoai-ngu/tieng-trung" },
              { label: "Tiếng Nhật", href: "/ngoai-ngu/tieng-nhat" },
              { label: "Tiếng Hàn", href: "/ngoai-ngu/tieng-han" }
            ]
          }
        ]
      }
    },
    {
      key: "khoahoc",
      label: "KHÓA HỌC FREE",
      dropdown: {
        columns: [
          {
            title: "KHÓA HỌC",
            items: [
              { label: "Công nghệ thông tin", href: "/khoa-hoc/cntt" },
              { label: "Ngoại ngữ", href: "/khoa-hoc/ngoai-ngu" },
              { label: "Đồ họa – Thiết kế", href: "/khoa-hoc/do-hoa-thiet-ke" },
              { label: "Truyền thông – Marketing", href: "/khoa-hoc/truyen-thong-marketing" },
              { label: "Tin học", href: "/khoa-hoc/tin-hoc" }
            ]
          }
        ]
      }
    },
    {
      key: "congcu",
      label: "CÔNG CỤ",
      dropdown: {
        columns: [
          {
            title: "CÔNG CỤ",
            items: [
              { label: "Quy đổi điểm PTIT", href: "/tools/ptit" },
              { label: "Công Cụ Tính Điểm Tốt Nghiệp THPT 2025", href: "/tools/tn-2025" },
              { label: "Công cụ quy đổi điểm các phương thức HUST", href: "/tools/hust" }
            ]
          }
        ]
      }
    }
  ];

  useEffect(() => {
    const onDoc = (e) => { if (!rootRef.current) return; if (!rootRef.current.contains(e.target)) setOpen(null); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    const onReflow = () => open && computePanel(open);
    window.addEventListener("resize", onReflow);
    window.addEventListener("scroll", onReflow, true);
    return () => {
      window.removeEventListener("resize", onReflow);
      window.removeEventListener("scroll", onReflow, true);
    };
  }, [open]);

  const clamp = (n, mn, mx) => Math.max(mn, Math.min(mx, n));

  function computePanel(key) {
    const btn = btnRefs.current[key];
    if (!btn) return;
    const menu = menus.find((m) => m.key === key);
    const totalCols = menu?.dropdown?.columns?.length || 1;
    const vw = window.innerWidth;
    const r = btn.getBoundingClientRect();
    const caretCenter = r.left + r.width / 2;

    // 1 cột: co thật gọn theo chữ
    if (totalCols === 1) {
      const labels = menu?.dropdown?.columns?.[0]?.items?.map((it) => it.label) || [];
      const title = menu?.dropdown?.columns?.[0]?.title || "";
      const maxChars = Math.max(title.length, ...labels.map((s) => s.length), 0);
      const charWidth = 8.2;  // nhỏ hơn => panel gọn hơn
      const basePad  = 100;   // padding + viền + khoảng trống
      const desired  = Math.round(maxChars * charWidth + basePad);

      const MIN_W = 340;
      const MAX_W = 520;      // thu nhỏ trần
      const width  = clamp(desired, MIN_W, Math.min(MAX_W, vw - 32));

      const left   = clamp(caretCenter - width / 2, 16, vw - width - 16);
      const top    = Math.round(r.bottom + 8);
      const arrow  = clamp(caretCenter - left, 16, width - 16);

      setPanelStyle({ top, left, width, cols: 1, mode: "narrow" });
      setArrowLeft(arrow);
      return;
    }

    // Nhiều cột: wrap theo hàng, tối đa 4 cột mỗi hàng
    const MAX_COLS_PER_ROW = 4;
    const colsPerRow = Math.min(totalCols, MAX_COLS_PER_ROW);
    const COL_W = 260, GAP = 16, PADX = 28, MIN_W = 520, MAX_W = 1400;

    const desired = colsPerRow * COL_W + (colsPerRow - 1) * GAP + PADX;
    const width   = clamp(desired, MIN_W, Math.min(MAX_W, vw - 32));

    const left  = clamp(caretCenter - width / 2, 16, vw - width - 16);
    const top   = Math.round(r.bottom + 8);
    const arrow = clamp(caretCenter - left, 16, width - 16);

    setPanelStyle({ top, left, width, cols: colsPerRow, mode: "wide" });
    setArrowLeft(arrow);
  }

  function scheduleOpen(key) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openTimer.current) clearTimeout(openTimer.current);
    openTimer.current = setTimeout(() => { setOpen(key); computePanel(key); }, OPEN_DELAY);
  }
  function scheduleClose() {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), CLOSE_DELAY);
  }

  return (
    <div className="mainnav" ref={rootRef}>
      <ul className="top">
        {menus.map((m) => (
          <li
            key={m.key}
            className={`topItem ${open === m.key ? "open" : ""}`}
            onMouseEnter={() => (m.dropdown ? scheduleOpen(m.key) : setOpen(null))}
            onMouseLeave={scheduleClose}
          >
            {m.dropdown ? (
              <button
                ref={(el) => (btnRefs.current[m.key] = el)}
                className="topLink"
                onClick={() => { const next = open === m.key ? null : m.key; setOpen(next); if (next) computePanel(next); }}
                aria-expanded={open === m.key}
                aria-haspopup="true"
                onFocus={() => scheduleOpen(m.key)}
                onBlur={scheduleClose}
              >
                <span>{m.label}</span>
                <svg className="caret" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l8 7-8 7"/></svg>
              </button>
            ) : (
              <Link href={m.href || "#"} className="topLink linkOnly"><span>{m.label}</span></Link>
            )}

            {m.dropdown && open === m.key && (
              <div
                className={`panel ${panelStyle.mode}`}
                role="menu"
                style={{
                  top: panelStyle.top,
                  left: panelStyle.left,
                  width: panelStyle.width,
                  ["--arrow-left"]: `${arrowLeft}px`,
                  ["--cols"]: panelStyle.cols
                }}
                onMouseEnter={() => (closeTimer.current ? clearTimeout(closeTimer.current) : null)}
                onMouseLeave={scheduleClose}
              >
                <div className="arrowTop" />
                <div className="cols">
                  {menus.find((x) => x.key === m.key)?.dropdown?.columns?.map((c) => (
                    <div key={c.title} className="col">
                      <div className="colTitle">{c.title}</div>
                      <ul className="list">
                        {c.items.map((it) => (
                          <li key={it.href} className="item">
                            <Link href={it.href} className="link pill">{it.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <style jsx>{`
        .mainnav{position:relative}
        .top{display:flex;gap:22px;list-style:none;margin:0;padding:0}
        .topItem{position:relative}
        .topLink{display:flex;align-items:center;gap:8px;padding:.5rem .25rem;background:transparent;border:0;text-decoration:none;color:inherit;font-weight:800;letter-spacing:.02em}
        .linkOnly{text-decoration:none}
        .topItem.open .topLink{color:#2a7f76}
        .caret{width:12px;height:12px;stroke:currentColor;stroke-width:2;fill:none;transition:transform .18s ease}
        .topItem.open .caret{transform:rotate(90deg)}

        .panel{position:fixed;background:#fff;border-radius:12px;box-shadow:0 18px 45px rgba(0,0,0,.11);z-index:1000}
        .panel::before{content:"";position:absolute;left:0;right:0;top:-10px;height:10px}
        .arrowTop{position:absolute;top:-10px;left:var(--arrow-left, 24px);width:18px;height:18px;background:#fff;transform:rotate(45deg);box-shadow:-3px -3px 10px rgba(0,0,0,.06)}

        .cols{display:grid;gap:12px;padding:12px 14px 14px;border-top:3px solid #2aa196}
        .panel.wide .cols{grid-auto-flow:row;grid-template-columns:repeat(var(--cols,4), minmax(240px, 1fr))}
        .panel.narrow .cols{grid-template-columns:1fr}

        .colTitle{font-weight:900;margin:4px 0 6px}
        .list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}

        .pill{display:inline-flex;align-items:center;justify-content:flex-start;padding:8px 10px;border:1px solid #ececec;border-radius:10px;background:#fff;max-width:100%;white-space:nowrap;line-height:1.15}
        .pill:hover{border-color:#d9d9d9;background:#fafafa;color:#2a7f76;transition:background .15s ease,border-color .15s ease,color .15s ease}
        .link{color:#444;text-decoration:none}
      `}</style>
    </div>
  );
}

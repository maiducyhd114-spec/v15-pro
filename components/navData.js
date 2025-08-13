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
  { key: "ngoaingu", label: "NGOẠI NGỮ", href: "/ngoai-ngu" },
  {
    key: "congcu",
    label: "CÔNG CỤ",
    dropdown: {
      columns: [
        {
          title: "CÔNG CỤ",
          items: [
            { label: "Quy đổi điểm PTIT", href: "/tools/ptit" },
            { label: "Tính điểm TN THPT 2025", href: "/tools/tn-2025" },
            { label: "Quy đổi điểm các phương thức HUST", href: "/tools/hust" }
          ]
        }
      ]
    }
  },
  { key: "free", label: "KHÓA HỌC FREE", href: "/khoa-hoc-free" }
];

export default menus;

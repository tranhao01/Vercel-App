Ok, thấy repo đã có `index.html / privacy.html / terms.html / vercel.json`. Lỗi 404 thường do **cấu hình build/static** chưa đúng. Làm 1 trong 2 cách dưới đây (cách 1 nhanh nhất):

### Cách 1 — Không cần cấu hình (khuyến nghị)

1. Vào Vercel → **Project → Settings → General**

   * **Framework Preset:** `Other`
   * **Build Command:** *để trống*
   * **Output Directory:** `.` (hoặc để trống)
   * **Root Directory:** repository root (nơi có các file .html)
2. **Xoá `vercel.json`** trong repo (nếu đang ghi đè cấu hình).
3. Commit & redeploy.
4. Truy cập:

   * `/privacy.html`
   * `/terms.html`
   * (tuỳ chọn) `/` sẽ là `index.html`.

### Cách 2 — Giữ `vercel.json` nhưng cấu hình chuẩn static

Dùng file tối giản sau (ghi đè file hiện tại), rồi commit & redeploy:

```json
{
  "version": 2,
  "builds": [
    { "src": "index.html", "use": "@vercel/static" },
    { "src": "privacy.html", "use": "@vercel/static" },
    { "src": "terms.html", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/privacy/?", "dest": "/privacy.html" },
    { "src": "/terms/?", "dest": "/terms.html" }
  ]
}
```

Giải thích: ép Vercel serve ba file HTML như static assets và map đường dẫn ngắn `/privacy` → `/privacy.html`, `/terms` → `/terms.html`.

---

### Checklist nhanh để hết 404

* [ ] Project dùng **Other (Static)**, **không** có Build Command.
* [ ] **Output Directory** trỏ đúng (thư mục chứa các .html).
* [ ] Không có framework config thừa (Next/React) gây build rỗng.
* [ ] Redeploy sau khi sửa.
* [ ] Thử mở thẳng các URL: `https://<project>.vercel.app/privacy.html` và `.../terms.html`.

Nếu vẫn 404, gửi mình nội dung `vercel.json` hiện tại + tên project Vercel, mình chỉnh đúng luôn cho bạn.

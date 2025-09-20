# Todo App - 2 Layer (Frontend + Backend)

📋 **Deskripsi Singkat**  
Aplikasi Todo App ini dibuat sebagai tugas kuliah dengan arsitektur 2-layer:  
- **Frontend:** React  
- **Backend:** API + database pilihan  

Pengguna dapat menambahkan, menandai selesai, menghapus, dan memfilter todo.  
Terdapat fitur **dark mode**, progress bar, dan counter.

⚡ Fitur

- Tambah todo baru  
- Tandai todo selesai / belum selesai  
- Hapus todo  
- Filter: Semua / Belum / Selesai  
- Counter & progress bar  
- Dark mode toggle  

---

💻 Cara Menjalankan

 Backend
1. Masuk folder backend:
   ```bash
   cd backend

2. Install Dependecies:
   ```bash
   pip install -r requirements.txt   # untuk Python

3. Jalankan server:
     ```bash
     uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
  atau

      python app.py   # atau node server.js

Frontend

1. Masuk folder frontend:
   ```bash
    cd frontend

2. Install dependency:
    ```bash
    npm install

3. Jalankan Aplikasi:
    ```bash
    npm start

4. Buka browser di: http://localhost:3000

🔗 Link GitHub

https://github.com/Excitemax/todo-app


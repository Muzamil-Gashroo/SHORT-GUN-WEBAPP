# **SHORT-GUN **
A simple and fast web application that takes any URL and instantly generates a clean QR Code and a Short Url.  
Perfect for sharing links quickly, creating scannable codes, or embedding into websites and documents.

---

##  **Features**
- Enter any valid URL  
- Generates a QR code instantly  
- Clean & minimal UI  
- Mobile-friendly  
- Fast and lightweight

---

##  **Tech Stack**
- **Frontend:** React / TypeScript  
- **Backend:** Node.js / Express  

---

##  **How It Works**
1. User enters a URL  
2. App validates the URL  
3. The backend generates a QR code & Shorturl 
4. The UI displays the QR code and Shorturl.

---

##  **Installation & Setup**

### **Clone the repo**
```bash
git clone https://github.com/Muzamil-Gashroo/SHORT-GUN.git
cd SHORT-GUN
```

### **Install dependencies**
```bash
npm install
```

### **Start development**
```bash
npm run dev
```

---

##  **API Endpoint**
### **POST /create/url**
Send a URL in JSON format:

```json
{
  "url": "https://www.youtube.com"
}
```

Returns a generated QR code image and a Short Url.

---

## **License**
This project is licensed under the **MIT License**.

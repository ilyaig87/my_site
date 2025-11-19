# הגדרת Vercel KV לביקורות

## צעדים להגדרה (3 דקות):

### 1️⃣ צור Vercel KV Database

1. היכנס ל-[Vercel Dashboard](https://vercel.com/dashboard)
2. לחץ על **Storage** בתפריט העליון
3. לחץ על **Create Database**
4. בחר **KV (Redis)**
5. תן שם למסד נתונים: `reviews-db` (או כל שם שתרצה)
6. בחר **Region** - `Frankfurt (fra1)` (הכי קרוב לישראל)
7. לחץ **Create**

### 2️⃣ חבר את הDB לפרויקט

1. אחרי שהDB נוצר, לחץ על **Connect Project**
2. בחר את הפרויקט שלך מהרשימה
3. לחץ **Connect**

### 3️⃣ שלוף את המפתחות ל-localhost

פתח טרמינל בתיקיית הפרויקט והרץ:

```bash
vercel env pull .env.local
```

זה ייצור קובץ `.env.local` עם המפתחות הנדרשים.

### 4️⃣ הפעל מחדש את השרת

```bash
npm run dev
```

---

## ✅ זהו! הכל מוכן

עכשיו הביקורות:
- ✅ נשמרות ב-Vercel KV
- ✅ עובדות גם ב-localhost
- ✅ עובדות ב-production
- ✅ נשארות אחרי deploy

---

## 🔍 בדיקה שהכל עובד:

1. גש ל-`http://localhost:3000`
2. גלול לסקשן הביקורות
3. הוסף ביקורת
4. רענן את הדף - הביקורת צריכה להישאר

---

## 📊 ניהול הביקורות

### צפייה בביקורות ב-Vercel Dashboard:
1. [Vercel Dashboard](https://vercel.com/dashboard) → **Storage**
2. לחץ על `reviews-db`
3. לחץ על **Data Browser**
4. חפש את המפתח `reviews`

### מחיקת כל הביקורות (אם צריך):
```bash
# מהטרמינל
vercel kv del reviews
```

---

## 💰 מכסת החינם:

- **256 MB** אחסון
- **30,000** פעולות ליום
- **256 MB** bandwidth

זה יותר מספיק לאלפי ביקורות!

---

## ⚠️ אם יש שגיאה:

**שגיאה: "KV_REST_API_URL is not defined"**
- הרץ `vercel env pull .env.local` שוב
- הפעל מחדש את `npm run dev`

**שגיאה: "Unauthorized"**
- ודא שה-DB מחובר לפרויקט ב-Vercel Dashboard

---

זהו! המערכת מוכנה ועובדת 🚀

# הגדרת Turso (SQLite על Edge) - 9GB חינם! 🚀

## 📦 מה זה Turso?
- SQLite על edge network גלובלי
- **9 GB אחסון חינם** (פי 35 מ-Vercel!)
- מהירות סופר גבוהה
- ~18 מיליון ביקורות אפשריות

---

## ⚡ הגדרה מהירה (5 דקות):

### 1️⃣ התקן Turso CLI

**Windows (PowerShell):**
```powershell
iwr -useb https://get.tur.so/install.ps1 | iex
```

**Mac/Linux:**
```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

### 2️⃣ התחבר/הירשם ל-Turso

```bash
turso auth signup
```

זה יפתח דפדפן - התחבר עם GitHub/Google/Email

### 3️⃣ צור מסד נתונים

```bash
turso db create reviews-db
```

### 4️⃣ קבל את ה-URL וה-Token

```bash
# קבל URL
turso db show reviews-db --url

# צור token
turso db tokens create reviews-db
```

### 5️⃣ הוסף למשתני סביבה

צור/ערוך קובץ `.env.local` בשורש הפרויקט:

```env
TURSO_DATABASE_URL="libsql://your-database-url.turso.io"
TURSO_AUTH_TOKEN="your-auth-token-here"
```

**החלף את הערכים עם מה שקיבלת בשלב 4!**

### 6️⃣ הפעל את השרת

```bash
npm run dev
```

---

## ✅ זהו! הכל מוכן

הביקורות עכשיו:
- ✅ נשמרות ב-Turso (SQLite על Edge)
- ✅ **9 GB** חינם - ~18 מיליון ביקורות!
- ✅ מהירות סופר גבוהה
- ✅ עובד גם ב-localhost וגם ב-production

---

## 🌐 הוספת המשתנים ל-Vercel (Production)

### אופציה 1: דרך CLI (מהיר)
```bash
vercel env add TURSO_DATABASE_URL
# הדבק את ה-URL שקיבלת

vercel env add TURSO_AUTH_TOKEN
# הדבק את ה-Token שקיבלת
```

### אופציה 2: דרך Dashboard
1. [Vercel Dashboard](https://vercel.com/dashboard)
2. בחר את הפרויקט
3. **Settings** → **Environment Variables**
4. הוסף:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`

### לאחר מכן:
```bash
vercel --prod
```

---

## 📊 ניהול המסד נתונים

### צפייה בכל הביקורות:
```bash
turso db shell reviews-db "SELECT * FROM reviews ORDER BY date DESC"
```

### ספירת ביקורות:
```bash
turso db shell reviews-db "SELECT COUNT(*) FROM reviews"
```

### מחיקת כל הביקורות (זהירות!):
```bash
turso db shell reviews-db "DELETE FROM reviews"
```

### מחיקת ביקורת ספציפית:
```bash
turso db shell reviews-db "DELETE FROM reviews WHERE id='1234567890'"
```

---

## 🎯 פקודות שימושיות

### רשימת כל ה-DBs שלך:
```bash
turso db list
```

### מידע על ה-DB:
```bash
turso db show reviews-db
```

### שימוש נוכחי:
```bash
turso db inspect reviews-db
```

### צור token נוסף:
```bash
turso db tokens create reviews-db
```

---

## 📈 מכסת החינם של Turso:

| מה | כמה |
|----|-----|
| **אחסון** | **9 GB** 🎉 |
| **שורות** | ללא הגבלה |
| **Reads** | 1 billion/חודש |
| **Writes** | 25 million/חודש |
| **Locations** | 3 (Frankfurt + עוד 2) |

זה **יותר מספיק** לאתר עם תנועה גבוהה!

---

## 🌍 Locations (Edge)

Turso מעתיק את ה-DB ל-3 locations בחינם:

```bash
# ראה את ה-locations
turso db locations list

# הוסף location (קרוב לישראל)
turso db locations add reviews-db fra  # Frankfurt
```

---

## 🔍 Schema של הטבלה

```sql
CREATE TABLE reviews (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now'))
);

CREATE INDEX idx_reviews_date ON reviews(date DESC);
```

הטבלה נוצרת אוטומטית בפעם הראשונה שמריצים את ה-API!

---

## ⚠️ פתרון בעיות

### שגיאה: "TURSO_DATABASE_URL is not defined"
- ודא שיצרת קובץ `.env.local`
- הפעל מחדש את `npm run dev`

### שגיאה: "Authentication failed"
- ודא שה-token תקין: `turso db tokens create reviews-db`
- העתק token חדש ל-`.env.local`

### שגיאה: "Database not found"
- ודא שיצרת את ה-DB: `turso db list`
- אם לא קיים: `turso db create reviews-db`

---

## 🚀 יתרונות Turso:

✅ **9 GB חינם** - פי 35 יותר מ-Vercel
✅ **מהיר במיוחד** - SQLite על edge
✅ **Edge network** - משוכפל ב-3 מיקומים
✅ **SQL מלא** - כל הכוח של SQLite
✅ **Serverless** - לא צריך לנהל שרתים
✅ **חינמי לצמיתות** - לא תצטרך לשלם

---

## 🎉 סיימת!

עכשיו אתה יכול:
1. להוסיף ביקורות באתר
2. לראות אותן נשמרות ב-Turso
3. לנהל דרך ה-CLI
4. ליהנות מ-9GB חינם! 🎊

**תיהנה מהמסד נתונים הכי מהיר והכי גדול שיש!** 🚀

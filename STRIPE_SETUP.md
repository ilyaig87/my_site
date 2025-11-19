# 💳 הדריך להגדרת Stripe (מצב הדגמה + ייצור)

## 🎭 מצב נוכחי: **מצב הדגמה**

האתר עובד **עכשיו** במצב הדגמה:
- ✅ לקוחות יכולים לבחור חבילות
- ✅ מלא טופס והזמנה נשמרת ב-Turso
- ✅ הכל נראה מקצועי
- ❌ לא מעבד תשלומים אמיתיים (עדיין לא נרשמת)

---

## 🚀 כשתהיו מוכנים - הפעלת Stripe אמיתי:

### שלב 1: הירשם ל-Stripe (5 דקות)
🔗 [stripe.com](https://stripe.com)

1. לחץ על **Sign Up**
2. מלא פרטים בסיסיים (שם, אימייל, סיסמה)
3. מלא פרטי עסק
4. העלה מסמכים (ת.ז, אישור עוסק/ח.פ)
5. הוסף פרטי חשבון בנק

**אישור:** 1-3 ימים עסקים

---

### שלב 2: קבל את המפתחות

אחרי אישור:

1. היכנס ל-[Stripe Dashboard](https://dashboard.stripe.com)
2. לחץ על **Developers** → **API Keys**
3. תראה 2 מפתחות:
   - **Publishable key** - מתחיל ב-`pk_live_...`
   - **Secret key** - מתחיל ב-`sk_live_...` (לחץ "Reveal")

---

### שלב 3: הוסף למשתני סביבה

ערוך את `.env.local`:

```env
# Turso (כבר קיים)
TURSO_DATABASE_URL="libsql://..."
TURSO_AUTH_TOKEN="..."

# Stripe - הוסף את זה:
STRIPE_SECRET_KEY="sk_live_your_secret_key_here"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_your_publishable_key_here"
NEXT_PUBLIC_BASE_URL="https://your-site.vercel.app"

# Webhook (נגדיר בהמשך)
STRIPE_WEBHOOK_SECRET=""
```

---

### שלב 4: הוסף ל-Vercel

**דרך Dashboard:**
1. [Vercel Dashboard](https://vercel.com/dashboard)
2. בחר פרויקט → **Settings** → **Environment Variables**
3. הוסף:
   - `STRIPE_SECRET_KEY` = `sk_live_...`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_...`
   - `NEXT_PUBLIC_BASE_URL` = `https://your-site.vercel.app`
4. **Save**

**או דרך CLI:**
```bash
vercel env add STRIPE_SECRET_KEY
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
vercel env add NEXT_PUBLIC_BASE_URL
```

---

### שלב 5: הגדר Webhook (חשוב!)

Webhook = Stripe מודיע לאתר שתשלום בוצע

1. [Stripe Dashboard](https://dashboard.stripe.com) → **Developers** → **Webhooks**
2. לחץ **Add endpoint**
3. **Endpoint URL:** `https://your-site.vercel.app/api/webhook`
4. **Events to send:**
   - `checkout.session.completed`
   - `checkout.session.expired`
5. לחץ **Add endpoint**
6. **העתק את ה-Signing secret** (מתחיל ב-`whsec_...`)
7. הוסף ל-Vercel: `STRIPE_WEBHOOK_SECRET` = `whsec_...`

---

### שלב 6: Deploy!

```bash
git add .
git commit -m "Add payment system with Stripe"
git push

# או
vercel --prod
```

---

## ✅ זהו! עכשיו זה עובד באמת

מה קורה כשלקוח משלם:

1. לקוח בוחר חבילה ומזין פרטים
2. לוחץ "בחר חבילה"
3. מועבר לדף תשלום מאובטח של Stripe
4. מזין פרטי אשראי
5. Stripe מעבד את התשלום
6. לקוח חוזר לאתר עם "הצלחה! ✅"
7. Webhook מעדכן את ההזמנה ב-Turso
8. אתה מקבל מייל על הזמנה חדשה
9. הכסף מגיע לחשבון תוך 2-7 ימים

---

## 🧪 בדיקות (Test Mode)

לפני שפותחים ללקוחות אמיתיים, בדוק עם **Test Mode**:

1. ב-Stripe Dashboard, ודא שה-Toggle ב-**Test Mode**
2. השתמש במפתחות Test:
   - `sk_test_...`
   - `pk_test_...`
3. כרטיסי בדיקה:
   - **הצלחה:** `4242 4242 4242 4242`
   - **כישלון:** `4000 0000 0000 0002`
   - תאריך: כל תאריך עתידי
   - CVV: כל 3 ספרות

---

## 💰 עמלות Stripe בישראל:

| עסקה | עמלה |
|------|------|
| כרטיס אשראי ישראלי | 2.9% + ₪1.5 |
| כרטיס אשראי בינלאומי | 3.9% + ₪1.5 |
| Apple Pay / Google Pay | 2.9% + ₪1.5 |

**דוגמה:**
- לקוח שילם ₪2,500
- עמלה: ₪2,500 × 2.9% + ₪1.5 = ₪74
- אתה מקבל: **₪2,426**

---

## 📊 ניהול הזמנות

### צפה בהזמנות ב-Turso:

```bash
turso db shell database-site-craft "SELECT * FROM orders ORDER BY created_at DESC"
```

### צפה בתשלומים ב-Stripe:

[Stripe Dashboard](https://dashboard.stripe.com) → **Payments**

---

## 🔒 אבטחה

✅ Stripe הוא **PCI Level 1** certified (הרמה הגבוהה ביותר)
✅ אתה **לא מאחסן** פרטי כרטיס אשראי
✅ כל התשלומים **מוצפנים**
✅ Stripe טופל ב-**3D Secure** אוטומטית

---

## 📧 מיילים אוטומטיים (בונוס)

אפשר להוסיף שליחת מיילים ללקוח:

```bash
npm install @sendgrid/mail
# או
npm install nodemailer
```

אני יכול להטמיע את זה אם תרצה!

---

## 🎯 סטטוס נוכחי:

| תכונה | סטטוס |
|-------|-------|
| בחירת חבילות | ✅ עובד |
| טופס פרטים | ✅ עובד |
| שמירה ב-DB | ✅ עובד |
| עיצוב מקצועי | ✅ עובד |
| תשלום אמיתי | ⏳ מחכה להרשמה ל-Stripe |
| Webhook | ⏳ מחכה להגדרה |

---

## ❓ שאלות נפוצות

**ש: כמה זמן לוקח לקבל את הכסף?**
ת: 2-7 ימים לחשבון הבנק

**ש: מה אם לקוח דורש החזר?**
ת: אפשר להחזיר דרך Stripe Dashboard

**ש: צריך חשבונית מס?**
ת: Stripe לא מנפיק חשבוניות ישראליות.
צריך להשתמש ב-**ירוק** או **חשבשבת** (אני יכול לשלב!)

**ש: אפשר לקבל תשלומים בביט?**
ת: Stripe לא תומך בביט.
בשביל ביט צריך **Meshulam** (ישראלי)

---

## 🔄 מעבר ל-Meshulam במקום Stripe

אם תעדיף Meshulam (עמלות נמוכות + ביט):
- תגיד לי ואני מחליף את כל הקוד תוך 20 דקות
- Meshulam הוא ישראלי ויותר פשוט לישראל

---

**רוצה עזרה בהרשמה או יש שאלות? אני פה! 😊**
